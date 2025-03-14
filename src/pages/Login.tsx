
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Logo from '@/components/Logo';
import Button from '@/components/Button';
import { ArrowLeft, LogIn, Mail } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      navigate('/home');
    }, 1000);
  };
  
  return (
    <div className="min-h-screen flex flex-col p-6">
      <button
        onClick={() => navigate(-1)}
        className="self-start -ml-2 p-2 rounded-full text-husky-gray hover:text-husky-black hover:bg-husky-subtle transition-colors focus-ring"
        aria-label="Go back"
      >
        <ArrowLeft className="h-6 w-6" />
      </button>
      
      <div className="flex-1 flex flex-col items-center justify-center max-w-md mx-auto w-full mt-8">
        <Logo className="mb-8" animate />
        
        <div className="w-full bg-white rounded-2xl shadow-subtle p-8 animate-scale-in">
          <h1 className="text-2xl font-semibold text-husky-black mb-6">
            Welcome Back
          </h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-husky-gray-dark mb-1">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-husky-gray-light focus:border-husky-blue focus:ring-1 focus:ring-husky-blue outline-none transition-all"
                placeholder="you@northeastern.edu"
                required
              />
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-1">
                <label htmlFor="password" className="block text-sm font-medium text-husky-gray-dark">
                  Password
                </label>
                <a href="#" className="text-sm text-husky-blue hover:underline">
                  Forgot password?
                </a>
              </div>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-husky-gray-light focus:border-husky-blue focus:ring-1 focus:ring-husky-blue outline-none transition-all"
                placeholder="••••••••"
                required
              />
            </div>
            
            <Button
              type="submit"
              fullWidth
              size="lg"
              isLoading={isLoading}
              leftIcon={<LogIn className="h-5 w-5" />}
            >
              Log In
            </Button>
          </form>
          
          <div className="relative flex items-center mt-8">
            <div className="flex-grow border-t border-husky-gray-light"></div>
            <span className="mx-4 text-sm text-husky-gray">OR</span>
            <div className="flex-grow border-t border-husky-gray-light"></div>
          </div>
          
          <Button
            variant="secondary"
            fullWidth
            className="mt-6"
            leftIcon={<Mail className="h-5 w-5" />}
            onClick={() => {/* SSO Implementation */}}
          >
            Continue with Northeastern SSO
          </Button>
          
          <p className="mt-6 text-center text-sm text-husky-gray-dark">
            Don't have an account?{' '}
            <Link to="/signup" className="text-husky-blue hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
