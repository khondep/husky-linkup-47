
import React from 'react';
import { cn } from '@/lib/utils';
import { GraduationCap, MapPin, Briefcase, Heart } from 'lucide-react';

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
  };
  className?: string;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ profile, className }) => {
  const [imageLoaded, setImageLoaded] = React.useState(false);

  return (
    <div 
      className={cn(
        'relative flex flex-col overflow-hidden rounded-3xl bg-white shadow-medium transition-all duration-300 h-[70vh] max-h-[600px]',
        className
      )}
    >
      <div className="relative h-3/5 w-full overflow-hidden">
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
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50" />
        
        <div className="absolute bottom-0 left-0 p-6 text-white">
          <div className="flex items-end gap-3">
            <h2 className="text-3xl font-bold">{profile.name}</h2>
            {profile.age && (
              <span className="text-xl font-medium">{profile.age}</span>
            )}
          </div>
          
          {profile.location && (
            <div className="mt-1 flex items-center">
              <MapPin className="mr-1 h-4 w-4" />
              <span className="text-sm">{profile.location}</span>
            </div>
          )}
        </div>
      </div>
      
      <div className="flex flex-col justify-between p-6 h-2/5">
        <div className="space-y-4">
          <p className="text-husky-black/80 line-clamp-3">{profile.bio}</p>
          
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
        </div>
        
        <div className="mt-4 grid grid-cols-2 gap-3">
          {profile.education && (
            <div className="flex items-center text-sm text-husky-gray-dark">
              <GraduationCap className="mr-2 h-4 w-4 text-husky-blue" />
              <span className="truncate">{profile.education}</span>
            </div>
          )}
          
          {profile.occupation && (
            <div className="flex items-center text-sm text-husky-gray-dark">
              <Briefcase className="mr-2 h-4 w-4 text-husky-blue" />
              <span className="truncate">{profile.occupation}</span>
            </div>
          )}
        </div>
      </div>
      
      <button 
        className="absolute right-4 top-4 rounded-full bg-white/20 backdrop-blur-sm p-2 transition-transform hover:scale-110 active:scale-95"
        aria-label="Like profile"
      >
        <Heart className="h-6 w-6 text-white" />
      </button>
    </div>
  );
};

export default ProfileCard;
