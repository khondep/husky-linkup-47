
import React, { useState } from 'react';
import NavigationBar from '@/components/NavigationBar';
import { cn } from '@/lib/utils';
import { MessageSquare, Search, BarChart } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { PieChart, Pie, Cell, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar, Legend } from 'recharts';
import { Drawer, DrawerContent, DrawerTrigger, DrawerHeader, DrawerTitle, DrawerDescription } from '@/components/ui/drawer';
import { useNavigate } from 'react-router-dom';

// Profile skills - these would come from your profile in a real app
const mySkills = ['React', 'Node.js', 'Python', 'Machine Learning'];

// Sample connections data
const connections = [
  {
    id: '1',
    name: 'Alex Rodriguez',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&auto=format&fit=crop&q=60',
    status: 'online',
    lastActive: 'Now',
    role: 'SDE at Google',
    education: 'M.S. Software Engineering Systems',
    skills: ['React', 'Node.js', 'Python', 'Machine Learning']
  },
  {
    id: '2',
    name: 'Samantha Chen',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=60',
    status: 'online',
    lastActive: '2m ago',
    role: 'Product Manager at Google',
    education: 'M.S. Information Systems',
    skills: ['Product Management', 'UX Research', 'Data Analysis']
  },
  {
    id: '3',
    name: 'Michael Jackson',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=60',
    status: 'offline',
    lastActive: '1h ago',
    role: 'VC Associate at Sequoia',
    education: 'M.S. Engineering Management',
    skills: ['Finance', 'Business Strategy', 'Market Research']
  },
  {
    id: '4',
    name: 'Emma Wilson',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&auto=format&fit=crop&q=60',
    status: 'online',
    lastActive: 'Now',
    role: 'Graduate Student',
    education: 'Information Systems (Current)',
    skills: ['SQL', 'Tableau', 'Data Visualization']
  },
  {
    id: '5',
    name: 'James Roberts',
    avatar: 'https://images.unsplash.com/photo-1504257432389-52343af06ae3?w=800&auto=format&fit=crop&q=60',
    status: 'offline',
    lastActive: '3h ago',
    role: 'Graduate Student',
    education: 'Computer Science (Current)',
    skills: ['Java', 'Algorithms', 'Web Development']
  },
];

// Process data for radar chart - only include skills from your profile
const prepareSkillData = (connections) => {
  // Filter to only include skills that match your profile
  const relevantSkills = {};
  
  mySkills.forEach(skill => {
    relevantSkills[skill] = 0;
    
    connections.forEach(conn => {
      if (conn.skills.includes(skill)) {
        relevantSkills[skill] += 1;
      }
    });
  });
  
  return Object.keys(relevantSkills).map(skill => ({
    subject: skill,
    A: relevantSkills[skill],
    fullMark: connections.length
  }));
};

const Connections = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showChart, setShowChart] = useState(false);
  const navigate = useNavigate();
  
  const filteredConnections = connections.filter(connection => 
    connection.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    connection.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
    connection.education.toLowerCase().includes(searchQuery.toLowerCase()) ||
    connection.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  
  const skillData = prepareSkillData(connections);
  
  const handleMessageClick = (connectionId) => {
    // Navigate to messages and open the specific conversation
    navigate('/messages');
    // In a real app, you would dispatch an action or use context to set the active message
    // For now we'll just simulate this by sending the ID as a state
    // This would be handled in the Messages component
  };
  
  return (
    <div className="flex flex-col min-h-screen bg-husky-light">
      <header className="sticky top-0 z-10 flex items-center justify-between bg-white/80 backdrop-blur-md px-6 py-4 border-b border-husky-gray-light">
        <h1 className="text-2xl font-semibold text-husky-black">Connections</h1>
        
        <Drawer open={showChart} onOpenChange={setShowChart}>
          <DrawerTrigger>
            <button className="p-2 rounded-full bg-husky-subtle text-husky-black hover:bg-husky-gray-light transition-colors">
              <BarChart className="h-5 w-5" />
            </button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Skill Distribution</DrawerTitle>
              <DrawerDescription>Connections by matching skills</DrawerDescription>
            </DrawerHeader>
            <div className="p-4 h-64">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={skillData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" />
                  <Radar name="Connections" dataKey="A" stroke="#c53030" fill="#c53030" fillOpacity={0.6} />
                  <Legend />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </DrawerContent>
        </Drawer>
      </header>
      
      <main className="flex-1 p-6 pb-24">
        <div className="relative mb-6">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-husky-gray" />
          </div>
          <Input
            type="search"
            placeholder="Search by name, role, education, or skills"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-husky-gray-light focus:border-husky-blue focus:ring-1 focus:ring-husky-blue outline-none transition-all"
          />
        </div>
        
        <div className="space-y-4">
          {filteredConnections.length > 0 ? (
            filteredConnections.map((connection) => (
              <div 
                key={connection.id}
                className="bg-white rounded-xl shadow-subtle p-4 flex items-center"
              >
                <div className="relative">
                  <div className="h-14 w-14 rounded-full overflow-hidden">
                    <img 
                      src={connection.avatar} 
                      alt={connection.name} 
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div 
                    className={cn(
                      "absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-white",
                      connection.status === 'online' ? 'bg-green-500' : 'bg-husky-gray-light'
                    )}
                  />
                </div>
                
                <div className="ml-4 flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-husky-black">{connection.name}</h3>
                      <p className="text-xs text-husky-gray-dark mt-0.5">{connection.role}</p>
                      <p className="text-xs text-husky-gray-dark">{connection.education}</p>
                      <div className="flex flex-wrap mt-1 gap-1">
                        {connection.skills.map((skill, index) => (
                          <span key={index} className="bg-husky-subtle text-xs px-2 py-0.5 rounded-full text-husky-gray-dark">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    <span className="text-xs text-husky-gray">{connection.lastActive}</span>
                  </div>
                </div>
                
                <div className="ml-2">
                  <button 
                    className="p-2 rounded-full bg-husky-subtle text-husky-black hover:bg-husky-gray-light transition-colors"
                    onClick={() => handleMessageClick(connection.id)}
                  >
                    <MessageSquare className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center p-8 text-husky-gray">
              <p className="text-lg">No connections found</p>
              <p className="text-sm mt-1">Try a different search term</p>
            </div>
          )}
        </div>
      </main>
      
      <NavigationBar />
    </div>
  );
};

export default Connections;
