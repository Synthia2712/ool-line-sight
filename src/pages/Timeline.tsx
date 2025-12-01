import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle2, Circle, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Timeline = () => {
  const navigate = useNavigate();

  const phases = [
    {
      title: "Design & Planning",
      status: "complete",
      startDate: "Sep 1, 2025",
      endDate: "Sep 30, 2025",
      milestones: [
        { name: "Initial Consultation", status: "complete" },
        { name: "Concept Boards", status: "complete" },
        { name: "Final Design Approval", status: "complete" },
      ],
    },
    {
      title: "Demolition & Structural",
      status: "complete",
      startDate: "Oct 1, 2025",
      endDate: "Oct 20, 2025",
      milestones: [
        { name: "Site Preparation", status: "complete" },
        { name: "Demolition Work", status: "complete" },
        { name: "Structural Changes", status: "complete" },
      ],
    },
    {
      title: "Installation & Build",
      status: "in-progress",
      startDate: "Oct 21, 2025",
      endDate: "Dec 15, 2025",
      milestones: [
        { name: "Electrical & Plumbing", status: "complete" },
        { name: "Kitchen Installation", status: "in-progress" },
        { name: "Bathroom Fixtures", status: "pending" },
        { name: "Flooring", status: "pending" },
      ],
    },
    {
      title: "Finishing & Styling",
      status: "pending",
      startDate: "Dec 16, 2025",
      endDate: "Jan 15, 2026",
      milestones: [
        { name: "Paint & Wall Finishes", status: "pending" },
        { name: "Lighting Installation", status: "pending" },
        { name: "Furniture Placement", status: "pending" },
        { name: "Final Styling", status: "pending" },
      ],
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "complete":
        return "bg-success/10 text-success border-success/20";
      case "in-progress":
        return "bg-primary/10 text-primary border-primary/20";
      default:
        return "bg-muted text-muted-foreground border-border";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "complete":
        return <CheckCircle2 className="h-4 w-4" />;
      case "in-progress":
        return <Clock className="h-4 w-4" />;
      default:
        return <Circle className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate("/dashboard")}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-display font-bold">Project Timeline</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="space-y-8">
          {phases.map((phase, phaseIndex) => (
            <Card
              key={phaseIndex}
              className={`p-6 shadow-soft border-border/50 animate-fade-in-up transition-all hover:shadow-medium`}
              style={{ animationDelay: `${phaseIndex * 100}ms` }}
            >
              {/* Phase Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <h2 className="text-xl font-display font-semibold">{phase.title}</h2>
                    <Badge className={getStatusColor(phase.status)}>
                      <span className="flex items-center gap-1">
                        {getStatusIcon(phase.status)}
                        {phase.status === "in-progress"
                          ? "In Progress"
                          : phase.status === "complete"
                          ? "Complete"
                          : "Upcoming"}
                      </span>
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {phase.startDate} — {phase.endDate}
                  </p>
                </div>
              </div>

              {/* Milestones */}
              <div className="space-y-4 pl-4 border-l-2 border-border">
                {phase.milestones.map((milestone, milestoneIndex) => (
                  <div
                    key={milestoneIndex}
                    className="relative pl-6 pb-4 last:pb-0"
                  >
                    {/* Timeline dot */}
                    <div
                      className={`absolute left-[-9px] top-1 h-4 w-4 rounded-full border-2 ${
                        milestone.status === "complete"
                          ? "bg-success border-success"
                          : milestone.status === "in-progress"
                          ? "bg-primary border-primary animate-pulse"
                          : "bg-background border-border"
                      }`}
                    />
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p
                          className={`font-medium ${
                            milestone.status === "pending"
                              ? "text-muted-foreground"
                              : "text-foreground"
                          }`}
                        >
                          {milestone.name}
                        </p>
                      </div>
                      <Badge
                        variant="outline"
                        className={`${getStatusColor(milestone.status)} text-xs`}
                      >
                        {milestone.status === "in-progress"
                          ? "Active"
                          : milestone.status === "complete"
                          ? "Done"
                          : "Pending"}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>

        {/* Summary Footer */}
        <Card className="mt-8 p-6 bg-primary/5 border-primary/20 shadow-soft">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Estimated Completion</p>
              <p className="text-lg font-display font-semibold">January 15, 2026</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground mb-1">Days Remaining</p>
              <p className="text-lg font-display font-semibold text-primary">42 days</p>
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
};

export default Timeline;
