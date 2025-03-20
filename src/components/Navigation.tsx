
import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Menu, X, ShoppingCart, Home, User, Coffee, Pizza, UtensilsCrossed } from "lucide-react";

const navLinks = [
  { name: "Home", path: "/home", icon: Home },
  { name: "Breakfast", path: "/category/breakfast", icon: Coffee },
  { name: "Lunch", path: "/category/lunch", icon: Pizza },
  { name: "Dinner", path: "/category/dinner", icon: UtensilsCrossed },
];

export const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  // Close mobile menu when navigating
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out",
        isScrolled 
          ? "bg-white/80 backdrop-blur-lg shadow-sm py-3" 
          : "bg-transparent py-5"
      )}
    >
      <div className="container max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <NavLink to="/home" className="flex items-center gap-2">
            <div className={cn(
              "text-lg md:text-xl font-bold transition-colors",
              isScrolled ? "text-canteen-800" : "text-canteen-800"
            )}>
              Canteen
              <span className="text-canteen-accent">Fresh</span>
            </div>
          </NavLink>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) => cn(
                  "px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                  isActive 
                    ? "text-canteen-accent bg-canteen-accent-light" 
                    : isScrolled 
                      ? "text-canteen-600 hover:text-canteen-accent hover:bg-canteen-accent-light/50" 
                      : "text-canteen-700 hover:text-canteen-accent hover:bg-white/20"
                )}
              >
                {link.name}
              </NavLink>
            ))}
          </nav>
          
          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "rounded-full transition-colors",
                isScrolled ? "text-canteen-700 hover:text-canteen-accent" : "text-canteen-700 hover:text-canteen-accent"
              )}
              aria-label="Shopping Cart"
            >
              <ShoppingCart className="h-5 w-5" />
            </Button>
            
            <div className="hidden md:block">
              <NavLink to="/auth">
                <Button
                  variant="ghost"
                  size="sm"
                  className={cn(
                    "gap-1.5 font-medium",
                    isScrolled ? "text-canteen-700 hover:text-canteen-accent" : "text-canteen-700 hover:text-canteen-accent"
                  )}
                >
                  <User className="h-4 w-4" />
                  <span>Account</span>
                </Button>
              </NavLink>
            </div>
            
            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close Menu" : "Open Menu"}
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu Overlay */}
      <div
        className={cn(
          "fixed inset-0 bg-white z-40 transition-transform duration-300 ease-in-out md:hidden",
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex flex-col h-full p-6 pt-20">
          <div className="space-y-3">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) => cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium transition-all",
                  isActive 
                    ? "bg-canteen-accent-light text-canteen-accent" 
                    : "text-canteen-700 hover:bg-canteen-100"
                )}
              >
                <link.icon className="h-5 w-5" />
                {link.name}
              </NavLink>
            ))}
            
            <div className="pt-4 border-t border-canteen-200 mt-4">
              <NavLink
                to="/auth"
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium text-canteen-700 hover:bg-canteen-100"
              >
                <User className="h-5 w-5" />
                Account
              </NavLink>
            </div>
          </div>
          
          <div className="mt-auto">
            <Button className="w-full" onClick={() => setMobileMenuOpen(false)}>
              Close Menu
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navigation;
