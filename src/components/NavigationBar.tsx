
import React from 'react';
import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Home, MessageSquare, User, Settings } from 'lucide-react';

const NavigationBar: React.FC = () => {
  const navItems = [
    { to: '/home', icon: Home, label: 'Match' },
    { to: '/messages', icon: MessageSquare, label: 'Messages' },
    { to: '/profile', icon: User, label: 'Profile' },
    { to: '/settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-10 mx-auto flex max-w-md items-center justify-around border-t border-husky-gray-light bg-white/80 px-6 pb-6 pt-3 backdrop-blur-md">
      {navItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) => cn(
            'flex flex-col items-center rounded-xl px-4 py-1.5 transition-all duration-200',
            isActive
              ? 'text-husky-blue'
              : 'text-husky-gray hover:text-husky-gray-dark'
          )}
        >
          {({ isActive }) => (
            <>
              <item.icon
                className={cn(
                  'mb-1 h-6 w-6',
                  isActive && 'animate-scale-in'
                )}
              />
              <span className="text-xs font-medium">{item.label}</span>
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );
};

export default NavigationBar;
