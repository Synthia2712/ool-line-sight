CREATE TABLE public.profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL UNIQUE,
  full_name text,
  email text,
  avatar_url text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own profile"
ON public.profiles FOR SELECT TO authenticated
USING (user_id = auth.uid());

CREATE POLICY "Users can create their own profile"
ON public.profiles FOR INSERT TO authenticated
WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update their own profile"
ON public.profiles FOR UPDATE TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

CREATE TABLE public.studios (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  created_by uuid NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.studios TO authenticated;
GRANT ALL ON public.studios TO service_role;

ALTER TABLE public.studios ENABLE ROW LEVEL SECURITY;

CREATE TABLE public.studio_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  studio_id uuid NOT NULL REFERENCES public.studios(id) ON DELETE CASCADE,
  user_id uuid NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (studio_id, user_id)
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.studio_members TO authenticated;
GRANT ALL ON public.studio_members TO service_role;

ALTER TABLE public.studio_members ENABLE ROW LEVEL SECURITY;

CREATE TABLE public.studio_member_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  studio_member_id uuid NOT NULL REFERENCES public.studio_members(id) ON DELETE CASCADE,
  role text NOT NULL CHECK (role IN ('owner', 'designer', 'client')),
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (studio_member_id, role)
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.studio_member_roles TO authenticated;
GRANT ALL ON public.studio_member_roles TO service_role;

ALTER TABLE public.studio_member_roles ENABLE ROW LEVEL SECURITY;

CREATE TABLE public.projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  studio_id uuid NOT NULL REFERENCES public.studios(id) ON DELETE CASCADE,
  name text NOT NULL,
  description text,
  status text NOT NULL DEFAULT 'active' CHECK (status IN ('draft', 'active', 'completed', 'archived')),
  start_date date,
  target_completion_date date,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.projects TO authenticated;
GRANT ALL ON public.projects TO service_role;

ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

CREATE TABLE public.project_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  user_id uuid NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (project_id, user_id)
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.project_members TO authenticated;
GRANT ALL ON public.project_members TO service_role;

ALTER TABLE public.project_members ENABLE ROW LEVEL SECURITY;

CREATE TABLE public.project_member_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_member_id uuid NOT NULL REFERENCES public.project_members(id) ON DELETE CASCADE,
  role text NOT NULL CHECK (role IN ('owner', 'designer', 'client')),
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (project_member_id, role)
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.project_member_roles TO authenticated;
GRANT ALL ON public.project_member_roles TO service_role;

ALTER TABLE public.project_member_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.is_studio_member(_studio_id uuid, _user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.studio_members
    WHERE studio_id = _studio_id AND user_id = _user_id
  )
$$;

CREATE OR REPLACE FUNCTION public.can_access_project(_project_id uuid, _user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.project_members
    WHERE project_id = _project_id AND user_id = _user_id
  )
  OR EXISTS (
    SELECT 1
    FROM public.projects p
    WHERE p.id = _project_id AND public.is_studio_member(p.studio_id, _user_id)
  )
$$;

GRANT EXECUTE ON FUNCTION public.is_studio_member(uuid, uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.is_studio_member(uuid, uuid) TO service_role;
GRANT EXECUTE ON FUNCTION public.can_access_project(uuid, uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.can_access_project(uuid, uuid) TO service_role;

CREATE POLICY "Members can view studios"
ON public.studios FOR SELECT TO authenticated
USING (created_by = auth.uid() OR public.is_studio_member(id, auth.uid()));

CREATE POLICY "Users can create studios"
ON public.studios FOR INSERT TO authenticated
WITH CHECK (created_by = auth.uid());

CREATE POLICY "Studio owners can update studios"
ON public.studios FOR UPDATE TO authenticated
USING (created_by = auth.uid())
WITH CHECK (created_by = auth.uid());

CREATE POLICY "Studio owners can delete studios"
ON public.studios FOR DELETE TO authenticated
USING (created_by = auth.uid());

CREATE POLICY "Members can view studio memberships"
ON public.studio_members FOR SELECT TO authenticated
USING (user_id = auth.uid() OR public.is_studio_member(studio_id, auth.uid()));

CREATE POLICY "Studio owners can add studio members"
ON public.studio_members FOR INSERT TO authenticated
WITH CHECK (EXISTS (SELECT 1 FROM public.studios s WHERE s.id = studio_id AND s.created_by = auth.uid()));

CREATE POLICY "Studio owners can remove studio members"
ON public.studio_members FOR DELETE TO authenticated
USING (EXISTS (SELECT 1 FROM public.studios s WHERE s.id = studio_id AND s.created_by = auth.uid()));

CREATE POLICY "Members can view studio roles"
ON public.studio_member_roles FOR SELECT TO authenticated
USING (EXISTS (SELECT 1 FROM public.studio_members sm WHERE sm.id = studio_member_id AND public.is_studio_member(sm.studio_id, auth.uid())));

CREATE POLICY "Studio owners can manage studio roles"
ON public.studio_member_roles FOR ALL TO authenticated
USING (EXISTS (
  SELECT 1 FROM public.studio_members sm
  JOIN public.studios s ON s.id = sm.studio_id
  WHERE sm.id = studio_member_id AND s.created_by = auth.uid()
))
WITH CHECK (EXISTS (
  SELECT 1 FROM public.studio_members sm
  JOIN public.studios s ON s.id = sm.studio_id
  WHERE sm.id = studio_member_id AND s.created_by = auth.uid()
));

CREATE POLICY "Project members can view projects"
ON public.projects FOR SELECT TO authenticated
USING (public.can_access_project(id, auth.uid()));

CREATE POLICY "Studio members can create projects"
ON public.projects FOR INSERT TO authenticated
WITH CHECK (public.is_studio_member(studio_id, auth.uid()) OR EXISTS (SELECT 1 FROM public.studios s WHERE s.id = studio_id AND s.created_by = auth.uid()));

CREATE POLICY "Studio members can update projects"
ON public.projects FOR UPDATE TO authenticated
USING (public.is_studio_member(studio_id, auth.uid()) OR EXISTS (SELECT 1 FROM public.studios s WHERE s.id = studio_id AND s.created_by = auth.uid()))
WITH CHECK (public.is_studio_member(studio_id, auth.uid()) OR EXISTS (SELECT 1 FROM public.studios s WHERE s.id = studio_id AND s.created_by = auth.uid()));

CREATE POLICY "Studio owners can delete projects"
ON public.projects FOR DELETE TO authenticated
USING (EXISTS (SELECT 1 FROM public.studios s WHERE s.id = studio_id AND s.created_by = auth.uid()));

CREATE POLICY "Project members can view project memberships"
ON public.project_members FOR SELECT TO authenticated
USING (user_id = auth.uid() OR public.can_access_project(project_id, auth.uid()));

CREATE POLICY "Studio members can add project members"
ON public.project_members FOR INSERT TO authenticated
WITH CHECK (EXISTS (
  SELECT 1 FROM public.projects p
  WHERE p.id = project_id AND (public.is_studio_member(p.studio_id, auth.uid()) OR EXISTS (SELECT 1 FROM public.studios s WHERE s.id = p.studio_id AND s.created_by = auth.uid()))
));

CREATE POLICY "Studio members can remove project members"
ON public.project_members FOR DELETE TO authenticated
USING (EXISTS (
  SELECT 1 FROM public.projects p
  WHERE p.id = project_id AND (public.is_studio_member(p.studio_id, auth.uid()) OR EXISTS (SELECT 1 FROM public.studios s WHERE s.id = p.studio_id AND s.created_by = auth.uid()))
));

CREATE POLICY "Project members can view project roles"
ON public.project_member_roles FOR SELECT TO authenticated
USING (EXISTS (SELECT 1 FROM public.project_members pm WHERE pm.id = project_member_id AND public.can_access_project(pm.project_id, auth.uid())));

CREATE POLICY "Project members can manage project roles"
ON public.project_member_roles FOR ALL TO authenticated
USING (EXISTS (SELECT 1 FROM public.project_members pm WHERE pm.id = project_member_id AND public.can_access_project(pm.project_id, auth.uid())))
WITH CHECK (EXISTS (SELECT 1 FROM public.project_members pm WHERE pm.id = project_member_id AND public.can_access_project(pm.project_id, auth.uid())));

CREATE INDEX profiles_user_id_idx ON public.profiles(user_id);
CREATE INDEX studio_members_user_id_idx ON public.studio_members(user_id);
CREATE INDEX projects_studio_id_idx ON public.projects(studio_id);
CREATE INDEX project_members_user_id_idx ON public.project_members(user_id);
CREATE INDEX project_members_project_id_idx ON public.project_members(project_id);