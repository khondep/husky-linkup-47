
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '@/components/Logo';
import Button from '@/components/Button';
import { ArrowRight } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();
  const [animate, setAnimate] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimate(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center p-6 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-husky-light to-husky-blue/10 -z-10" />
      
      {/* Animated circles */}
      <div className={`absolute top-1/4 -left-32 h-64 w-64 rounded-full bg-husky-blue/5 transition-all duration-1000 ease-out ${animate ? 'translate-x-20 opacity-100' : 'opacity-0'}`} />
      <div className={`absolute bottom-1/4 -right-32 h-80 w-80 rounded-full bg-husky-red/5 transition-all duration-1000 delay-300 ease-out ${animate ? 'translate-x-[-5rem] opacity-100' : 'opacity-0'}`} />
      
      <div className="relative w-full max-w-lg mx-auto flex flex-col items-center text-center z-0">
        <div className={`transition-all duration-700 ease-out ${animate ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <Logo size="lg" animate />
        </div>
        
        <h1 className={`mt-8 text-4xl font-bold text-husky-black transition-all duration-700 delay-100 ease-out ${animate ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          Connect with the <span className="text-husky-blue">Northeastern</span> community
        </h1>
        
        <p className={`mt-4 text-lg text-husky-gray-dark transition-all duration-700 delay-200 ease-out ${animate ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          Find mentors, network with alumni, and build meaningful professional relationships
        </p>
        
        <div className={`mt-12 w-full space-y-4 transition-all duration-700 delay-300 ease-out ${animate ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <Button 
            fullWidth 
            size="lg" 
            onClick={() => navigate('/login')}
            rightIcon={<ArrowRight className="h-5 w-5" />}
          >
            Get Started
          </Button>
          
          <div className="flex space-x-4">
            <Button 
              variant="secondary" 
              fullWidth 
              onClick={() => navigate('/login')}
            >
              Log In
            </Button>
            <Button 
              variant="outline" 
              fullWidth 
              onClick={() => navigate('/signup')}
            >
              Sign Up
            </Button>
          </div>
        </div>
        
        <div className={`mt-8 text-sm text-husky-gray transition-all duration-700 delay-400 ease-out ${animate ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          By continuing, you agree to our <a href="#" className="text-husky-blue hover:underline">Terms of Service</a> and <a href="#" className="text-husky-blue hover:underline">Privacy Policy</a>
        </div>
      </div>
    </div>
  );
};

export default Index;
