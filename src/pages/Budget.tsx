import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, TrendingUp, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

const Budget = () => {
  const navigate = useNavigate();

  const budgetData = {
    total: 150000,
    spent: 92000,
    categories: [
      { name: "Furniture", planned: 40000, actual: 38500, status: "on-track" },
      { name: "Civil Work", planned: 50000, actual: 52000, status: "over" },
      { name: "Lighting", planned: 20000, actual: 12500, status: "under" },
      { name: "Decor", planned: 25000, actual: 18000, status: "on-track" },
      { name: "Appliances", planned: 15000, actual: 15000, status: "on-track" },
    ],
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "over":
        return "text-destructive";
      case "under":
        return "text-success";
      default:
        return "text-foreground";
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "over":
        return <Badge className="bg-destructive/10 text-destructive border-destructive/20">Over Budget</Badge>;
      case "under":
        return <Badge className="bg-success/10 text-success border-success/20">Under Budget</Badge>;
      default:
        return <Badge className="bg-primary/10 text-primary border-primary/20">On Track</Badge>;
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
          <h1 className="text-2xl font-display font-bold">Budget Tracking</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Overall Budget Summary */}
        <Card className="p-8 shadow-medium border-border/50 animate-fade-in-up">
          <div className="space-y-6">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground uppercase tracking-wide">Total Project Budget</p>
                <h2 className="text-4xl font-display font-bold">${budgetData.total.toLocaleString()}</h2>
              </div>
              <div className="text-right space-y-2">
                <p className="text-sm text-muted-foreground uppercase tracking-wide">Spent to Date</p>
                <h3 className="text-3xl font-display font-semibold text-primary">${budgetData.spent.toLocaleString()}</h3>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Progress</span>
                <span className="font-semibold">{Math.round((budgetData.spent / budgetData.total) * 100)}%</span>
              </div>
              <Progress value={(budgetData.spent / budgetData.total) * 100} className="h-4" />
            </div>

            <div className="pt-4 border-t border-border">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Remaining</span>
                <span className="text-xl font-display font-semibold">${(budgetData.total - budgetData.spent).toLocaleString()}</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Category Breakdown */}
        <div className="space-y-4">
          <h3 className="text-xl font-display font-semibold">Budget by Category</h3>
          
          {budgetData.categories.map((category, index) => (
            <Card
              key={index}
              className="p-6 shadow-soft border-border/50 hover:shadow-medium transition-all animate-fade-in-up"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <h4 className="font-display font-semibold text-lg">{category.name}</h4>
                    <div className="flex items-center gap-2">
                      {getStatusBadge(category.status)}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Actual / Planned</p>
                    <p className={`text-xl font-display font-semibold ${getStatusColor(category.status)}`}>
                      ${category.actual.toLocaleString()} / ${category.planned.toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Progress 
                    value={(category.actual / category.planned) * 100} 
                    className="h-2"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{Math.round((category.actual / category.planned) * 100)}% utilized</span>
                    {category.status === "over" && (
                      <span className="flex items-center gap-1 text-destructive">
                        <AlertCircle className="h-3 w-3" />
                        ${(category.actual - category.planned).toLocaleString()} over
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Budget Insights */}
        <Card className="p-6 bg-primary/5 border-primary/20 shadow-soft animate-fade-in-up">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-primary/10">
              <TrendingUp className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1 space-y-2">
              <h4 className="font-display font-semibold">Budget Insights</h4>
              <p className="text-sm text-muted-foreground">
                You're currently tracking slightly over budget in Civil Work due to unexpected structural requirements. 
                However, savings in Lighting and Decor are helping offset these costs. Overall, you're on track to complete the project within 5% of the original budget.
              </p>
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
};

export default Budget;
