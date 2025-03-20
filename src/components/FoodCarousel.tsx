
import { useState, useEffect, useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import FadeInSection from "./FadeInSection";

// Example food data
const foodItems = [
  {
    id: 1,
    name: "Avocado Toast",
    image: "https://images.unsplash.com/photo-1588137378633-dea1336ce1e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    description: "Freshly baked sourdough topped with smashed avocado, poached eggs, and microgreens",
    price: "$8.99",
    category: "Breakfast",
  },
  {
    id: 2,
    name: "Quinoa Power Bowl",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    description: "Protein-packed quinoa bowl with roasted vegetables, kale, and tahini dressing",
    price: "$10.99",
    category: "Lunch",
  },
  {
    id: 3,
    name: "Margherita Pizza",
    image: "https://images.unsplash.com/photo-1594007654729-407eedc4be65?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    description: "Classic Neapolitan pizza with tomato sauce, fresh mozzarella, and basil",
    price: "$12.99",
    category: "Dinner",
  },
  {
    id: 4,
    name: "Fresh Fruit Parfait",
    image: "https://images.unsplash.com/photo-1590135987412-4d891cb76cc1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    description: "Layers of Greek yogurt, seasonal fruits, and granola drizzled with honey",
    price: "$6.99",
    category: "Breakfast",
  },
  {
    id: 5,
    name: "Poke Bowl",
    image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    description: "Fresh ahi tuna, cucumber, avocado, and pickled vegetables on a bed of rice",
    price: "$14.99",
    category: "Lunch",
  },
];

interface FoodCarouselProps {
  className?: string;
}

export const FoodCarousel = ({ className }: FoodCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [direction, setDirection] = useState<"left" | "right">("right");
  const carouselRef = useRef<HTMLDivElement>(null);

  // Preload images
  useEffect(() => {
    const loadImages = async () => {
      try {
        const promises = foodItems.map((item) => {
          return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = item.image;
            img.onload = resolve;
            img.onerror = reject;
          });
        });
        await Promise.all(promises);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to preload images", error);
        setIsLoading(false);
      }
    };
    loadImages();
  }, []);

  // Auto-scroll
  useEffect(() => {
    const interval = setInterval(() => {
      goToNext();
    }, 5000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  const goToPrev = () => {
    setDirection("left");
    setCurrentIndex((prev) => (prev === 0 ? foodItems.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setDirection("right");
    setCurrentIndex((prev) => (prev === foodItems.length - 1 ? 0 : prev + 1));
  };

  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? "right" : "left");
    setCurrentIndex(index);
  };

  return (
    <div 
      className={cn(
        "relative rounded-2xl shadow-sm overflow-hidden aspect-[16/9] md:aspect-[21/9]",
        className
      )}
      ref={carouselRef}
    >
      {isLoading ? (
        <div className="w-full h-full flex items-center justify-center bg-canteen-200">
          <div className="w-10 h-10 border-4 border-canteen-accent border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <>
          {/* Main carousel image */}
          <div className="relative w-full h-full overflow-hidden">
            {foodItems.map((item, index) => (
              <div
                key={item.id}
                className={cn(
                  "absolute top-0 left-0 w-full h-full transition-all duration-700 ease-in-out",
                  index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
                )}
                style={{
                  transform: 
                    index === currentIndex 
                      ? "translateX(0)" 
                      : direction === "right" && index === (currentIndex + 1) % foodItems.length 
                      ? "translateX(100%)" 
                      : direction === "left" && index === (currentIndex - 1 + foodItems.length) % foodItems.length
                      ? "translateX(-100%)"
                      : "",
                }}
              >
                <div className="relative w-full h-full">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                </div>
                
                {/* Content overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 z-20">
                  <div 
                    className={cn(
                      "transition-all transform",
                      index === currentIndex ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                    )}
                    style={{ transitionDelay: index === currentIndex ? "300ms" : "0ms" }}
                  >
                    <div className="inline-block mb-3 px-2 py-1 text-xs font-medium tracking-wide text-white bg-canteen-accent/80 backdrop-blur-sm rounded-full">
                      {item.category}
                    </div>
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2">{item.name}</h2>
                    <p className="text-sm md:text-base text-white/90 mb-4 max-w-xl">{item.description}</p>
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-xl font-bold text-white">{item.price}</span>
                      <Button 
                        className="bg-white text-black hover:bg-white/90 hover:scale-105 transform transition-all"
                      >
                        Order Now
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Navigation controls */}
          <div className="absolute left-4 right-4 top-1/2 -translate-y-1/2 flex justify-between z-20">
            <Button 
              variant="outline" 
              size="icon"
              onClick={goToPrev} 
              className="bg-white/20 backdrop-blur-sm border-white/10 text-white hover:bg-white/30 rounded-full w-10 h-10"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <Button 
              variant="outline" 
              size="icon"
              onClick={goToNext} 
              className="bg-white/20 backdrop-blur-sm border-white/10 text-white hover:bg-white/30 rounded-full w-10 h-10"
            >
              <ArrowRight className="h-5 w-5" />
            </Button>
          </div>
          
          {/* Indicators */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
            {foodItems.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={cn(
                  "w-2 h-2 rounded-full transition-all",
                  index === currentIndex ? "bg-white scale-125" : "bg-white/50 hover:bg-white/70"
                )}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default FoodCarousel;
