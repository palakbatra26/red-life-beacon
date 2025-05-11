
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { LogIn, UserPlus, Mail, Lock } from 'lucide-react';

const LoginPage = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Login form state
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });
  
  // Register form state
  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  // Form errors
  const [loginErrors, setLoginErrors] = useState<Record<string, string>>({});
  const [registerErrors, setRegisterErrors] = useState<Record<string, string>>({});
  
  // Handle login form change
  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value
    });
    
    // Clear errors when typing
    if (loginErrors[name]) {
      setLoginErrors({
        ...loginErrors,
        [name]: ''
      });
    }
  };
  
  // Handle register form change
  const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegisterData({
      ...registerData,
      [name]: value
    });
    
    // Clear errors when typing
    if (registerErrors[name]) {
      setRegisterErrors({
        ...registerErrors,
        [name]: ''
      });
    }
  };
  
  // Validate login form
  const validateLoginForm = () => {
    const errors: Record<string, string> = {};
    
    if (!loginData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(loginData.email)) {
      errors.email = 'Please enter a valid email';
    }
    
    if (!loginData.password) {
      errors.password = 'Password is required';
    }
    
    setLoginErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  // Validate register form
  const validateRegisterForm = () => {
    const errors: Record<string, string> = {};
    
    if (!registerData.name.trim()) {
      errors.name = 'Name is required';
    }
    
    if (!registerData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(registerData.email)) {
      errors.email = 'Please enter a valid email';
    }
    
    if (!registerData.password) {
      errors.password = 'Password is required';
    } else if (registerData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
    
    if (registerData.password !== registerData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    
    setRegisterErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  // Handle login form submission
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateLoginForm()) {
      // Simulate login - in production would connect to authentication backend
      console.log('Login submitted:', loginData);
      
      // Show success toast
      toast({
        title: "Login Successful!",
        description: "Welcome back to Palak's Blood Donation.",
        variant: "default",
      });
      
      // Redirect to profile page
      setTimeout(() => {
        navigate('/profile');
      }, 1500);
    }
  };
  
  // Handle register form submission
  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateRegisterForm()) {
      // Simulate registration - in production would connect to authentication backend
      console.log('Registration submitted:', registerData);
      
      // Show success toast
      toast({
        title: "Registration Successful!",
        description: "Your account has been created. You can now login.",
        variant: "default",
      });
      
      // Reset form
      setRegisterData({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
      });
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-md mx-auto">
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="login" className="flex items-center justify-center">
                <LogIn className="w-4 h-4 mr-2" />
                Login
              </TabsTrigger>
              <TabsTrigger value="register" className="flex items-center justify-center">
                <UserPlus className="w-4 h-4 mr-2" />
                Register
              </TabsTrigger>
            </TabsList>
            
            {/* Login Tab */}
            <TabsContent value="login">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">Login to Your Account</h2>
                
                <form onSubmit={handleLoginSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="login-email" className="block text-sm font-medium text-gray-700">Email</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="login-email"
                        name="email"
                        type="email"
                        placeholder="your@email.com"
                        className={`pl-10 ${loginErrors.email ? "border-red-500" : ""}`}
                        value={loginData.email}
                        onChange={handleLoginChange}
                      />
                    </div>
                    {loginErrors.email && <p className="text-red-500 text-xs">{loginErrors.email}</p>}
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label htmlFor="login-password" className="block text-sm font-medium text-gray-700">Password</label>
                      <a href="#" className="text-xs text-primary hover:underline">Forgot Password?</a>
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="login-password"
                        name="password"
                        type="password"
                        placeholder="••••••••"
                        className={`pl-10 ${loginErrors.password ? "border-red-500" : ""}`}
                        value={loginData.password}
                        onChange={handleLoginChange}
                      />
                    </div>
                    {loginErrors.password && <p className="text-red-500 text-xs">{loginErrors.password}</p>}
                  </div>
                  
                  <Button type="submit" className="w-full">Login</Button>
                </form>
              </div>
            </TabsContent>
            
            {/* Register Tab */}
            <TabsContent value="register">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">Create an Account</h2>
                
                <form onSubmit={handleRegisterSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="register-name" className="block text-sm font-medium text-gray-700">Full Name</label>
                    <Input
                      id="register-name"
                      name="name"
                      placeholder="John Doe"
                      className={registerErrors.name ? "border-red-500" : ""}
                      value={registerData.name}
                      onChange={handleRegisterChange}
                    />
                    {registerErrors.name && <p className="text-red-500 text-xs">{registerErrors.name}</p>}
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="register-email" className="block text-sm font-medium text-gray-700">Email</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="register-email"
                        name="email"
                        type="email"
                        placeholder="your@email.com"
                        className={`pl-10 ${registerErrors.email ? "border-red-500" : ""}`}
                        value={registerData.email}
                        onChange={handleRegisterChange}
                      />
                    </div>
                    {registerErrors.email && <p className="text-red-500 text-xs">{registerErrors.email}</p>}
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="register-password" className="block text-sm font-medium text-gray-700">Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="register-password"
                        name="password"
                        type="password"
                        placeholder="••••••••"
                        className={`pl-10 ${registerErrors.password ? "border-red-500" : ""}`}
                        value={registerData.password}
                        onChange={handleRegisterChange}
                      />
                    </div>
                    {registerErrors.password && <p className="text-red-500 text-xs">{registerErrors.password}</p>}
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="register-confirm-password" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="register-confirm-password"
                        name="confirmPassword"
                        type="password"
                        placeholder="••••••••"
                        className={`pl-10 ${registerErrors.confirmPassword ? "border-red-500" : ""}`}
                        value={registerData.confirmPassword}
                        onChange={handleRegisterChange}
                      />
                    </div>
                    {registerErrors.confirmPassword && (
                      <p className="text-red-500 text-xs">{registerErrors.confirmPassword}</p>
                    )}
                  </div>
                  
                  <Button type="submit" className="w-full">Create Account</Button>
                </form>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default LoginPage;
