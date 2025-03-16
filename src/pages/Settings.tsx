
import React from 'react';
import NavigationBar from '@/components/NavigationBar';
import Button from '@/components/Button';
import { useNavigate } from 'react-router-dom';
import { 
  Bell, 
  Lock, 
  HelpCircle, 
  LogOut, 
  ChevronRight, 
  Moon, 
  Users, 
  MessageSquare,
  Eye,
  Settings as SettingsIcon
} from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const SettingItem = ({ 
  icon, 
  label, 
  description, 
  onClick,
  active
}: { 
  icon: React.ReactNode; 
  label: string; 
  description?: string;
  onClick?: () => void;
  active?: boolean;
}) => (
  <button
    onClick={onClick}
    className={`flex items-center justify-between w-full p-4 text-left transition-colors hover:bg-husky-subtle rounded-xl ${active ? 'bg-husky-subtle' : ''}`}
  >
    <div className="flex items-center">
      <div className={`flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full ${active ? 'bg-husky-red/10 text-husky-red' : 'bg-husky-subtle text-husky-blue'} mr-4`}>
        {icon}
      </div>
      <div>
        <h3 className="font-medium text-husky-black">{label}</h3>
        {description && <p className="text-sm text-husky-gray-dark">{description}</p>}
      </div>
    </div>
    <ChevronRight className="h-5 w-5 text-husky-gray" />
  </button>
);

const Settings = () => {
  const navigate = useNavigate();
  
  const handleMatchingPreferences = () => {
    // This would navigate to the matching preferences page in a real app
    toast({
      title: "Matching Preferences",
      description: "Matching preferences updated successfully!",
    });
  };
  
  return (
    <div className="flex flex-col min-h-screen bg-husky-light">
      <header className="sticky top-0 z-10 flex items-center justify-between bg-white/80 backdrop-blur-md px-6 py-4 border-b border-husky-gray-light">
        <h1 className="text-2xl font-semibold text-husky-black">Settings</h1>
        <SettingsIcon className="h-7 w-7 text-husky-gray-dark" />
      </header>
      
      <main className="flex-1 p-6 pb-24">
        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-subtle overflow-hidden">
            <div className="p-4 border-b border-husky-gray-light">
              <h2 className="text-sm font-medium text-husky-gray-dark">Account</h2>
            </div>
            <div className="divide-y divide-husky-gray-light">
              <SettingItem 
                icon={<Users className="h-5 w-5" />} 
                label="Profile" 
                description="Edit your public profile"
                onClick={() => navigate('/profile')}
              />
              <SettingItem 
                icon={<Bell className="h-5 w-5" />} 
                label="Notifications" 
                description="Configure notification preferences"
              />
              <SettingItem 
                icon={<Lock className="h-5 w-5" />} 
                label="Privacy & Security" 
                description="Control your data and account access"
              />
            </div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-subtle overflow-hidden">
            <div className="p-4 border-b border-husky-gray-light">
              <h2 className="text-sm font-medium text-husky-gray-dark">Preferences</h2>
            </div>
            <div className="divide-y divide-husky-gray-light">
              <SettingItem 
                icon={<Eye className="h-5 w-5" />} 
                label="Matching Preferences"
                description="Adjust who you want to connect with"
                onClick={handleMatchingPreferences}
                active={true}
              />
              <SettingItem 
                icon={<Moon className="h-5 w-5" />} 
                label="Appearance" 
                description="Change theme and display settings"
              />
              <SettingItem 
                icon={<MessageSquare className="h-5 w-5" />} 
                label="Communication" 
                description="Manage messaging and email settings"
              />
            </div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-subtle overflow-hidden">
            <div className="p-4 border-b border-husky-gray-light">
              <h2 className="text-sm font-medium text-husky-gray-dark">Support</h2>
            </div>
            <div className="divide-y divide-husky-gray-light">
              <SettingItem 
                icon={<HelpCircle className="h-5 w-5" />} 
                label="Help & Support" 
                description="FAQs and contact information"
              />
            </div>
          </div>
          
          <Button
            variant="outline"
            className="w-full mt-8 border-rose-300 text-rose-500 hover:bg-rose-50"
            leftIcon={<LogOut className="h-5 w-5" />}
            onClick={() => {/* Logout logic */}}
          >
            Log Out
          </Button>
          
          <div className="text-center mt-8 text-xs text-husky-gray">
            <p>Husky Match v1.0.0</p>
            <p className="mt-1">© 2023 Northeastern University</p>
          </div>
        </div>
      </main>
      
      <NavigationBar />
    </div>
  );
};

export default Settings;
