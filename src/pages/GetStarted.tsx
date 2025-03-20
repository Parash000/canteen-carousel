
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import FadeInSection from "@/components/FadeInSection";

const GetStarted = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
          alt="Food background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/60 to-black/80" />
        
        {/* Pattern overlay */}
        <div className="absolute inset-0 bg-grid-pattern opacity-10" style={{ 
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 0V20M20 1H0' stroke='white' stroke-opacity='0.2' stroke-width='0.5'/%3E%3C/svg%3E\")",
          backgroundSize: "20px 20px"
        }} />
      </div>

      {/* Content */}
      <div className="container max-w-6xl mx-auto px-4 py-10 flex flex-col min-h-screen">
        <div className="flex-1 flex flex-col justify-center items-center text-center mt-10 md:mt-0 relative z-10">
          <FadeInSection delay={300} direction="up">
            <div className="inline-block px-3 py-1 mb-6 text-xs font-medium tracking-wider uppercase text-white bg-canteen-accent/90 rounded-full">
              Canteen Fresh
            </div>
          </FadeInSection>
          
          <FadeInSection delay={500} direction="up">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 max-w-4xl">
              Delicious food, <span className="text-canteen-accent">delivered fresh</span> to your desk
            </h1>
          </FadeInSection>
          
          <FadeInSection delay={700} direction="up">
            <p className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl">
              Skip the wait. Order ahead from our campus canteen and enjoy fresh, healthy meals exactly when you want them.
            </p>
          </FadeInSection>
          
          <FadeInSection delay={900} direction="up">
            <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md mx-auto">
              <Button
                className="bg-canteen-accent hover:bg-canteen-accent-dark text-white py-6 text-lg font-medium group transition-all hover:scale-105"
                onClick={() => navigate("/auth")}
              >
                Get Started
                <ChevronRight className="ml-1 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button
                variant="outline"
                className="border-white text-white hover:bg-white/10 py-6 text-lg font-medium"
                onClick={() => navigate("/home")}
              >
                Browse Menu
              </Button>
            </div>
          </FadeInSection>
        </div>
        
        {/* Features */}
        <div className="mt-10 md:mt-16 pb-12 grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
          {[
            {
              title: "Order Ahead",
              description: "Skip the lines by ordering your meals in advance",
              delay: 1100,
            },
            {
              title: "Fresh Ingredients",
              description: "All our dishes are prepared with locally sourced ingredients",
              delay: 1300,
            },
            {
              title: "Quick Pickup",
              description: "Grab your order from our dedicated pickup station",
              delay: 1500,
            },
          ].map((feature, index) => (
            <FadeInSection key={index} delay={feature.delay} direction="up">
              <div className="glass-card rounded-xl p-6 text-center">
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-white/70 text-sm">{feature.description}</p>
              </div>
            </FadeInSection>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GetStarted;
