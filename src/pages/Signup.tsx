
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Logo from '@/components/Logo';
import { ArrowLeft, Mail, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from '@/hooks/use-toast';

const signupSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid Northeastern email')
    .refine(email => email.endsWith('@northeastern.edu'), {
      message: 'Must be a Northeastern email address',
    }),
  password: z.string().min(8, 'Password must be at least 8 characters')
    .refine(pass => /[0-9]/.test(pass), {
      message: 'Password must include at least one number',
    }),
});

type SignupFormValues = z.infer<typeof signupSchema>;

const Signup = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  
  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });
  
  const onSubmit = async (data: SignupFormValues) => {
    setIsLoading(true);
    
    // Simulate API call
    try {
      setTimeout(() => {
        setIsLoading(false);
        toast({
          title: "Account created successfully",
          description: "Welcome to Husky Match!",
        });
        navigate('/home');
      }, 1000);
    } catch (error) {
      setIsLoading(false);
      toast({
        title: "Signup failed",
        description: "Please check your information and try again",
        variant: "destructive",
      });
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col p-6 bg-gray-50">
      <button
        onClick={() => navigate('/')}
        className="self-start -ml-2 p-2 rounded-full text-gray-500 hover:text-gray-800 hover:bg-gray-100 transition-colors"
        aria-label="Go back"
      >
        <ArrowLeft className="h-6 w-6" />
      </button>
      
      <div className="flex-1 flex flex-col items-center justify-center max-w-md mx-auto w-full mt-8">
        <Logo className="mb-8" animate />
        
        <div className="w-full bg-white rounded-2xl shadow-md p-8 animate-scale-in">
          <h1 className="text-2xl font-semibold text-gray-900 mb-6">
            Create an Account
          </h1>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Your name" 
                        {...field}
                        className="w-full px-4 py-3 rounded-xl" 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Northeastern Email</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="you@northeastern.edu" 
                        {...field} 
                        type="email"
                        className="w-full px-4 py-3 rounded-xl"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Create a password" 
                        {...field} 
                        type="password"
                        className="w-full px-4 py-3 rounded-xl"
                      />
                    </FormControl>
                    <p className="text-xs text-gray-500 mt-1">
                      Must be at least 8 characters and include a number
                    </p>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button
                type="submit"
                className="w-full"
                size="lg"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Creating account...</span>
                  </div>
                ) : (
                  <div className="flex items-center">
                    <UserPlus className="mr-2 h-5 w-5" />
                    <span>Sign Up</span>
                  </div>
                )}
              </Button>
            </form>
          </Form>
          
          <div className="relative flex items-center mt-8">
            <div className="flex-grow border-t border-gray-200"></div>
            <span className="mx-4 text-sm text-gray-500">OR</span>
            <div className="flex-grow border-t border-gray-200"></div>
          </div>
          
          <Button
            variant="outline"
            className="w-full mt-6"
            onClick={() => {/* SSO Implementation */}}
          >
            <Mail className="mr-2 h-5 w-5" />
            <span>Continue with Northeastern SSO</span>
          </Button>
          
          <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-600 hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
