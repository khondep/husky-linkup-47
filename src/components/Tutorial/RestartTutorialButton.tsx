
import { Button } from '@/components/ui/button';
import { useTutorial } from '@/contexts/TutorialContext';
import { HelpCircle } from 'lucide-react';

const RestartTutorialButton = () => {
  const { startTutorial } = useTutorial();

  const handleRestart = () => {
    localStorage.removeItem('tutorial-completed');
    startTutorial();
  };

  return (
    <Button
      variant="outline"
      onClick={handleRestart}
      className="flex items-center gap-2"
    >
      <HelpCircle className="h-4 w-4" />
      Restart Tutorial
    </Button>
  );
};

export default RestartTutorialButton;
