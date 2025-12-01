import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Bell, Calendar, DollarSign, Image, MessageSquare } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const projectData = {
    name: "Tribeca Loft Renovation",
    progress: 68,
    budget: {
      total: 150000,
      spent: 92000,
    },
    nextMilestone: {
      title: "Kitchen Installation",
      date: "Dec 15, 2025",
    },
    notifications: [
      "Material approval needed for living room sofa",
      "New site photos uploaded",
      "Budget update: Lighting fixtures",
    ],
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <svg width="40" height="40" viewBox="0 0 120 120" fill="none">
              <path d="M20 60 L45 35 L70 60 L95 30" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round" />
              <path d="M30 80 L60 50 L90 80" stroke="hsl(var(--foreground))" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <h2 className="text-xl font-display font-semibold">Out of Line</h2>
          </div>
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 h-2 w-2 bg-accent rounded-full" />
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Welcome Section */}
        <div className="space-y-2 animate-fade-in-up">
          <h1 className="text-4xl font-display font-bold tracking-tight">{projectData.name}</h1>
          <p className="text-muted-foreground">Your design journey, tracked beautifully</p>
        </div>

        {/* Overall Progress */}
        <Card className="p-8 shadow-medium border-border/50 animate-fade-in-up stagger-1">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-display font-semibold">Overall Progress</h3>
              <span className="text-3xl font-display font-bold text-primary">{projectData.progress}%</span>
            </div>
            <Progress value={projectData.progress} className="h-3" />
            <p className="text-sm text-muted-foreground">
              You're making excellent progress. Next milestone coming up soon.
            </p>
          </div>
        </Card>

        {/* Grid Layout */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Budget Summary */}
          <Card 
            className="p-6 shadow-soft border-border/50 hover:shadow-medium transition-all cursor-pointer group animate-fade-in-up stagger-2"
            onClick={() => navigate("/budget")}
          >
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-primary/10">
                  <DollarSign className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-lg font-display font-semibold">Budget</h3>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Spent</span>
                  <span className="font-semibold">${projectData.budget.spent.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Total</span>
                  <span className="font-semibold">${projectData.budget.total.toLocaleString()}</span>
                </div>
                <Progress 
                  value={(projectData.budget.spent / projectData.budget.total) * 100} 
                  className="h-2" 
                />
              </div>
              <p className="text-xs text-muted-foreground group-hover:text-foreground transition-colors">
                Click to view detailed breakdown →
              </p>
            </div>
          </Card>

          {/* Next Milestone */}
          <Card 
            className="p-6 shadow-soft border-border/50 hover:shadow-medium transition-all cursor-pointer group animate-fade-in-up stagger-2"
            onClick={() => navigate("/timeline")}
          >
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-success/10">
                  <Calendar className="h-5 w-5 text-success" />
                </div>
                <h3 className="text-lg font-display font-semibold">Next Milestone</h3>
              </div>
              <div className="space-y-2">
                <p className="font-semibold">{projectData.nextMilestone.title}</p>
                <p className="text-sm text-muted-foreground">{projectData.nextMilestone.date}</p>
              </div>
              <p className="text-xs text-muted-foreground group-hover:text-foreground transition-colors">
                View full timeline →
              </p>
            </div>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-fade-in-up stagger-3">
          <Button
            variant="outline"
            className="h-24 flex flex-col gap-2 hover:bg-primary/5 hover:border-primary/50 transition-all"
            onClick={() => navigate("/timeline")}
          >
            <Calendar className="h-6 w-6 text-primary" />
            <span className="text-sm font-medium">Timeline</span>
          </Button>
          <Button
            variant="outline"
            className="h-24 flex flex-col gap-2 hover:bg-primary/5 hover:border-primary/50 transition-all"
            onClick={() => navigate("/approvals")}
          >
            <DollarSign className="h-6 w-6 text-primary" />
            <span className="text-sm font-medium">Approvals</span>
          </Button>
          <Button
            variant="outline"
            className="h-24 flex flex-col gap-2 hover:bg-primary/5 hover:border-primary/50 transition-all"
            onClick={() => navigate("/photos")}
          >
            <Image className="h-6 w-6 text-primary" />
            <span className="text-sm font-medium">Photos</span>
          </Button>
          <Button
            variant="outline"
            className="h-24 flex flex-col gap-2 hover:bg-primary/5 hover:border-primary/50 transition-all"
            onClick={() => navigate("/chat")}
          >
            <MessageSquare className="h-6 w-6 text-primary" />
            <span className="text-sm font-medium">Chat</span>
          </Button>
        </div>

        {/* Notifications Panel */}
        <Card className="p-6 shadow-soft border-border/50 animate-fade-in-up stagger-4">
          <h3 className="text-lg font-display font-semibold mb-4">Recent Updates</h3>
          <div className="space-y-3">
            {projectData.notifications.map((notification, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="h-2 w-2 rounded-full bg-primary mt-2" />
                <p className="text-sm text-muted-foreground flex-1">{notification}</p>
              </div>
            ))}
          </div>
        </Card>
      </main>
    </div>
  );
};

export default Dashboard;
