
import React, { useState } from 'react';
import ProfileCard from '@/components/ProfileCard';
import SwipeControls from '@/components/SwipeControls';
import NavigationBar from '@/components/NavigationBar';
import { Filter, Search } from 'lucide-react';

// Sample data
const sampleProfiles = [
  {
    id: '1',
    name: 'Alex Rodriguez',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&auto=format&fit=crop&q=60',
    location: 'Boston, MA',
    bio: 'Senior Computer Science student passionate about AI and machine learning. Looking for mentorship in tech industry.',
    education: 'Northeastern University',
    occupation: 'Student',
    interests: ['Artificial Intelligence', 'Software Development', 'Research'],
  },
  {
    id: '2',
    name: 'Samantha Chen',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=60',
    location: 'Boston, MA',
    bio: 'Alumni (2018) working as a Product Manager at Google. Happy to offer career advice and mentorship to current Huskies!',
    education: 'Northeastern University',
    occupation: 'Product Manager',
    interests: ['Product Management', 'UX/UI', 'Tech Industry'],
  },
  {
    id: '3',
    name: 'Michael Jackson',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=60',
    location: 'San Francisco, CA',
    bio: 'MBA graduate working in venture capital. Can help with startup ideas, funding advice, and business strategy.',
    education: 'Northeastern University',
    occupation: 'VC Associate',
    interests: ['Startups', 'Venture Capital', 'Business Strategy'],
  },
];

const Home = () => {
  const [currentProfileIndex, setCurrentProfileIndex] = useState(0);
  const [swipedProfiles, setSwipedProfiles] = useState<string[]>([]);
  const [animate, setAnimate] = useState<'left' | 'right' | null>(null);
  
  const currentProfile = sampleProfiles[currentProfileIndex];
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
      currentIndex < sampleProfiles.length - 1 ? currentIndex + 1 : 0
    );
    
    setAnimate(null);
  };
  
  const handleUndo = () => {
    if (!canUndo) return;
    
    // Get the previous profile
    const prevProfileId = swipedProfiles[swipedProfiles.length - 1];
    const prevProfileIndex = sampleProfiles.findIndex(p => p.id === prevProfileId);
    
    // Update swiped profiles and current index
    setSwipedProfiles(swipedProfiles.slice(0, -1));
    setCurrentProfileIndex(prevProfileIndex);
  };
  
  return (
    <div className="flex flex-col min-h-screen bg-husky-light">
      <header className="sticky top-0 z-10 flex items-center justify-between bg-white/80 backdrop-blur-md px-6 py-4 border-b border-husky-gray-light">
        <h1 className="text-2xl font-semibold text-husky-black">Find Connections</h1>
        
        <div className="flex items-center gap-2">
          <button 
            className="p-2.5 rounded-xl bg-husky-subtle text-husky-black hover:bg-husky-gray-light transition-colors focus-ring"
            aria-label="Search"
          >
            <Search className="h-5 w-5" />
          </button>
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
