
import React from 'react';
import NavigationBar from '@/components/NavigationBar';
import { cn } from '@/lib/utils';
import { MessageSquare, Phone, Video } from 'lucide-react';

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
  },
  {
    id: '2',
    name: 'Samantha Chen',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=60',
    status: 'online',
    lastActive: '2m ago',
    role: 'Product Manager at Google',
    education: 'M.S. Information Systems',
  },
  {
    id: '3',
    name: 'Michael Jackson',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=60',
    status: 'offline',
    lastActive: '1h ago',
    role: 'VC Associate at Sequoia',
    education: 'M.S. Engineering Management',
  },
  {
    id: '4',
    name: 'Emma Wilson',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&auto=format&fit=crop&q=60',
    status: 'online',
    lastActive: 'Now',
    role: 'Graduate Student',
    education: 'Information Systems (Current)',
  },
  {
    id: '5',
    name: 'James Roberts',
    avatar: 'https://images.unsplash.com/photo-1504257432389-52343af06ae3?w=800&auto=format&fit=crop&q=60',
    status: 'offline',
    lastActive: '3h ago',
    role: 'Graduate Student',
    education: 'Computer Science (Current)',
  },
];

const Connections = () => {
  return (
    <div className="flex flex-col min-h-screen bg-husky-light">
      <header className="sticky top-0 z-10 flex items-center justify-between bg-white/80 backdrop-blur-md px-6 py-4 border-b border-husky-gray-light">
        <h1 className="text-2xl font-semibold text-husky-black">Connections</h1>
      </header>
      
      <main className="flex-1 p-6 pb-24">
        <div className="space-y-4">
          {connections.map((connection) => (
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
                  </div>
                  <span className="text-xs text-husky-gray">{connection.lastActive}</span>
                </div>
              </div>
              
              <div className="flex space-x-2 ml-2">
                <button className="p-2 rounded-full bg-husky-subtle text-husky-black hover:bg-husky-gray-light transition-colors">
                  <MessageSquare className="h-5 w-5" />
                </button>
                <button className="p-2 rounded-full bg-husky-subtle text-husky-black hover:bg-husky-gray-light transition-colors">
                  <Phone className="h-5 w-5" />
                </button>
                <button className="p-2 rounded-full bg-husky-subtle text-husky-black hover:bg-husky-gray-light transition-colors">
                  <Video className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
      
      <NavigationBar />
    </div>
  );
};

export default Connections;
