
import React, { useState } from 'react';
import ProfileCard from '@/components/ProfileCard';
import SwipeControls from '@/components/SwipeControls';
import NavigationBar from '@/components/NavigationBar';
import { Filter } from 'lucide-react';
import { Switch } from "@/components/ui/switch";

// Sample alumni data
const sampleAlumni = [
  {
    id: '1',
    name: 'Alex Rodriguez',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&auto=format&fit=crop&q=60',
    location: 'Boston, MA',
    bio: 'Senior Computer Science student passionate about AI and machine learning. Looking for mentorship in tech industry.',
    education: 'M.S. Software Engineering Systems',
    occupation: 'SDE at Google',
    interests: ['Artificial Intelligence', 'Software Development', 'Research'],
    matchPercentage: 92,
  },
  {
    id: '2',
    name: 'Samantha Chen',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=60',
    location: 'Boston, MA',
    bio: 'Alumni (2018) working as a Product Manager at Google. Happy to offer career advice and mentorship to current Huskies!',
    education: 'M.S. Information Systems',
    occupation: 'Product Manager at Google',
    interests: ['Product Management', 'UX/UI', 'Tech Industry'],
    matchPercentage: 87,
  },
  {
    id: '3',
    name: 'Michael Jackson',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=60',
    location: 'San Francisco, CA',
    bio: 'MBA graduate working in venture capital. Can help with startup ideas, funding advice, and business strategy.',
    education: 'M.S. Engineering Management',
    occupation: 'VC Associate at Sequoia',
    interests: ['Startups', 'Venture Capital', 'Business Strategy'],
    matchPercentage: 75,
  },
];

// Sample peers data
const samplePeers = [
  {
    id: '4',
    name: 'Emma Wilson',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&auto=format&fit=crop&q=60',
    location: 'Boston, MA',
    bio: 'Currently studying Information Systems. Interested in data analytics and product management.',
    education: 'Information Systems (Current)',
    occupation: 'Graduate Student',
    interests: ['Data Analytics', 'Product Management', 'UX Research'],
    matchPercentage: 95,
  },
  {
    id: '5',
    name: 'James Roberts',
    image: 'https://images.unsplash.com/photo-1504257432389-52343af06ae3?w=800&auto=format&fit=crop&q=60',
    location: 'Boston, MA',
    bio: 'Second year Computer Science student. Looking for study partners and project collaborators.',
    education: 'Computer Science (Current)',
    occupation: 'Graduate Student',
    interests: ['Machine Learning', 'Web Development', 'Algorithms'],
    matchPercentage: 88,
  },
  {
    id: '6',
    name: 'Olivia Martin',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=800&auto=format&fit=crop&q=60',
    location: 'Boston, MA',
    bio: 'Studying Industrial Engineering with a focus on optimization. Looking for peers interested in operations research.',
    education: 'Industrial Engineering (Current)',
    occupation: 'Graduate Student',
    interests: ['Optimization', 'Operations Research', 'Supply Chain'],
    matchPercentage: 82,
  },
];

const Home = () => {
  const [isAlumniMode, setIsAlumniMode] = useState(true);
  const [currentProfileIndex, setCurrentProfileIndex] = useState(0);
  const [swipedProfiles, setSwipedProfiles] = useState<string[]>([]);
  const [animate, setAnimate] = useState<'left' | 'right' | null>(null);
  
  const profiles = isAlumniMode ? sampleAlumni : samplePeers;
  const currentProfile = profiles[currentProfileIndex];
  const canUndo = swipedProfiles.length > 0;
  
  const handleLike = () => {
    setAnimate('right');
    setTimeout(() => {
      handleNextProfile('right');
    }, 300);
  };
  
  const handleDislike = () => {
    setAnimate('left');
    setTimeout(() => {
      handleNextProfile('left');
    }, 300);
  };
  
  const handleNextProfile = (direction: 'left' | 'right') => {
    // Add current profile to swiped profiles
    setSwipedProfiles([...swipedProfiles, currentProfile.id]);
    
    // Move to next profile
    setCurrentProfileIndex((currentIndex) => 
      currentIndex < profiles.length - 1 ? currentIndex + 1 : 0
    );
    
    setAnimate(null);
  };
  
  const handleUndo = () => {
    if (!canUndo) return;
    
    // Get the previous profile
    const prevProfileId = swipedProfiles[swipedProfiles.length - 1];
    const prevProfileIndex = profiles.findIndex(p => p.id === prevProfileId);
    
    // Update swiped profiles and current index
    setSwipedProfiles(swipedProfiles.slice(0, -1));
    setCurrentProfileIndex(prevProfileIndex);
  };
  
  return (
    <div className="flex flex-col min-h-screen bg-husky-light">
      <header className="sticky top-0 z-10 flex items-center justify-between bg-white/80 backdrop-blur-md px-6 py-4 border-b border-husky-gray-light">
        <div className="flex items-center">
          <img 
            src="/husky-icon.png" 
            alt="Husky Match" 
            className="h-8 w-8 mr-2"
          />
        </div>
        
        <div className="flex items-center gap-2">
          <div className="flex items-center space-x-2">
            <span className={`text-sm ${!isAlumniMode ? 'font-medium text-husky-black' : 'text-husky-gray'}`}>Peers</span>
            <Switch 
              checked={isAlumniMode} 
              onCheckedChange={setIsAlumniMode}
            />
            <span className={`text-sm ${isAlumniMode ? 'font-medium text-husky-black' : 'text-husky-gray'}`}>Alumni</span>
          </div>
          <button 
            className="p-2.5 rounded-xl bg-husky-subtle text-husky-black hover:bg-husky-gray-light transition-colors focus-ring"
            aria-label="Filter"
          >
            <Filter className="h-5 w-5" />
          </button>
        </div>
      </header>
      
      <main className="flex-1 flex flex-col items-center justify-between p-6 pb-24">
        <div className="w-full max-w-lg mx-auto">
          <div className="relative w-full">
            <div 
              className={`relative transition-all duration-300 ${
                animate === 'left' 
                  ? 'translate-x-[-100px] opacity-0 rotate-[-8deg]' 
                  : animate === 'right' 
                    ? 'translate-x-[100px] opacity-0 rotate-[8deg]' 
                    : ''
              }`}
            >
              <ProfileCard profile={currentProfile} />
            </div>
          </div>
          
          <div className="mt-8">
            <SwipeControls
              onLike={handleLike}
              onDislike={handleDislike}
              onUndo={handleUndo}
              canUndo={canUndo}
            />
          </div>
        </div>
      </main>
      
      <NavigationBar />
    </div>
  );
};

export default Home;
