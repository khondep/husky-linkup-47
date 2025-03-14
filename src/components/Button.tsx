
import React from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'link';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    children, 
    className, 
    variant = 'primary', 
    size = 'md', 
    isLoading = false, 
    leftIcon, 
    rightIcon, 
    fullWidth = false, 
    disabled, 
    type = 'button', 
    ...props 
  }, ref) => {
    const variants = {
      primary: 'bg-husky-red text-husky-white hover:bg-husky-red/90 active:bg-husky-red/90',
      secondary: 'bg-husky-subtle text-husky-black hover:bg-husky-gray-light active:bg-husky-gray-light/90',
      outline: 'border border-husky-gray-light bg-transparent text-husky-black hover:bg-husky-subtle active:bg-husky-subtle/90',
      ghost: 'bg-transparent text-husky-black hover:bg-husky-subtle active:bg-husky-subtle/90',
      link: 'bg-transparent text-husky-red hover:underline active:text-husky-red p-0 h-auto'
    };

    const sizes = {
      sm: 'px-3 py-1.5 text-sm h-8',
      md: 'px-4 py-2 text-base h-10',
      lg: 'px-6 py-3 text-lg h-12'
    };

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || isLoading}
        className={cn(
          'relative inline-flex items-center justify-center rounded-xl font-medium transition-all duration-200 focus-ring',
          variants[variant],
          sizes[size],
          fullWidth ? 'w-full' : '',
          disabled || isLoading ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer',
          className
        )}
        {...props}
      >
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-husky-red border-t-transparent" />
          </div>
        )}
        <div className={cn('flex items-center gap-2', isLoading ? 'opacity-0' : '')}>
          {leftIcon && <span>{leftIcon}</span>}
          {children}
          {rightIcon && <span>{rightIcon}</span>}
        </div>
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
