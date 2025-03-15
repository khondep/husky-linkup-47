
import React, { useState, useRef } from 'react';
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
  };
  className?: string;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ profile, className }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <div 
      className={cn(
        'relative flex flex-col overflow-hidden rounded-3xl bg-white shadow-medium transition-all duration-300 h-[70vh] max-h-[600px]',
        className
      )}
      ref={cardRef}
    >
      <Drawer>
        <DrawerTrigger className="w-full h-full">
          <div className="relative h-full w-full overflow-hidden">
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
              
              <h3 className="text-lg font-medium text-husky-black">Interests</h3>
              <div className="flex flex-wrap gap-2">
                {profile.interests?.map((interest, index) => (
                  <span 
                    key={index} 
                    className="inline-flex items-center rounded-full bg-husky-subtle px-3 py-1 text-xs font-medium text-husky-black"
                  >
                    {interest}
                  </span>
                ))}
              </div>
              
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
