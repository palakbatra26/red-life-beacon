
import React from 'react';
import { SignIn, SignUp } from '@clerk/clerk-react';
import Layout from '@/components/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LogIn, UserPlus } from 'lucide-react';

const LoginPage = () => {
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
            <TabsContent value="login" className="flex justify-center">
              <SignIn routing="path" path="/login" signUpUrl="/register" />
            </TabsContent>
            
            {/* Register Tab */}
            <TabsContent value="register" className="flex justify-center">
              <SignUp routing="path" path="/register" signInUrl="/login" />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default LoginPage;
