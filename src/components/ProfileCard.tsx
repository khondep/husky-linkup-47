
import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { GraduationCap, MapPin, Briefcase, ThumbsUp, ThumbsDown, ChevronUp } from 'lucide-react';
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer";

interface ProfileCardProps {
  profile: {
    id: string;
    name: string;
    image: string;
    age?: number;
    location?: string;
    bio: string;
    education?: string;
    occupation?: string;
    interests?: string[];
    matchPercentage?: number;
    skills?: string[];
  };
  className?: string;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ 
  profile, 
  className,
  onSwipeLeft,
  onSwipeRight 
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [offsetX, setOffsetX] = useState(0);
  const [direction, setDirection] = useState<'left' | 'right' | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleTouchStart = (e: React.TouchEvent | React.MouseEvent) => {
    if (isDrawerOpen) return;
    
    setIsDragging(true);
    if ('touches' in e) {
      setStartX(e.touches[0].clientX);
    } else {
      setStartX(e.clientX);
    }
  };

  const handleTouchMove = (e: React.TouchEvent | React.MouseEvent) => {
    if (!isDragging || isDrawerOpen) return;
    
    let currentX: number;
    if ('touches' in e) {
      currentX = e.touches[0].clientX;
    } else {
      currentX = e.clientX;
    }
    
    const diff = currentX - startX;
    setOffsetX(diff);
    
    // Determine direction for visual indicator
    if (diff > 40) {
      setDirection('right');
    } else if (diff < -40) {
      setDirection('left');
    } else {
      setDirection(null);
    }
  };

  const handleTouchEnd = () => {
    if (!isDragging || isDrawerOpen) return;
    
    const SWIPE_THRESHOLD = 100;
    
    if (offsetX > SWIPE_THRESHOLD && onSwipeRight) {
      onSwipeRight();
    } else if (offsetX < -SWIPE_THRESHOLD && onSwipeLeft) {
      onSwipeLeft();
    } else {
      // Reset position with animation
      setOffsetX(0);
    }
    
    setIsDragging(false);
    setDirection(null);
  };

  // Clean up any animations or offsets when component unmounts
  useEffect(() => {
    return () => {
      setOffsetX(0);
      setIsDragging(false);
    };
  }, []);

  // Reset offset when profile changes
  useEffect(() => {
    setOffsetX(0);
    setDirection(null);
  }, [profile.id]);

  const getCardStyle = () => {
    if (!isDragging) {
      return {
        transform: offsetX !== 0 ? `translateX(0)` : 'none',
        transition: 'transform 0.3s ease'
      };
    }
    
    let rotate = offsetX * 0.1; // Add some rotation based on drag distance
    if (rotate > 45) rotate = 45;
    if (rotate < -45) rotate = -45;
    
    return {
      transform: `translateX(${offsetX}px) rotate(${rotate}deg)`,
      transition: 'none'
    };
  };

  return (
    <div 
      className={cn(
        'relative flex flex-col overflow-hidden rounded-3xl bg-white shadow-medium transition-all duration-300 h-[70vh] max-h-[600px]',
        className
      )}
      ref={cardRef}
      style={getCardStyle()}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleTouchStart}
      onMouseMove={handleTouchMove}
      onMouseUp={handleTouchEnd}
      onMouseLeave={handleTouchEnd}
    >
      {/* Like/Dislike indicators */}
      {direction === 'right' && (
        <div className="absolute top-8 right-8 z-20 transform rotate-12 bg-husky-red/90 text-white px-4 py-2 rounded-lg border-2 border-white">
          <ThumbsUp className="h-8 w-8 mx-auto" />
          <p className="font-bold text-lg mt-1">LIKE</p>
        </div>
      )}
      
      {direction === 'left' && (
        <div className="absolute top-8 left-8 z-20 transform -rotate-12 bg-black/80 text-white px-4 py-2 rounded-lg border-2 border-white">
          <ThumbsDown className="h-8 w-8 mx-auto" />
          <p className="font-bold text-lg mt-1">NOPE</p>
        </div>
      )}
      
      <Drawer onOpenChange={setIsDrawerOpen}>
        <DrawerTrigger className="w-full h-full">
          <div className="relative h-full w-full overflow-hidden" onClick={(e) => isDragging && e.preventDefault()}>
            {!imageLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-husky-subtle animate-pulse">
                <span className="sr-only">Loading</span>
              </div>
            )}
            <img
              src={profile.image}
              alt={profile.name}
              className={cn(
                'h-full w-full object-cover transition-opacity duration-500',
                imageLoaded ? 'opacity-100' : 'opacity-0'
              )}
              onLoad={() => setImageLoaded(true)}
            />
            
            {/* Match percentage at the top */}
            {profile.matchPercentage && (
              <div className="absolute top-4 left-4 bg-white/80 backdrop-blur-sm text-husky-red font-bold rounded-full px-3 py-1 text-sm">
                {profile.matchPercentage}% Match
              </div>
            )}
            
            {/* Name and location overlay at the bottom */}
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white bg-gradient-to-t from-black/80 to-transparent">
              <div>
                <h2 className="text-3xl font-bold text-left">{profile.name}</h2>
                <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1">
                  {profile.location && (
                    <div className="flex items-center">
                      <MapPin className="mr-1 h-4 w-4" />
                      <span className="text-sm">{profile.location}</span>
                    </div>
                  )}
                  {profile.education && (
                    <div className="flex items-center">
                      <GraduationCap className="mr-1 h-4 w-4" />
                      <span className="text-sm">{profile.education}</span>
                    </div>
                  )}
                  {profile.occupation && (
                    <div className="flex items-center">
                      <Briefcase className="mr-1 h-4 w-4" />
                      <span className="text-sm">{profile.occupation}</span>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex justify-center mt-2">
                <ChevronUp className="h-6 w-6 text-white animate-bounce" />
              </div>
            </div>
          </div>
        </DrawerTrigger>
        
        <DrawerContent className="bg-white p-6 rounded-t-3xl">
          <div className="space-y-6 max-w-md mx-auto">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-husky-black">{profile.name}</h2>
                {profile.age && <span className="text-lg text-husky-gray-dark ml-2">{profile.age}</span>}
              </div>
              {profile.location && (
                <div className="flex items-center text-husky-gray-dark">
                  <MapPin className="mr-1 h-4 w-4" />
                  <span className="text-sm">{profile.location}</span>
                </div>
              )}
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-husky-black">About</h3>
              <p className="text-husky-black/80">{profile.bio}</p>
              
              {profile.interests && profile.interests.length > 0 && (
                <>
                  <h3 className="text-lg font-medium text-husky-black">Interests</h3>
                  <div className="flex flex-wrap gap-2">
                    {profile.interests.map((interest, index) => (
                      <span 
                        key={index} 
                        className="inline-flex items-center rounded-full bg-husky-subtle px-3 py-1 text-xs font-medium text-husky-black"
                      >
                        {interest}
                      </span>
                    ))}
                  </div>
                </>
              )}
              
              {profile.skills && profile.skills.length > 0 && (
                <>
                  <h3 className="text-lg font-medium text-husky-black">Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {profile.skills.map((skill, index) => (
                      <span 
                        key={index} 
                        className="inline-flex items-center rounded-full bg-husky-subtle px-3 py-1 text-xs font-medium text-husky-black"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </>
              )}
              
              <div className="grid grid-cols-2 gap-4 pt-4">
                {profile.education && (
                  <div className="flex items-center text-sm text-husky-gray-dark">
                    <GraduationCap className="mr-2 h-5 w-5 text-husky-red" />
                    <span>{profile.education}</span>
                  </div>
                )}
                
                {profile.occupation && (
                  <div className="flex items-center text-sm text-husky-gray-dark">
                    <Briefcase className="mr-2 h-5 w-5 text-husky-red" />
                    <span>{profile.occupation}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default ProfileCard;
