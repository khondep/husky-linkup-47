
import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Button } from '@/components/ui/button';
import { X, ChevronLeft, ChevronRight, Info } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { useTutorial } from '@/contexts/TutorialContext';

const TutorialStep: React.FC = () => {
  const { isActive, currentStep, steps, nextStep, prevStep, skipTutorial } = useTutorial();
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [arrowPosition, setArrowPosition] = useState({ top: 0, left: 0 });
  const [arrowClass, setArrowClass] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!isActive) return;

    const positionTooltip = () => {
      const currentStepData = steps[currentStep];
      const targetElement = document.getElementById(currentStepData.targetId);

      if (!targetElement) {
        console.warn(`Target element #${currentStepData.targetId} not found for tutorial step`);
        return;
      }

      const targetRect = targetElement.getBoundingClientRect();
      const tooltipWidth = 300;
      const tooltipHeight = 180;
      const spacing = 20;  // Space between tooltip and target
      
      let newPosition = { top: 0, left: 0 };
      let newArrowPosition = { top: 0, left: 0 };
      let newArrowClass = '';

      // Calculate position based on specified direction
      switch (currentStepData.position) {
        case 'top':
          newPosition = {
            top: targetRect.top - tooltipHeight - spacing,
            left: targetRect.left + (targetRect.width / 2) - (tooltipWidth / 2)
          };
          newArrowClass = 'after:border-t-foreground after:bottom-[-8px]';
          break;
        case 'right':
          newPosition = {
            top: targetRect.top + (targetRect.height / 2) - (tooltipHeight / 2),
            left: targetRect.right + spacing
          };
          newArrowClass = 'after:border-r-foreground after:left-[-8px]';
          break;
        case 'bottom':
          newPosition = {
            top: targetRect.bottom + spacing,
            left: targetRect.left + (targetRect.width / 2) - (tooltipWidth / 2)
          };
          newArrowClass = 'after:border-b-foreground after:top-[-8px]';
          break;
        case 'left':
          newPosition = {
            top: targetRect.top + (targetRect.height / 2) - (tooltipHeight / 2),
            left: targetRect.left - tooltipWidth - spacing
          };
          newArrowClass = 'after:border-l-foreground after:right-[-8px]';
          break;
      }

      // Adjust if overflows viewport
      if (newPosition.left < 20) newPosition.left = 20;
      if (newPosition.left + tooltipWidth > window.innerWidth - 20) 
        newPosition.left = window.innerWidth - tooltipWidth - 20;
      if (newPosition.top < 20) newPosition.top = 20;
      if (newPosition.top + tooltipHeight > window.innerHeight - 20)
        newPosition.top = window.innerHeight - tooltipHeight - 20;

      setPosition(newPosition);
      setArrowPosition(newArrowPosition);
      setArrowClass(newArrowClass);
      setIsVisible(true);

      // Add highlight effect to target element
      targetElement.classList.add('tutorial-highlight');
      
      return () => {
        targetElement.classList.remove('tutorial-highlight');
      };
    };

    const timer = setTimeout(positionTooltip, 300);
    
    window.addEventListener('resize', positionTooltip);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', positionTooltip);
      
      // Clean up any highlight effects
      const currentStepData = steps[currentStep];
      const targetElement = document.getElementById(currentStepData.targetId);
      if (targetElement) {
        targetElement.classList.remove('tutorial-highlight');
      }
    };
  }, [isActive, currentStep, steps]);

  if (!isActive || !isVisible) return null;

  const currentStepData = steps[currentStep];
  const isLastStep = currentStep === steps.length - 1;
  const isFirstStep = currentStep === 0;

  return createPortal(
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/50 z-50"
        onClick={(e) => e.stopPropagation()}
      />
      
      {/* Tutorial Tooltip */}
      <Card
        className={`fixed z-[9999] w-[300px] p-4 bg-background shadow-xl rounded-lg 
                    ${arrowClass} animate-fade-in`}
        style={{
          top: `${position.top}px`, 
          left: `${position.left}px`
        }}
      >
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-lg flex items-center gap-2">
            <Info className="h-4 w-4 text-primary" />
            {currentStepData.title}
          </h3>
          <Button
            size="sm"
            variant="ghost"
            className="h-6 w-6 p-0"
            onClick={skipTutorial}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Skip tutorial</span>
          </Button>
        </div>
        
        <p className="text-sm mb-6">
          {currentStepData.description}
        </p>
        
        <div className="flex items-center justify-between mt-auto">
          <div className="text-sm text-muted-foreground">
            Step {currentStep + 1} of {steps.length}
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={skipTutorial}
              className="text-xs px-2"
            >
              Skip
            </Button>
            {!isFirstStep && (
              <Button
                variant="outline"
                size="sm"
                onClick={prevStep}
                className="p-0 h-8 w-8"
              >
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Previous</span>
              </Button>
            )}
            <Button
              size="sm"
              onClick={nextStep}
              className="p-0 h-8 w-8"
            >
              {isLastStep ? 
                <X className="h-4 w-4" /> : 
                <ChevronRight className="h-4 w-4" />
              }
              <span className="sr-only">
                {isLastStep ? 'Finish' : 'Next'}
              </span>
            </Button>
          </div>
        </div>
      </Card>
    </>,
    document.body
  );
};

export default TutorialStep;
