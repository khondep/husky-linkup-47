
import React, { useState, useEffect } from 'react';
import NavigationBar from '@/components/NavigationBar';
import MessagePreview from '@/components/MessagePreview';
import { Search, Send, ArrowLeft, RefreshCw } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Drawer, DrawerContent, DrawerClose } from '@/components/ui/drawer';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

const sampleMessages = [
  {
    id: '1',
    name: 'Alex Rodriguez',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&auto=format&fit=crop&q=60',
    lastMessage: 'Thanks for connecting! I would love to learn more about your experience in AI research.',
    time: 'Just now',
    unread: true,
    isOnline: true,
    conversation: [
      { id: 1, sender: 'them', text: 'Hi there! I saw we matched on Husky Match. I specialize in AI research at Google.', time: '2 days ago' },
      { id: 2, sender: 'you', text: 'Hi Alex! Great to connect. I\'m really interested in AI research, especially in NLP.', time: '1 day ago' },
      { id: 3, sender: 'them', text: 'That\'s awesome! I actually work on NLP models at Google. What specific areas are you exploring?', time: '1 day ago' },
      { id: 4, sender: 'you', text: 'I\'m focusing on transformer models for my thesis. Would love to hear about your work!', time: '1 day ago' },
      { id: 5, sender: 'them', text: 'Thanks for connecting! I would love to learn more about your experience in AI research.', time: 'Just now' },
    ],
  },
  {
    id: '2',
    name: 'Samantha Chen',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=60',
    lastMessage: 'I can definitely help with your resume. Would you like to schedule a video call?',
    time: '2h ago',
    unread: true,
    conversation: [
      { id: 1, sender: 'you', text: 'Hi Samantha, I noticed you\'re a Product Manager at Google. I\'m interested in PM roles after graduation.', time: '3 days ago' },
      { id: 2, sender: 'them', text: 'Hello! Yes, I\'d be happy to chat about PM roles and share my experience.', time: '3 days ago' },
      { id: 3, sender: 'you', text: 'That would be amazing! Would you mind taking a look at my resume?', time: '2 days ago' },
      { id: 4, sender: 'them', text: 'I can definitely help with your resume. Would you like to schedule a video call?', time: '2h ago' },
    ],
  },
  {
    id: '3',
    name: 'Michael Jackson',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=60',
    lastMessage: 'Your startup idea sounds promising. Let\'s discuss the market analysis further.',
    time: 'Yesterday',
    conversation: [
      { id: 1, sender: 'them', text: 'Hey there! I saw your profile and noticed you\'re interested in startups.', time: '1 week ago' },
      { id: 2, sender: 'you', text: 'Hi Michael! Yes, I\'m working on a startup idea in the EdTech space.', time: '6 days ago' },
      { id: 3, sender: 'them', text: 'That\'s a hot space right now. What problem are you trying to solve?', time: '5 days ago' },
      { id: 4, sender: 'you', text: 'We\'re building a platform to connect students with industry mentors for real-world projects.', time: '2 days ago' },
      { id: 5, sender: 'them', text: 'Your startup idea sounds promising. Let\'s discuss the market analysis further.', time: 'Yesterday' },
    ],
  },
  {
    id: '4',
    name: 'Emily Watson',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&auto=format&fit=crop&q=60',
    lastMessage: 'I would be happy to introduce you to my colleagues at the research lab.',
    time: '2d ago',
    conversation: [
      { id: 1, sender: 'you', text: 'Hi Emily, I\'m interested in learning more about your research in ML.', time: '1 week ago' },
      { id: 2, sender: 'them', text: 'Hello! I\'d be happy to share. My focus is on reinforcement learning for robotics.', time: '6 days ago' },
      { id: 3, sender: 'you', text: 'That sounds fascinating! Would there be opportunities to visit your lab?', time: '3 days ago' },
      { id: 4, sender: 'them', text: 'I would be happy to introduce you to my colleagues at the research lab.', time: '2d ago' },
    ],
  },
  {
    id: '5',
    name: 'James Wilson',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&auto=format&fit=crop&q=60',
    lastMessage: 'Let me know if you have any questions about the co-op application process.',
    time: '1w ago',
    conversation: [
      { id: 1, sender: 'them', text: 'Hi there! I see you\'re interested in co-op opportunities.', time: '2 weeks ago' },
      { id: 2, sender: 'you', text: 'Yes, I\'m planning to apply for a co-op position next semester.', time: '2 weeks ago' },
      { id: 3, sender: 'them', text: 'Great! I went through the process last year and could share some tips.', time: '10 days ago' },
      { id: 4, sender: 'you', text: 'That would be so helpful! When would be a good time to chat?', time: '9 days ago' },
      { id: 5, sender: 'them', text: 'Let me know if you have any questions about the co-op application process.', time: '1w ago' },
    ],
  },
];

const icebreakers = [
  "I noticed you have experience in [skill]. Could you share how you developed expertise in that area?",
  "Your work at [company] sounds interesting. What's a typical day like in your role?",
  "I'm really impressed by your background in [field]. What projects are you currently working on?",
  "I'm curious about your experience with [technology]. Have you found it effective for [specific use case]?",
  "Your educational background in [field] aligns with my interests. What courses or resources would you recommend?",
  "I see we share an interest in [topic]. Have you read any good articles or books on it recently?",
  "Would you be open to sharing your career journey and how you got to your current role?",
  "What's the most challenging project you've worked on, and what did you learn from it?",
  "I'd love to learn about your experience transitioning from academia to industry. Any advice?",
  "Do you have any recommendations for someone looking to break into [industry]?"
];

const Messages = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeMessageId, setActiveMessageId] = useState<string | null>(null);
  const [messageText, setMessageText] = useState('');
  const [openMessageDrawer, setOpenMessageDrawer] = useState(false);
  const [conversations, setConversations] = useState(
    sampleMessages.reduce((acc, msg) => ({...acc, [msg.id]: msg.conversation}), {})
  );
  const [refreshingIcebreaker, setRefreshingIcebreaker] = useState(false);
  const [currentIcebreaker, setCurrentIcebreaker] = useState(icebreakers[0]);
  const navigate = useNavigate();
  const location = useLocation();
  
  // Parse the contactId from URL query parameters
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const contactId = params.get('contactId');
    
    if (contactId) {
      // Check if the contactId exists in our sample messages
      const contactExists = sampleMessages.some(msg => msg.id === contactId);
      
      if (contactExists) {
        setActiveMessageId(contactId);
        setOpenMessageDrawer(true);
      } else {
        // If contact doesn't exist in our messages yet, we would typically
        // create a new conversation thread here in a real app
        toast({
          title: "Starting new conversation",
          description: "Opening chat with this connection.",
        });
        
        // For this demo, let's default to the first conversation if contact not found
        setActiveMessageId(sampleMessages[0].id);
        setOpenMessageDrawer(true);
      }
    }
  }, [location.search]);
  
  const filteredMessages = sampleMessages.filter(message => 
    message.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activeMessage = sampleMessages.find(msg => msg.id === activeMessageId);
  
  const handleSendMessage = () => {
    if (!messageText.trim() || !activeMessageId) return;
    
    const newMessage = {
      id: Date.now(),
      sender: 'you',
      text: messageText,
      time: 'Just now'
    };
    
    setConversations(prev => ({
      ...prev,
      [activeMessageId]: [...(prev[activeMessageId] || []), newMessage]
    }));
    
    setMessageText('');
  };

  const refreshIcebreaker = () => {
    setRefreshingIcebreaker(true);
    
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * icebreakers.length);
      let newIcebreaker = icebreakers[randomIndex];
      
      if (activeMessage) {
        const skills = ["AI research", "Product Management", "Machine Learning", "Data Science"];
        const companies = ["Google", "Apple", "Amazon", "Microsoft"];
        const fields = ["Computer Science", "Information Systems", "Engineering Management"];
        
        newIcebreaker = newIcebreaker
          .replace('[skill]', skills[Math.floor(Math.random() * skills.length)])
          .replace('[company]', companies[Math.floor(Math.random() * companies.length)])
          .replace('[field]', fields[Math.floor(Math.random() * fields.length)])
          .replace('[technology]', "Python")
          .replace('[topic]', "Artificial Intelligence")
          .replace('[industry]', "tech");
      }
      
      setCurrentIcebreaker(newIcebreaker);
      setRefreshingIcebreaker(false);
    }, 700);
  };

  const handleOpenMessage = (id: string) => {
    // Update URL with the contactId parameter for better sharing and navigation
    navigate(`/messages?contactId=${id}`, { replace: true });
    setActiveMessageId(id);
    setOpenMessageDrawer(true);
  };

  const handleUseIcebreaker = (text: string) => {
    setMessageText(text);
    document.body.click();
  };

  const handleCloseDrawer = () => {
    setOpenMessageDrawer(false);
    // Remove the contactId from URL when closing the conversation
    navigate('/messages', { replace: true });
  };
  
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
                onClick={() => handleOpenMessage(message.id)}
                className="animate-slide-up cursor-pointer"
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-40 text-husky-gray">
            <p className="text-lg">No messages found</p>
            <p className="text-sm mt-1">Try a different search term</p>
          </div>
        )}

        <Drawer open={openMessageDrawer} onOpenChange={handleCloseDrawer}>
          <DrawerContent className="h-[90vh] p-0">
            {activeMessage && (
              <div className="flex flex-col h-full">
                <div className="flex items-center p-4 border-b">
                  <DrawerClose asChild>
                    <button className="p-1 mr-3">
                      <ArrowLeft className="h-5 w-5" />
                    </button>
                  </DrawerClose>
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full overflow-hidden mr-3">
                      <img
                        src={activeMessage.avatar}
                        alt={activeMessage.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-medium">{activeMessage.name}</h3>
                      <p className="text-xs text-husky-gray">
                        {activeMessage.isOnline ? 'Online' : 'Last seen ' + activeMessage.time}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="flex-1 p-4 overflow-y-auto bg-husky-subtle/30">
                  <div className="space-y-4">
                    {conversations[activeMessageId]?.map(msg => (
                      <div
                        key={msg.id}
                        className={`flex ${msg.sender === 'you' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[80%] p-3 rounded-lg ${
                            msg.sender === 'you'
                              ? 'bg-husky-red text-white rounded-tr-none'
                              : 'bg-white text-husky-black rounded-tl-none'
                          }`}
                        >
                          <p className="text-sm">{msg.text}</p>
                          <p className="text-xs mt-1 opacity-80 text-right">{msg.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="p-4 border-t bg-white">
                  <Popover>
                    <PopoverTrigger asChild>
                      <button className="flex items-center text-xs text-husky-blue mb-2">
                        Need an icebreaker?
                        <RefreshCw 
                          className={`h-3 w-3 ml-1 ${refreshingIcebreaker ? 'animate-spin' : ''}`} 
                          onClick={(e) => {
                            e.stopPropagation();
                            refreshIcebreaker();
                          }} 
                        />
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80">
                      <div className="space-y-2">
                        <h4 className="font-medium text-sm">Suggested Icebreaker</h4>
                        <p className="text-sm">{currentIcebreaker}</p>
                        <div className="flex justify-between">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={refreshIcebreaker}
                            disabled={refreshingIcebreaker}
                          >
                            <RefreshCw className={`h-3 w-3 mr-1 ${refreshingIcebreaker ? 'animate-spin' : ''}`} />
                            Refresh
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => handleUseIcebreaker(currentIcebreaker)}
                          >
                            Use This
                          </Button>
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                  
                  <div className="flex items-center gap-2">
                    <Input
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                      placeholder="Type a message..."
                      className="flex-1"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          handleSendMessage();
                        }
                      }}
                    />
                    <Button onClick={handleSendMessage} disabled={!messageText.trim()}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </DrawerContent>
        </Drawer>
      </main>
      
      <NavigationBar />
    </div>
  );
};

export default Messages;
