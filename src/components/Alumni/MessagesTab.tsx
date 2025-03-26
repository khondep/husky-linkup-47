
import React from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import MessageCard from './MessageCard';

interface Message {
  id: string;
  name: string;
  image: string;
  lastMessage: string;
  time: string;
  unread: boolean;
}

interface MessagesTabProps {
  messages: Message[];
  onMessageClick: (id: string) => void;
}

const MessagesTab: React.FC<MessagesTabProps> = ({ messages, onMessageClick }) => {
  const navigate = useNavigate();
  
  return (
    <>
      <ScrollArea className="h-[500px]">
        {messages.length > 0 ? (
          <div className="space-y-2">
            {messages.map((message) => (
              <MessageCard 
                key={message.id} 
                message={message} 
                onClick={onMessageClick} 
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center p-8 text-husky-gray">
            <Mail className="h-12 w-12 mb-4 opacity-50" />
            <p className="text-lg font-medium">No messages yet</p>
            <p className="text-sm mt-1">When students message you, they'll appear here</p>
          </div>
        )}
      </ScrollArea>
      <Button 
        className="w-full mt-4" 
        variant="outline"
        onClick={() => navigate('/messages')}
      >
        View All Messages
      </Button>
    </>
  );
};

export default MessagesTab;
