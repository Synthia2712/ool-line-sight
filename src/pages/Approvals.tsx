import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Check, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Approvals = () => {
  const navigate = useNavigate();

  const [materials, setMaterials] = useState([
    {
      id: 1,
      name: "Velvet Sofa - Sage Green",
      category: "Furniture",
      price: 2850,
      image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80",
      status: "pending",
      description: "Three-seater velvet sofa in dusty sage",
    },
    {
      id: 2,
      name: "Marble Coffee Table",
      category: "Furniture",
      price: 1200,
      image: "https://images.unsplash.com/photo-1532372320572-cda25653a26d?w=600&q=80",
      status: "approved",
      description: "White marble top with brass legs",
    },
    {
      id: 3,
      name: "Pendant Light - Brass",
      category: "Lighting",
      price: 450,
      image: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=600&q=80",
      status: "pending",
      description: "Modern brass pendant for dining area",
    },
    {
      id: 4,
      name: "Ceramic Vase Set",
      category: "Decor",
      price: 180,
      image: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=600&q=80",
      status: "pending",
      description: "Set of 3 terracotta vases",
    },
  ]);

  const handleApprove = (id: number) => {
    setMaterials(materials.map(m => m.id === id ? { ...m, status: "approved" } : m));
  };

  const handleReject = (id: number) => {
    setMaterials(materials.map(m => m.id === id ? { ...m, status: "revision" } : m));
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-success/10 text-success border-success/20">Approved</Badge>;
      case "revision":
        return <Badge className="bg-warning/10 text-warning border-warning/20">Needs Revision</Badge>;
      default:
        return <Badge className="bg-primary/10 text-primary border-primary/20">Pending Review</Badge>;
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
          <h1 className="text-2xl font-display font-bold">Material Approvals</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid md:grid-cols-2 gap-6">
          {materials.map((material, index) => (
            <Card
              key={material.id}
              className="overflow-hidden shadow-soft border-border/50 hover:shadow-medium transition-all animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Image */}
              <div className="aspect-[4/3] overflow-hidden bg-muted">
                <img
                  src={material.image}
                  alt={material.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1 flex-1">
                      <p className="text-xs text-muted-foreground uppercase tracking-wide">{material.category}</p>
                      <h3 className="font-display font-semibold text-lg">{material.name}</h3>
                    </div>
                    {getStatusBadge(material.status)}
                  </div>
                  <p className="text-sm text-muted-foreground">{material.description}</p>
                </div>

                <div className="pt-4 border-t border-border">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-muted-foreground">Price</span>
                    <span className="text-xl font-display font-semibold">${material.price.toLocaleString()}</span>
                  </div>

                  {material.status === "pending" && (
                    <div className="flex gap-3">
                      <Button
                        onClick={() => handleReject(material.id)}
                        variant="outline"
                        className="flex-1 hover:bg-destructive/5 hover:border-destructive/50 hover:text-destructive"
                      >
                        <X className="h-4 w-4 mr-2" />
                        Request Changes
                      </Button>
                      <Button
                        onClick={() => handleApprove(material.id)}
                        className="flex-1 bg-primary hover:bg-primary/90"
                      >
                        <Check className="h-4 w-4 mr-2" />
                        Approve
                      </Button>
                    </div>
                  )}

                  {material.status === "approved" && (
                    <div className="flex items-center justify-center py-2 px-4 bg-success/5 rounded-lg border border-success/20">
                      <Check className="h-4 w-4 text-success mr-2" />
                      <span className="text-sm text-success font-medium">Approved by you</span>
                    </div>
                  )}

                  {material.status === "revision" && (
                    <div className="flex items-center justify-center py-2 px-4 bg-warning/5 rounded-lg border border-warning/20">
                      <span className="text-sm text-warning font-medium">Revision requested</span>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Approvals;
