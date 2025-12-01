import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const Onboarding = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="max-w-2xl w-full text-center space-y-12">
        {/* Logo - Abstract linework */}
        <div className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <div className="inline-block">
            <svg
              width="120"
              height="120"
              viewBox="0 0 120 120"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="mx-auto"
            >
              {/* Abstract asymmetric lines */}
              <path
                d="M20 60 L45 35 L70 60 L95 30"
                stroke="hsl(var(--primary))"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M30 80 L60 50 L90 80"
                stroke="hsl(var(--foreground))"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle
                cx="60"
                cy="60"
                r="45"
                stroke="hsl(var(--primary))"
                strokeWidth="1.5"
                strokeDasharray="4 4"
                opacity="0.3"
              />
            </svg>
          </div>
        </div>

        {/* Brand Name */}
        <div className={`space-y-4 transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <h1 className="text-5xl md:text-6xl font-display font-bold tracking-tighter text-foreground">
            Out of Line
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground font-light tracking-wide">
            Design made transparent.
          </p>
        </div>

        {/* Description */}
        <p className={`text-base text-muted-foreground max-w-md mx-auto leading-relaxed transition-all duration-1000 delay-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          Welcome to your project dashboard. Track progress, manage budgets, approve materials, and stay connected with your design team—all in one place.
        </p>

        {/* CTA */}
        <div className={`transition-all duration-1000 delay-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <Button
            onClick={() => navigate("/dashboard")}
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90 px-12 py-6 text-lg rounded-xl shadow-medium transition-all hover:shadow-large hover:scale-105"
          >
            Enter Your Project
          </Button>
        </div>

        {/* Decorative element */}
        <div className={`pt-8 transition-all duration-1000 delay-900 ${isVisible ? "opacity-100" : "opacity-0"}`}>
          <div className="h-px w-32 mx-auto bg-gradient-to-r from-transparent via-border to-transparent" />
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
