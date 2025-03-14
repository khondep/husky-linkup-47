
import React, { useState } from 'react';
import NavigationBar from '@/components/NavigationBar';
import MessagePreview from '@/components/MessagePreview';
import { Search } from 'lucide-react';

// Sample data
const sampleMessages = [
  {
    id: '1',
    name: 'Alex Rodriguez',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&auto=format&fit=crop&q=60',
    lastMessage: 'Thanks for connecting! I would love to learn more about your experience in AI research.',
    time: 'Just now',
    unread: true,
  },
  {
    id: '2',
    name: 'Samantha Chen',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=60',
    lastMessage: 'I can definitely help with your resume. Would you like to schedule a video call?',
    time: '2h ago',
    unread: true,
  },
  {
    id: '3',
    name: 'Michael Jackson',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=60',
    lastMessage: 'Your startup idea sounds promising. Let\'s discuss the market analysis further.',
    time: 'Yesterday',
  },
  {
    id: '4',
    name: 'Emily Watson',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&auto=format&fit=crop&q=60',
    lastMessage: 'I would be happy to introduce you to my colleagues at the research lab.',
    time: '2d ago',
  },
  {
    id: '5',
    name: 'James Wilson',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&auto=format&fit=crop&q=60',
    lastMessage: 'Let me know if you have any questions about the co-op application process.',
    time: '1w ago',
  },
];

const Messages = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeMessageId, setActiveMessageId] = useState<string | null>(null);
  
  const filteredMessages = sampleMessages.filter(message => 
    message.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <div className="flex flex-col min-h-screen bg-husky-light">
      <header className="sticky top-0 z-10 flex items-center justify-between bg-white/80 backdrop-blur-md px-6 py-4 border-b border-husky-gray-light">
        <h1 className="text-2xl font-semibold text-husky-black">Messages</h1>
      </header>
      
      <main className="flex-1 p-6 pb-24">
        <div className="relative mb-6">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-husky-gray" />
          </div>
          <input
            type="search"
            placeholder="Search messages"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-husky-gray-light focus:border-husky-blue focus:ring-1 focus:ring-husky-blue outline-none transition-all"
          />
        </div>
        
        {filteredMessages.length > 0 ? (
          <div className="space-y-2 animate-fade-in">
            {filteredMessages.map(message => (
              <MessagePreview
                key={message.id}
                message={message}
                active={activeMessageId === message.id}
                onClick={() => setActiveMessageId(message.id)}
                className="animate-slide-up"
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-40 text-husky-gray">
            <p className="text-lg">No messages found</p>
            <p className="text-sm mt-1">Try a different search term</p>
          </div>
        )}
      </main>
      
      <NavigationBar />
    </div>
  );
};

export default Messages;
