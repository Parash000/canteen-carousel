
import React, { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import FoodCarousel from "@/components/FoodCarousel";
import FadeInSection from "@/components/FadeInSection";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Coffee, Pizza, UtensilsCrossed, Clock, TrendingUp } from "lucide-react";

// Sample food items for each category
const foodCategories = {
  breakfast: [
    {
      id: "b1",
      name: "Avocado Toast",
      image: "https://images.unsplash.com/photo-1588137378633-dea1336ce1e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      price: "$8.99",
      description: "Freshly baked sourdough topped with smashed avocado",
    },
    {
      id: "b2",
      name: "Breakfast Bowl",
      image: "https://images.unsplash.com/photo-1494390248081-4e521a5940db?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      price: "$9.99",
      description: "Greek yogurt, granola, and fresh seasonal berries",
    },
    {
      id: "b3",
      name: "Pancake Stack",
      image: "https://images.unsplash.com/photo-1554520735-0a6b8b6ce8b7?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      price: "$7.99",
      description: "Fluffy pancakes with maple syrup and mixed berries",
    },
    {
      id: "b4",
      name: "Egg Sandwich",
      image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      price: "$6.99",
      description: "Fried egg, cheddar cheese, and bacon on a brioche bun",
    },
  ],
  lunch: [
    {
      id: "l1",
      name: "Quinoa Bowl",
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      price: "$10.99",
      description: "Protein-packed quinoa with roasted vegetables",
    },
    {
      id: "l2",
      name: "Chicken Wrap",
      image: "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      price: "$9.99",
      description: "Grilled chicken, avocado, and veggies in a tortilla wrap",
    },
    {
      id: "l3",
      name: "Poke Bowl",
      image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      price: "$12.99",
      description: "Fresh ahi tuna, cucumber, avocado on rice",
    },
    {
      id: "l4",
      name: "Veggie Sandwich",
      image: "https://images.unsplash.com/photo-1539252554939-0bf58f3e4e13?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      price: "$8.99",
      description: "Roasted vegetables and hummus on multigrain bread",
    },
  ],
  dinner: [
    {
      id: "d1",
      name: "Margherita Pizza",
      image: "https://images.unsplash.com/photo-1594007654729-407eedc4be65?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      price: "$12.99",
      description: "Classic pizza with tomato sauce, mozzarella, and basil",
    },
    {
      id: "d2",
      name: "Grilled Salmon",
      image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      price: "$15.99",
      description: "Perfectly grilled salmon with lemon butter sauce",
    },
    {
      id: "d3",
      name: "Pasta Primavera",
      image: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      price: "$11.99",
      description: "Pasta with seasonal vegetables in a light cream sauce",
    },
    {
      id: "d4",
      name: "Steak Plate",
      image: "https://images.unsplash.com/photo-1504973960431-1c467e159aa4?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      price: "$18.99",
      description: "Grilled steak with roasted potatoes and vegetables",
    },
  ],
};

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  
  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
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
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {items.map((item, index) => (
                      <FadeInSection key={item.id} delay={300 + index * 100} direction="up">
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
