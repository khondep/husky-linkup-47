
import React, { useState } from 'react';
import ProfileCard from '@/components/ProfileCard';
import SwipeControls from '@/components/SwipeControls';
import NavigationBar from '@/components/NavigationBar';
import { Filter, Flag } from 'lucide-react';
import { Switch } from "@/components/ui/switch";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { PopoverContent, PopoverTrigger, Popover } from "@/components/ui/popover";
import { toast } from "@/hooks/use-toast";

// Sample alumni data
const sampleAlumni = [{
  id: '1',
  name: 'Alex Rodriguez',
  image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&auto=format&fit=crop&q=60',
  location: 'Boston, MA',
  bio: 'Senior Computer Science student passionate about AI and machine learning. Looking for mentorship in tech industry.',
  education: 'M.S. Software Engineering Systems',
  occupation: 'SDE at Google',
  interests: ['Artificial Intelligence', 'Software Development', 'Research'],
  matchPercentage: 92,
  skills: ['Python', 'Machine Learning', 'React', 'Node.js']
}, {
  id: '2',
  name: 'Samantha Chen',
  image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=60',
  location: 'Boston, MA',
  bio: 'Alumni (2018) working as a Product Manager at Google. Happy to offer career advice and mentorship to current Huskies!',
  education: 'M.S. Information Systems',
  occupation: 'Product Manager at Google',
  interests: ['Product Management', 'UX/UI', 'Tech Industry'],
  matchPercentage: 87,
  skills: ['Product Management', 'UX Research', 'Agile', 'SQL']
}, {
  id: '3',
  name: 'Michael Jackson',
  image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=60',
  location: 'San Francisco, CA',
  bio: 'MBA graduate working in venture capital. Can help with startup ideas, funding advice, and business strategy.',
  education: 'M.S. Engineering Management',
  occupation: 'VC Associate at Sequoia',
  interests: ['Startups', 'Venture Capital', 'Business Strategy'],
  matchPercentage: 75,
  skills: ['Financial Analysis', 'Business Development', 'Pitch Evaluation', 'Market Research']
}];

// Sample peers data
const samplePeers = [{
  id: '4',
  name: 'Emma Wilson',
  image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&auto=format&fit=crop&q=60',
  location: 'Boston, MA',
  bio: 'Currently studying Information Systems. Interested in data analytics and product management.',
  education: 'Information Systems (Current)',
  occupation: 'Graduate Student',
  interests: ['Data Analytics', 'Product Management', 'UX Research'],
  matchPercentage: 95,
  skills: ['SQL', 'Tableau', 'Excel', 'Data Visualization']
}, {
  id: '5',
  name: 'James Roberts',
  image: 'https://images.unsplash.com/photo-1504257432389-52343af06ae3?w=800&auto=format&fit=crop&q=60',
  location: 'Boston, MA',
  bio: 'Second year Computer Science student. Looking for study partners and project collaborators.',
  education: 'Computer Science (Current)',
  occupation: 'Graduate Student',
  interests: ['Machine Learning', 'Web Development', 'Algorithms'],
  matchPercentage: 88,
  skills: ['Java', 'Python', 'Algorithms', 'Data Structures']
}, {
  id: '6',
  name: 'Olivia Martin',
  image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=800&auto=format&fit=crop&q=60',
  location: 'Boston, MA',
  bio: 'Studying Industrial Engineering with a focus on optimization. Looking for peers interested in operations research.',
  education: 'Industrial Engineering (Current)',
  occupation: 'Graduate Student',
  interests: ['Optimization', 'Operations Research', 'Supply Chain'],
  matchPercentage: 82,
  skills: ['MATLAB', 'Operations Research', 'Supply Chain Management', 'Simulation']
}];

// Filter component
const FilterMenu = ({
  isOpen,
  onClose,
  onApplyFilters
}) => {
  const [distance, setDistance] = useState([50]);
  const [minMatchPercentage, setMinMatchPercentage] = useState([70]);
  const [selectedSkills, setSelectedSkills] = useState(['React', 'Python']);
  const [location, setLocation] = useState('Boston, MA');
  const skillOptions = ['React', 'Python', 'Java', 'Machine Learning', 'Data Science', 'Product Management', 'UX/UI', 'Node.js', 'SQL', 'Algorithms'];
  const handleApply = () => {
    onApplyFilters({
      distance: distance[0],
      minMatchPercentage: minMatchPercentage[0],
      selectedSkills,
      location
    });
    onClose();
  };
  return <DrawerContent className="max-h-[80vh] overflow-y-auto">
      <DrawerHeader>
        <DrawerTitle>Filter Profiles</DrawerTitle>
        <DrawerDescription>
          Adjust your preferences to find better matches
        </DrawerDescription>
      </DrawerHeader>
      <div className="px-4 py-2 space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">Location</label>
          <Input placeholder="Enter location" value={location} onChange={e => setLocation(e.target.value)} />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <label className="text-sm font-medium">Distance (miles)</label>
            <span className="text-sm">{distance}mi</span>
          </div>
          <Slider value={distance} onValueChange={setDistance} max={100} step={5} />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <label className="text-sm font-medium">Minimum Match %</label>
            <span className="text-sm">{minMatchPercentage}%</span>
          </div>
          <Slider value={minMatchPercentage} onValueChange={setMinMatchPercentage} max={100} step={5} />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Skills</label>
          <div className="flex flex-wrap gap-2">
            {skillOptions.map(skill => <Button key={skill} variant={selectedSkills.includes(skill) ? "default" : "outline"} size="sm" onClick={() => {
            if (selectedSkills.includes(skill)) {
              setSelectedSkills(selectedSkills.filter(s => s !== skill));
            } else {
              setSelectedSkills([...selectedSkills, skill]);
            }
          }}>
                {skill}
              </Button>)}
          </div>
        </div>
      </div>
      <DrawerFooter>
        <Button onClick={handleApply}>Apply Filters</Button>
        <DrawerClose asChild>
          <Button variant="outline">Cancel</Button>
        </DrawerClose>
      </DrawerFooter>
    </DrawerContent>;
};

const Home = () => {
  const [isAlumniMode, setIsAlumniMode] = useState(true);
  const [currentProfileIndex, setCurrentProfileIndex] = useState(0);
  const [swipedProfiles, setSwipedProfiles] = useState<string[]>([]);
  const [animate, setAnimate] = useState<'left' | 'right' | null>(null);
  const [filterOpen, setFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    distance: 50,
    minMatchPercentage: 70,
    selectedSkills: ['React', 'Python'],
    location: 'Boston, MA'
  });
  const profiles = isAlumniMode ? sampleAlumni : samplePeers;
  const currentProfile = profiles[currentProfileIndex];
  const canUndo = swipedProfiles.length > 0;

  const handleLike = () => {
    setAnimate('right');
    setTimeout(() => {
      handleNextProfile('right');
      toast({
        title: "Connection Request Sent",
        description: `Your connection request to ${currentProfile.name} has been sent.`,
        duration: 3000,
      });
    }, 300);
  };

  const handleDislike = () => {
    setAnimate('left');
    setTimeout(() => {
      handleNextProfile('left');
    }, 300);
  };

  const handleNextProfile = (direction: 'left' | 'right') => {
    setSwipedProfiles([...swipedProfiles, currentProfile.id]);
    setCurrentProfileIndex(currentIndex => currentIndex < profiles.length - 1 ? currentIndex + 1 : 0);
    setAnimate(null);
  };

  const handleUndo = () => {
    if (!canUndo) return;

    const prevProfileId = swipedProfiles[swipedProfiles.length - 1];
    const prevProfileIndex = profiles.findIndex(p => p.id === prevProfileId);

    setSwipedProfiles(swipedProfiles.slice(0, -1));
    setCurrentProfileIndex(prevProfileIndex);
  };

  const handleApplyFilters = newFilters => {
    setFilters(newFilters);
  };

  return <div className="flex flex-col min-h-screen bg-husky-light">
      <header className="sticky top-0 z-10 flex items-center justify-between bg-white/80 backdrop-blur-md px-6 py-4 border-b border-husky-gray-light">
        <div className="w-10"></div>
        
        <div className="flex items-center space-x-2 bg-husky-subtle px-3 py-1 rounded-full">
          <span className={`text-sm transition-colors ${!isAlumniMode ? 'font-medium text-husky-black' : 'text-husky-gray'}`}>Peers</span>
          <Switch checked={isAlumniMode} onCheckedChange={setIsAlumniMode} />
          <span className={`text-sm transition-colors ${isAlumniMode ? 'font-medium text-husky-black' : 'text-husky-gray'}`}>Alumni</span>
        </div>
        
        <div className="flex items-center gap-2 object-scale-down">
          <Drawer open={filterOpen} onOpenChange={setFilterOpen}>
            <DrawerTrigger asChild>
              <button className="p-2 rounded-xl bg-husky-subtle text-husky-black hover:bg-husky-gray-light transition-colors focus-ring" aria-label="Filter">
                <Filter className="h-5 w-5" />
              </button>
            </DrawerTrigger>
            <FilterMenu isOpen={filterOpen} onClose={() => setFilterOpen(false)} onApplyFilters={handleApplyFilters} />
          </Drawer>
        </div>
      </header>
      
      <main className="flex-1 flex flex-col items-center justify-between p-6 pb-24">
        <div className="w-full max-w-lg mx-auto">
          <div className="relative w-full">
            <div className={`relative transition-all duration-300 ${animate === 'left' ? 'translate-x-[-100px] opacity-0 rotate-[-8deg]' : animate === 'right' ? 'translate-x-[100px] opacity-0 rotate-[8deg]' : ''}`}>
              <ProfileCard 
                profile={currentProfile} 
                onSwipeLeft={handleDislike}
                onSwipeRight={handleLike}
              />
              
              <div className="absolute bottom-4 right-4 z-10">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" size="sm" className="bg-white/80 backdrop-blur-sm">
                      <Flag className="h-4 w-4 mr-1 text-husky-red" />
                      Report
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80">
                    <div className="space-y-4">
                      <h4 className="font-medium">Report {currentProfile.name}</h4>
                      <p className="text-sm text-husky-gray-dark">Select a reason for reporting this profile:</p>
                      <ToggleGroup type="single" variant="outline" className="flex flex-col space-y-2">
                        <ToggleGroupItem value="inappropriate" className="justify-start">Inappropriate content</ToggleGroupItem>
                        <ToggleGroupItem value="fake" className="justify-start">Fake profile</ToggleGroupItem>
                        <ToggleGroupItem value="spam" className="justify-start">Spam</ToggleGroupItem>
                        <ToggleGroupItem value="other" className="justify-start">Other</ToggleGroupItem>
                      </ToggleGroup>
                      <Input placeholder="Additional details (optional)" />
                      <div className="flex justify-end">
                        <Button size="sm">Submit Report</Button>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>
          
          <div className="mt-6">
            <SwipeControls onLike={handleLike} onDislike={handleDislike} onUndo={handleUndo} canUndo={canUndo} />
          </div>
        </div>
      </main>
      
      <NavigationBar />
    </div>;
};

export default Home;
