
import React from 'react';
import { cn } from '@/lib/utils';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  animate?: boolean;
}

const Logo: React.FC<LogoProps> = ({ 
  size = 'md', 
  className, 
  animate = false 
}) => {
  const sizeClasses = {
    sm: 'h-8',
    md: 'h-12',
    lg: 'h-16'
  };
  
  return (
    <div className={cn(
      'flex items-center justify-center',
      animate && 'animate-scale-in',
      className
    )}>
      <div className={cn(
        'relative flex items-center',
        sizeClasses[size]
      )}>
        <svg 
          className={cn(
            'text-husky-red',
            sizeClasses[size],
            'aspect-square',
            animate && 'animate-pulse-slow'
          )} 
          viewBox="0 0 100 100" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            fillRule="evenodd" 
            clipRule="evenodd" 
            d="M50 100C77.6142 100 100 77.6142 100 50C100 22.3858 77.6142 0 50 0C22.3858 0 0 22.3858 0 50C0 77.6142 22.3858 100 50 100ZM50 90C72.0914 90 90 72.0914 90 50C90 27.9086 72.0914 10 50 10C27.9086 10 10 27.9086 10 50C10 72.0914 27.9086 90 50 90Z" 
            fill="currentColor" 
          />
          <path 
            d="M35 40C35 36.6863 37.6863 34 41 34C44.3137 34 47 36.6863 47 40C47 43.3137 44.3137 46 41 46C37.6863 46 35 43.3137 35 40Z" 
            fill="currentColor" 
          />
          <path 
            d="M53 40C53 36.6863 55.6863 34 59 34C62.3137 34 65 36.6863 65 40C65 43.3137 62.3137 46 59 46C55.6863 46 53 43.3137 53 40Z" 
            fill="currentColor" 
          />
          <path 
            d="M73.5 55.5C73.5 55.5 68 72 50 72C32 72 26.5 55.5 26.5 55.5" 
            stroke="currentColor" 
            strokeWidth="8" 
            strokeLinecap="round" 
          />
        </svg>
        <div className="ml-2 flex flex-col">
          <span className={cn(
            'font-semibold text-husky-black leading-none',
            size === 'sm' ? 'text-sm' : size === 'md' ? 'text-xl' : 'text-2xl'
          )}>
            Husky
          </span>
          <span className={cn(
            'font-light text-husky-red leading-none',
            size === 'sm' ? 'text-xs' : size === 'md' ? 'text-lg' : 'text-xl'
          )}>
            Match
          </span>
        </div>
      </div>
    </div>
  );
};

export default Logo;
