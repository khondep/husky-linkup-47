
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Message {
  id: string;
  name: string;
  image: string;
  lastMessage: string;
  time: string;
  unread: boolean;
}

interface MessageCardProps {
  message: Message;
  onClick: (id: string) => void;
}

const MessageCard: React.FC<MessageCardProps> = ({ message, onClick }) => {
  return (
    <Card 
      key={message.id} 
      className={`overflow-hidden cursor-pointer transition-colors hover:bg-husky-subtle/30 ${message.unread ? 'border-l-4 border-l-husky-blue' : ''}`}
      onClick={() => onClick(message.id)}
    >
      <CardContent className="p-4">
        <div className="flex items-center gap-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src={message.image} alt={message.name} />
            <AvatarFallback>{message.name.slice(0, 2)}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <h3 className={`font-medium ${message.unread ? 'text-husky-black' : 'text-husky-gray-dark'}`}>
                {message.name}
              </h3>
              <span className="text-xs text-husky-gray">{message.time}</span>
            </div>
            <p className={`text-sm truncate mt-1 ${message.unread ? 'text-husky-black font-medium' : 'text-husky-gray'}`}>
              {message.lastMessage}
            </p>
          </div>
          {message.unread && (
            <div className="h-3 w-3 rounded-full bg-husky-blue"></div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default MessageCard;
