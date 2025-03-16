import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

type TutorialStep = {
  id: string;
  title: string;
  description: string;
  targetId: string;
  position: 'top' | 'right' | 'bottom' | 'left';
  page: string;
  isPageOverview?: boolean;
};

const tutorialSteps: TutorialStep[] = [
  // Home page steps
  {
    id: 'welcome',
    title: 'Welcome to HuskyConnect!',
    description: 'This tutorial will guide you through the app. Let\'s start with the matching feature.',
    targetId: 'tutorial-home-header',
    position: 'bottom',
    page: '/home'
  },
  {
    id: 'toggle-mode',
    title: 'Alumni or Peers',
    description: 'Toggle between connecting with alumni or fellow students based on your networking goals.',
    targetId: 'tutorial-toggle-mode',
    position: 'bottom',
    page: '/home'
  },
  {
    id: 'swipe-controls',
    title: 'Swipe Controls',
    description: 'Swipe right to connect with someone, or left to skip. You can also use these buttons.',
    targetId: 'tutorial-swipe-controls',
    position: 'top',
    page: '/home'
  },
  {
    id: 'filter-button',
    title: 'Filter Profiles',
    description: 'Filter matches based on skills, location, and more to find the most relevant connections.',
    targetId: 'tutorial-filter-button',
    position: 'left',
    page: '/home'
  },
  // Other pages (brief overviews)
  {
    id: 'explore-page',
    title: 'Explore Page',
    description: 'Discover events, groups, and job opportunities relevant to your interests and skills.',
    targetId: 'tutorial-nav-explore',
    position: 'top',
    page: '/explore',
    isPageOverview: true
  },
  {
    id: 'analytics-page',
    title: 'Analytics Page',
    description: 'Track your networking progress and see insights about your connections and engagement.',
    targetId: 'tutorial-nav-analytics',
    position: 'top',
    page: '/analytics',
    isPageOverview: true
  },
  {
    id: 'messages-page',
    title: 'Messages Page',
    description: 'Chat with your connections to build relationships and explore opportunities.',
    targetId: 'tutorial-nav-messages',
    position: 'top',
    page: '/messages',
    isPageOverview: true
  },
  {
    id: 'profile-page',
    title: 'Profile Page',
    description: 'Manage your profile to highlight your skills, interests, and goals.',
    targetId: 'tutorial-nav-profile',
    position: 'top',
    page: '/profile',
    isPageOverview: true
  },
  {
    id: 'tutorial-complete',
    title: 'You\'re All Set!',
    description: 'You\'ve completed the tutorial. Start connecting with Huskies and build your network!',
    targetId: 'tutorial-home-header',
    position: 'bottom',
    page: '/home'
  }
];

type TutorialContextType = {
  isActive: boolean;
  currentStep: number;
  steps: TutorialStep[];
  startTutorial: () => void;
  nextStep: () => void;
  prevStep: () => void;
  skipTutorial: () => void;
  isTutorialCompleted: boolean;
};

const TutorialContext = createContext<TutorialContextType | undefined>(undefined);

export const useTutorial = () => {
  const context = useContext(TutorialContext);
  if (context === undefined) {
    throw new Error('useTutorial must be used within a TutorialProvider');
  }
  return context;
};

export const TutorialProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isActive, setIsActive] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [isTutorialCompleted, setIsTutorialCompleted] = useState(false);
  const navigate = useNavigate();

  // Check if this is the first visit
  useEffect(() => {
    const hasCompletedTutorial = localStorage.getItem('tutorial-completed');
    setIsTutorialCompleted(hasCompletedTutorial === 'true');
    
    // Auto-start tutorial on first visit if on home page
    if (window.location.pathname.includes('/home') && !hasCompletedTutorial) {
      // Small delay to ensure DOM is ready
      const timer = setTimeout(() => {
        setIsActive(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const startTutorial = () => {
    setCurrentStep(0);
    setIsActive(true);
    navigate('/home');
  };

  const nextStep = () => {
    if (currentStep < tutorialSteps.length - 1) {
      const nextStepData = tutorialSteps[currentStep + 1];
      
      // If next step is on a different page, navigate there first
      if (nextStepData.page !== tutorialSteps[currentStep].page) {
        navigate(nextStepData.page);
      }
      
      setCurrentStep(prev => prev + 1);
    } else {
      // Tutorial complete
      completeTutorial();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      const prevStepData = tutorialSteps[currentStep - 1];
      
      // If previous step is on a different page, navigate there first
      if (prevStepData.page !== tutorialSteps[currentStep].page) {
        navigate(prevStepData.page);
      }
      
      setCurrentStep(prev => prev - 1);
    }
  };

  const skipTutorial = () => {
    completeTutorial();
  };

  const completeTutorial = () => {
    setIsActive(false);
    setIsTutorialCompleted(true);
    localStorage.setItem('tutorial-completed', 'true');
  };

  return (
    <TutorialContext.Provider
      value={{
        isActive,
        currentStep,
        steps: tutorialSteps,
        startTutorial,
        nextStep,
        prevStep,
        skipTutorial,
        isTutorialCompleted
      }}
    >
      {children}
    </TutorialContext.Provider>
  );
};
