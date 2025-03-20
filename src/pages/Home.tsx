import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import Navigation from "@/components/Navigation";
import FoodCarousel from "@/components/FoodCarousel";
import FadeInSection from "@/components/FadeInSection";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Coffee, Pizza, UtensilsCrossed, Clock, TrendingUp } from "lucide-react";
import { menuApi } from "@/services/api";
import { MenuItem } from "@/types/menu";
import { toast } from "sonner";

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Fetch breakfast menu items
  const breakfastQuery = useQuery({
    queryKey: ['menu', 'breakfast'],
    queryFn: () => menuApi.getByCategory('breakfast'),
    onSuccess: () => setIsLoading(false),
    onError: (error) => {
      console.error('Error fetching breakfast menu:', error);
      toast.error('Failed to load breakfast menu');
      setIsLoading(false);
    }
  });
  
  // Fetch lunch menu items
  const lunchQuery = useQuery({
    queryKey: ['menu', 'lunch'],
    queryFn: () => menuApi.getByCategory('lunch'),
    onError: (error) => {
      console.error('Error fetching lunch menu:', error);
    }
  });
  
  // Fetch dinner menu items
  const dinnerQuery = useQuery({
    queryKey: ['menu', 'dinner'],
    queryFn: () => menuApi.getByCategory('dinner'),
    onError: (error) => {
      console.error('Error fetching dinner menu:', error);
    }
  });
  
  // Use the local food categories as fallback if API fails
  const foodCategories = {
    breakfast: breakfastQuery.data || [],
    lunch: lunchQuery.data || [],
    dinner: dinnerQuery.data || [],
  };
  
  // If all queries are loading, show the fallback categories
  const isAllLoading = breakfastQuery.isLoading && lunchQuery.isLoading && dinnerQuery.isLoading;
  
  return (
    <div className="min-h-screen bg-canteen flex flex-col">
      <Navigation />
      
      <main className="flex-1 pt-20">
        {/* Hero Section with Carousel */}
        <section className="container max-w-6xl mx-auto px-4 pt-8 md:pt-16 pb-10">
          <FadeInSection>
            <FoodCarousel className="mb-12" />
          </FadeInSection>
          
          {/* Quick Actions */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {[
              { title: "Today's Special", icon: TrendingUp, color: "bg-red-50 text-red-500" },
              { title: "Quick Pickup", icon: Clock, color: "bg-blue-50 text-blue-500" },
              { title: "Breakfast", icon: Coffee, color: "bg-amber-50 text-amber-500" },
              { title: "Lunch & Dinner", icon: UtensilsCrossed, color: "bg-green-50 text-green-500" },
            ].map((action, index) => (
              <FadeInSection key={index} delay={300 + index * 100} direction="up">
                <Button
                  variant="ghost"
                  className="w-full h-24 flex-col gap-2 rounded-xl border hover:bg-canteen-100"
                >
                  <div className={`w-10 h-10 rounded-full ${action.color} flex items-center justify-center`}>
                    <action.icon className="h-5 w-5" />
                  </div>
                  <span className="text-canteen-800 font-medium">{action.title}</span>
                </Button>
              </FadeInSection>
            ))}
          </div>
          
          {/* Search Section */}
          <FadeInSection delay={600} direction="up">
            <div className="relative mx-auto max-w-md mb-12">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-canteen-400" />
              </div>
              <input
                type="text"
                placeholder="Search for dishes..."
                className="block w-full pl-10 pr-4 py-3 rounded-full border border-canteen-200 focus:outline-none focus:ring-2 focus:ring-canteen-accent focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </FadeInSection>
          
          {/* Menu Categories */}
          <FadeInSection delay={700} direction="up">
            <h2 className="text-2xl font-bold text-canteen-800 mb-6">Menu Categories</h2>
            
            <Tabs defaultValue="breakfast" className="mb-16">
              <TabsList className="mb-8 bg-transparent">
                <TabsTrigger 
                  value="breakfast"
                  className="data-[state=active]:bg-canteen-accent data-[state=active]:text-white"
                >
                  <Coffee className="h-4 w-4 mr-2" />
                  Breakfast
                </TabsTrigger>
                <TabsTrigger 
                  value="lunch"
                  className="data-[state=active]:bg-canteen-accent data-[state=active]:text-white"
                >
                  <Pizza className="h-4 w-4 mr-2" />
                  Lunch
                </TabsTrigger>
                <TabsTrigger 
                  value="dinner"
                  className="data-[state=active]:bg-canteen-accent data-[state=active]:text-white"
                >
                  <UtensilsCrossed className="h-4 w-4 mr-2" />
                  Dinner
                </TabsTrigger>
              </TabsList>
              
              {Object.entries(foodCategories).map(([category, items]) => (
                <TabsContent key={category} value={category}>
                  {isAllLoading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                      {Array(4).fill(0).map((_, index) => (
                        <div key={index} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-canteen-100 animate-pulse">
                          <div className="h-48 bg-canteen-200" />
                          <div className="p-4">
                            <div className="h-4 bg-canteen-200 rounded w-3/4 mb-2" />
                            <div className="h-4 bg-canteen-200 rounded w-1/4 mb-2" />
                            <div className="h-3 bg-canteen-200 rounded w-full mb-4" />
                            <div className="h-8 bg-canteen-200 rounded w-full" />
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                      {Array.isArray(items) && items.map((item: MenuItem, index: number) => (
                        <FadeInSection key={item._id || index} delay={300 + index * 100} direction="up">
                          <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-canteen-100">
                            <div className="aspect-w-16 aspect-h-9 relative overflow-hidden">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-48 object-cover transition-transform hover:scale-105 duration-500"
                              />
                            </div>
                            <div className="p-4">
                              <div className="flex justify-between items-start mb-2">
                                <h3 className="font-semibold text-canteen-800">{item.name}</h3>
                                <span className="font-bold text-canteen-accent">{item.price}</span>
                              </div>
                              <p className="text-canteen-600 text-sm mb-4 line-clamp-2">{item.description}</p>
                              <Button size="sm" className="w-full bg-canteen-accent hover:bg-canteen-accent-dark text-white">
                                Add to Order
                              </Button>
                            </div>
                          </div>
                        </FadeInSection>
                      ))}
                    </div>
                  )}
                </TabsContent>
              ))}
            </Tabs>
          </FadeInSection>
        </section>
      </main>
      
      {/* Footer */}
      <footer className="bg-white border-t border-canteen-200 py-6">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="text-center">
            <p className="text-canteen-500 text-sm">© 2023 CanteenFresh. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
