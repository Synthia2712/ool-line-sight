import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Photos = () => {
  const navigate = useNavigate();

  const photoSets = [
    {
      date: "Nov 28, 2025",
      phase: "Kitchen Installation",
      photos: [
        "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800&q=80",
        "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80",
        "https://images.unsplash.com/photo-1556909212-d5b604d0c90d?w=800&q=80",
      ],
    },
    {
      date: "Nov 20, 2025",
      phase: "Living Room Progress",
      photos: [
        "https://images.unsplash.com/photo-1556912167-f556f1f39faa?w=800&q=80",
        "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&q=80",
        "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800&q=80",
        "https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?w=800&q=80",
      ],
    },
    {
      date: "Nov 12, 2025",
      phase: "Structural Work Complete",
      photos: [
        "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?w=800&q=80",
        "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80",
      ],
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
          <h1 className="text-2xl font-display font-bold">Site Photos</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8 space-y-12">
        {photoSets.map((set, setIndex) => (
          <div key={setIndex} className="space-y-4 animate-fade-in-up" style={{ animationDelay: `${setIndex * 100}ms` }}>
            {/* Set Header */}
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h2 className="text-xl font-display font-semibold">{set.phase}</h2>
                <p className="text-sm text-muted-foreground">{set.date}</p>
              </div>
              <Badge className="bg-primary/10 text-primary border-primary/20">
                {set.photos.length} photos
              </Badge>
            </div>

            {/* Photo Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {set.photos.map((photo, photoIndex) => (
                <Card
                  key={photoIndex}
                  className="overflow-hidden group cursor-pointer shadow-soft hover:shadow-medium transition-all border-border/50"
                >
                  <div className="aspect-[4/3] overflow-hidden bg-muted">
                    <img
                      src={photo}
                      alt={`${set.phase} - Photo ${photoIndex + 1}`}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                </Card>
              ))}
            </div>

            {/* Divider */}
            {setIndex < photoSets.length - 1 && (
              <div className="pt-8">
                <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
              </div>
            )}
          </div>
        ))}
      </main>
    </div>
  );
};

export default Photos;
