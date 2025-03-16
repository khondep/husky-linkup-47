
import React from 'react';
import { useTutorial } from '@/contexts/TutorialContext';

const TutorialHighlight: React.FC<{
  id: string;
  children: React.ReactNode;
  className?: string;
}> = ({ id, children, className = '' }) => {
  return (
    <div id={id} className={`tutorial-target ${className}`}>
      {children}
    </div>
  );
};

export default TutorialHighlight;
