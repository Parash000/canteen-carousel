
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Eye, EyeOff, Mail, Lock, ArrowLeft } from "lucide-react";
import FadeInSection from "@/components/FadeInSection";
import { toast } from "sonner";

const Auth = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // Login state
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  
  // Signup state
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
  });
  
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success("Login successful!");
      setLoading(false);
      navigate("/home");
    }, 1500);
  };
  
  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success("Account created successfully!");
      setLoading(false);
      navigate("/home");
    }, 1500);
  };
  
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Panel - Image */}
      <div className="hidden md:block md:w-1/2 relative">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
            alt="Restaurant interior"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent"></div>
        </div>
        
        <div className="absolute inset-0 flex flex-col justify-center px-12">
          <FadeInSection delay={300} direction="right">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Welcome to <br />
              <span className="text-canteen-accent">Canteen</span>Fresh
            </h1>
          </FadeInSection>
          
          <FadeInSection delay={500} direction="right">
            <p className="text-white/80 mb-8 max-w-md">
              Order delicious, fresh meals from our canteen menu and have them ready when you are.
            </p>
          </FadeInSection>
          
          <FadeInSection delay={700} direction="right">
            <div className="space-y-3">
              {[
                "Order ahead and skip the lines",
                "Freshly prepared campus food",
                "Special dietary options available",
                "Earn rewards with every purchase",
              ].map((benefit, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-canteen-accent"></div>
                  <p className="text-white/90 text-sm">{benefit}</p>
                </div>
              ))}
            </div>
          </FadeInSection>
        </div>
      </div>
      
      {/* Right Panel - Form */}
      <div className="flex-1 bg-white">
        <div className="max-w-md mx-auto flex flex-col h-full p-6 md:p-12">
          <div className="mb-4">
            <Button
              variant="ghost"
              className="gap-1 text-canteen-600 hover:text-canteen-800 hover:bg-canteen-100 -ml-2 mb-6"
              onClick={() => navigate("/")}
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            
            <FadeInSection>
              <h2 className="text-2xl font-bold text-canteen-900 mb-1">
                Welcome back
              </h2>
              <p className="text-canteen-500 mb-6">Sign in to continue to your account</p>
            </FadeInSection>
          </div>

          <Tabs defaultValue="login" className="flex-1 flex flex-col">
            <TabsList className="grid grid-cols-2 mb-8">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login" className="flex-1 flex flex-col">
              <form onSubmit={handleLoginSubmit} className="space-y-5 flex-1 flex flex-col">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      className="pl-10"
                      required
                      value={loginData.email}
                      onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                    />
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-canteen-500" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Button variant="link" className="p-0 h-auto text-xs text-canteen-accent hover:text-canteen-accent-dark">
                      Forgot password?
                    </Button>
                  </div>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className="pl-10"
                      required
                      value={loginData.password}
                      onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                    />
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-canteen-500" />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-1 top-1/2 -translate-y-1/2 text-canteen-500 hover:text-canteen-800 h-8 w-8"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
                
                <div className="mt-auto pt-6">
                  <Button 
                    type="submit" 
                    className="w-full bg-canteen-accent hover:bg-canteen-accent-dark text-white"
                    disabled={loading}
                  >
                    {loading ? 
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Logging in...</span>
                      </div> : 
                      "Login"
                    }
                  </Button>
                </div>
              </form>
            </TabsContent>
            
            <TabsContent value="signup" className="flex-1 flex flex-col">
              <form onSubmit={handleSignupSubmit} className="space-y-4 flex-1 flex flex-col">
                <div className="space-y-2">
                  <Label htmlFor="signup-name">Full Name</Label>
                  <Input
                    id="signup-name"
                    placeholder="John Doe"
                    required
                    value={signupData.name}
                    onChange={(e) => setSignupData({ ...signupData, name: e.target.value })}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="signup-email">Email</Label>
                  <div className="relative">
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="your@email.com"
                      className="pl-10"
                      required
                      value={signupData.email}
                      onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                    />
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-canteen-500" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="signup-password">Password</Label>
                  <div className="relative">
                    <Input
                      id="signup-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className="pl-10"
                      required
                      value={signupData.password}
                      onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                    />
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-canteen-500" />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-1 top-1/2 -translate-y-1/2 text-canteen-500 hover:text-canteen-800 h-8 w-8"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
                
                <div className="flex items-start gap-2 my-2">
                  <input
                    type="checkbox"
                    id="terms"
                    className="mt-1 h-4 w-4 rounded border-canteen-300 text-canteen-accent focus:ring-canteen-accent/80"
                    required
                  />
                  <Label htmlFor="terms" className="text-sm text-canteen-600">
                    I agree to the <button type="button" className="text-canteen-accent hover:underline">Terms of Service</button> and <button type="button" className="text-canteen-accent hover:underline">Privacy Policy</button>
                  </Label>
                </div>
                
                <div className="mt-auto pt-4">
                  <Button 
                    type="submit" 
                    className="w-full bg-canteen-accent hover:bg-canteen-accent-dark text-white"
                    disabled={loading}
                  >
                    {loading ? 
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Creating account...</span>
                      </div> : 
                      "Create Account"
                    }
                  </Button>
                </div>
              </form>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Auth;
