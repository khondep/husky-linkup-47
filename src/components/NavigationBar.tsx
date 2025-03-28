
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Home, MessageSquare, BarChart, Compass, User } from 'lucide-react';
import TutorialHighlight from './Tutorial/TutorialHighlight';

// Sample notification data
const initialNotifications = {
  messages: 2,
  analytics: 1,
  explore: 3,
  profile: 0,
  home: 0
};

const NavigationBar: React.FC = () => {
  const [notifications, setNotifications] = useState(initialNotifications);

  const navItems = [
    { to: '/home', icon: Home, label: 'Match', key: 'home', tutorialId: 'tutorial-nav-home' },
    { to: '/explore', icon: Compass, label: 'Explore', key: 'explore', tutorialId: 'tutorial-nav-explore' },
    { to: '/analytics', icon: BarChart, label: 'Analytics', key: 'analytics', tutorialId: 'tutorial-nav-analytics' },
    { to: '/messages', icon: MessageSquare, label: 'Messages', key: 'messages', tutorialId: 'tutorial-nav-messages' },
    { to: '/profile', icon: User, label: 'Profile', key: 'profile', tutorialId: 'tutorial-nav-profile' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-10 mx-auto flex max-w-md items-center justify-around border-t border-husky-gray-light bg-husky-white/80 px-6 pb-5 pt-3 backdrop-blur-md">
      {navItems.map((item) => (
        <TutorialHighlight
          key={item.to}
          id={item.tutorialId}
          className="flex-1 flex justify-center"
        >
          <NavLink
            to={item.to}
            className={({ isActive }) => cn(
              'relative flex flex-col items-center rounded-xl px-3 py-1.5 transition-all duration-200',
              isActive
                ? 'text-husky-red'
                : 'text-husky-gray hover:text-husky-gray-dark'
            )}
            onClick={() => {
              // Clear notification when clicking on the item
              if (notifications[item.key as keyof typeof notifications] > 0) {
                setNotifications(prev => ({
                  ...prev,
                  [item.key]: 0
                }));
              }
            }}
          >
            {({ isActive }) => (
              <>
                <div className="relative">
                  <item.icon
                    className={cn(
                      'mb-1 h-5 w-5',
                      isActive && 'animate-scale-in'
                    )}
                  />
                  {notifications[item.key as keyof typeof notifications] > 0 && (
                    <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-husky-red text-[10px] font-medium text-white">
                      {notifications[item.key as keyof typeof notifications]}
                    </span>
                  )}
                </div>
                <span className="text-xs font-medium">{item.label}</span>
              </>
            )}
          </NavLink>
        </TutorialHighlight>
      ))}
    </nav>
  );
};

export default NavigationBar;
