import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Mail, Phone, Bell, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const navigate = useNavigate();

  const team = [
    {
      name: "Sarah Chen",
      role: "Lead Designer",
      email: "sarah@outofline.design",
      phone: "+1 (555) 123-4567",
    },
    {
      name: "Marcus Rodriguez",
      role: "Project Manager",
      email: "marcus@outofline.design",
      phone: "+1 (555) 234-5678",
    },
    {
      name: "Emma Wilson",
      role: "Interior Stylist",
      email: "emma@outofline.design",
      phone: "+1 (555) 345-6789",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate("/dashboard")}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-display font-bold">Settings</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Client Profile */}
        <Card className="p-8 shadow-medium border-border/50 animate-fade-in-up">
          <h2 className="text-xl font-display font-semibold mb-6">Your Profile</h2>
          <div className="space-y-6">
            <div className="flex items-center gap-6">
              <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="h-10 w-10 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold">Alexandra Martinez</h3>
                <p className="text-sm text-muted-foreground">Client</p>
              </div>
              <Button variant="outline">Edit Profile</Button>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6 pt-6 border-t border-border">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  <span className="text-sm">Email</span>
                </div>
                <p className="font-medium">alex.martinez@email.com</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Phone className="h-4 w-4" />
                  <span className="text-sm">Phone</span>
                </div>
                <p className="font-medium">+1 (555) 987-6543</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Project Team */}
        <div className="space-y-4 animate-fade-in-up stagger-1">
          <h2 className="text-xl font-display font-semibold">Your Design Team</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {team.map((member, index) => (
              <Card
                key={index}
                className="p-6 shadow-soft border-border/50 hover:shadow-medium transition-all"
              >
                <div className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-display font-semibold text-lg">{member.name}</h3>
                    <Badge className="bg-primary/10 text-primary border-primary/20">
                      {member.role}
                    </Badge>
                  </div>
                  
                  <div className="space-y-3 pt-4 border-t border-border">
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">{member.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">{member.phone}</span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Notification Preferences */}
        <Card className="p-8 shadow-soft border-border/50 animate-fade-in-up stagger-2">
          <div className="flex items-center gap-3 mb-6">
            <Bell className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-display font-semibold">Notification Preferences</h2>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-border">
              <div>
                <p className="font-medium">Budget Updates</p>
                <p className="text-sm text-muted-foreground">Get notified when budget changes occur</p>
              </div>
              <Button variant="outline" size="sm">Enabled</Button>
            </div>
            
            <div className="flex items-center justify-between py-3 border-b border-border">
              <div>
                <p className="font-medium">Material Approvals</p>
                <p className="text-sm text-muted-foreground">Alerts when new items need your approval</p>
              </div>
              <Button variant="outline" size="sm">Enabled</Button>
            </div>
            
            <div className="flex items-center justify-between py-3 border-b border-border">
              <div>
                <p className="font-medium">New Photos</p>
                <p className="text-sm text-muted-foreground">Notify when site photos are uploaded</p>
              </div>
              <Button variant="outline" size="sm">Enabled</Button>
            </div>
            
            <div className="flex items-center justify-between py-3">
              <div>
                <p className="font-medium">Team Messages</p>
                <p className="text-sm text-muted-foreground">Get alerts for new chat messages</p>
              </div>
              <Button variant="outline" size="sm">Enabled</Button>
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
};

export default Settings;
