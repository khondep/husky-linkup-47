
import React from 'react';
import NavigationBar from '@/components/NavigationBar';
import { Button } from '@/components/ui/button';
import { Edit2, GraduationCap, Briefcase, MapPin, Settings, ArrowRight } from 'lucide-react';

// Sample user data
const userData = {
  name: 'Sarah Johnson',
  avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=800&auto=format&fit=crop&q=60',
  bio: 'Computer Science student at Northeastern University. Passionate about UX design and frontend development. Looking for mentorship in tech.',
  location: 'Boston, MA',
  education: 'M.S. Computer Science',
  graduationYear: '2023',
  occupation: 'UX Design Intern at Adobe',
  interests: ['UX/UI Design', 'Web Development', 'Mobile Apps', 'User Research'],
  skills: ['HTML/CSS', 'JavaScript', 'React', 'Figma', 'User Testing'],
  connections: 12,
  connectionsThisWeek: 3,
};

const SettingItem = ({ 
  icon, 
  label, 
  description, 
  onClick 
}: { 
  icon: React.ReactNode; 
  label: string; 
  description?: string;
  onClick?: () => void; 
}) => (
  <button
    onClick={onClick}
    className="flex items-center justify-between w-full p-4 text-left transition-colors hover:bg-husky-subtle rounded-xl"
  >
    <div className="flex items-center">
      <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-husky-subtle text-husky-blue mr-4">
        {icon}
      </div>
      <div>
        <h3 className="font-medium text-husky-black">{label}</h3>
        {description && <p className="text-sm text-husky-gray-dark">{description}</p>}
      </div>
    </div>
    <ArrowRight className="h-5 w-5 text-husky-gray" />
  </button>
);

const Profile = () => {
  const [showSettings, setShowSettings] = useState(false);
  
  return (
    <div className="flex flex-col min-h-screen bg-husky-light">
      <header className="sticky top-0 z-10 flex items-center justify-between bg-white/80 backdrop-blur-md px-6 py-4 border-b border-husky-gray-light">
        <h1 className="text-2xl font-semibold text-husky-black">{showSettings ? 'Settings' : 'Profile'}</h1>
        <Button 
          variant="ghost" 
          className="text-husky-gray" 
          onClick={() => setShowSettings(!showSettings)}
        >
          {showSettings ? 'Back to Profile' : <Settings className="h-5 w-5" />}
        </Button>
      </header>
      
      <main className="flex-1 pb-24">
        {!showSettings ? (
          <>
            <div className="w-full bg-husky-blue/10 pt-10 pb-6 px-6">
              <div className="relative flex flex-col items-center">
                <div className="relative h-32 w-32 rounded-full overflow-hidden border-4 border-white shadow-subtle mb-4">
                  <img
                    src={userData.avatar}
                    alt={userData.name}
                    className="h-full w-full object-cover"
                  />
                  <button className="absolute bottom-0 right-0 h-8 w-8 bg-husky-blue text-white rounded-full flex items-center justify-center shadow-subtle">
                    <Edit2 className="h-4 w-4" />
                  </button>
                </div>
                
                <h2 className="text-2xl font-bold text-husky-black">{userData.name}</h2>
                
                <div className="flex items-center mt-1 text-sm text-husky-gray-dark">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{userData.location}</span>
                </div>
                
                <div className="flex mt-4 space-x-6 text-center">
                  <div>
                    <div className="text-2xl font-semibold text-husky-blue">{userData.connections}</div>
                    <div className="text-xs text-husky-gray-dark">Connections</div>
                  </div>
                  <div>
                    <div className="text-2xl font-semibold text-husky-blue">+{userData.connectionsThisWeek}</div>
                    <div className="text-xs text-husky-gray-dark">This Week</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="px-6 py-6 space-y-6">
              <div className="bg-white rounded-2xl shadow-subtle p-6">
                <h3 className="text-lg font-semibold text-husky-black mb-3">About Me</h3>
                <p className="text-husky-gray-dark">{userData.bio}</p>
              </div>
              
              <div className="bg-white rounded-2xl shadow-subtle p-6">
                <h3 className="text-lg font-semibold text-husky-black mb-3">Education & Work</h3>
                
                <div className="flex items-start mt-4">
                  <GraduationCap className="h-5 w-5 text-husky-blue mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <div className="font-medium">{userData.education}</div>
                    <div className="text-sm text-husky-gray">Class of {userData.graduationYear}</div>
                  </div>
                </div>
                
                <div className="flex items-start mt-4">
                  <Briefcase className="h-5 w-5 text-husky-blue mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <div className="font-medium">{userData.occupation}</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-2xl shadow-subtle p-6">
                <h3 className="text-lg font-semibold text-husky-black mb-3">Interests</h3>
                <div className="flex flex-wrap gap-2">
                  {userData.interests.map((interest, index) => (
                    <span 
                      key={index} 
                      className="inline-flex items-center rounded-full bg-husky-blue/10 px-3 py-1 text-sm font-medium text-husky-blue"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="bg-white rounded-2xl shadow-subtle p-6">
                <h3 className="text-lg font-semibold text-husky-black mb-3">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {userData.skills.map((skill, index) => (
                    <span 
                      key={index} 
                      className="inline-flex items-center rounded-full bg-husky-subtle px-3 py-1 text-sm font-medium text-husky-gray-dark"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="p-6 pb-24 space-y-6">
            <div className="bg-white rounded-2xl shadow-subtle overflow-hidden">
              <div className="p-4 border-b border-husky-gray-light">
                <h2 className="text-sm font-medium text-husky-gray-dark">Account</h2>
              </div>
              <div className="divide-y divide-husky-gray-light">
                <SettingItem 
                  icon={<Edit2 className="h-5 w-5" />} 
                  label="Edit Profile" 
                  description="Update your public profile information"
                />
              </div>
            </div>
            
            <div className="bg-white rounded-2xl shadow-subtle overflow-hidden">
              <div className="p-4 border-b border-husky-gray-light">
                <h2 className="text-sm font-medium text-husky-gray-dark">Preferences</h2>
              </div>
              <div className="divide-y divide-husky-gray-light">
                <SettingItem 
                  icon={<Users className="h-5 w-5" />} 
                  label="Matching Preferences"
                  description="Adjust who you want to connect with"
                />
                <SettingItem 
                  icon={<MessageSquare className="h-5 w-5" />} 
                  label="Communication" 
                  description="Manage messaging and email settings"
                />
              </div>
            </div>
            
            <Button
              variant="outline"
              className="w-full mt-8 border-rose-300 text-rose-500 hover:bg-rose-50"
              onClick={() => {/* Logout logic */}}
            >
              Log Out
            </Button>
            
            <div className="text-center mt-8 text-xs text-husky-gray">
              <p>Husky Match v1.0.0</p>
              <p className="mt-1">© 2023 Northeastern University</p>
            </div>
          </div>
        )}
      </main>
      
      <NavigationBar />
    </div>
  );
};

export default Profile;
