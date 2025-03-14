
import React from 'react';
import { cn } from '@/lib/utils';

interface MessagePreviewProps {
  message: {
    id: string;
    name: string;
    avatar: string;
    lastMessage: string;
    time: string;
    unread?: boolean;
  };
  onClick?: () => void;
  active?: boolean;
  className?: string;
}

const MessagePreview: React.FC<MessagePreviewProps> = ({
  message,
  onClick,
  active = false,
  className,
}) => {
  const [imageLoaded, setImageLoaded] = React.useState(false);

  return (
    <button
      onClick={onClick}
      className={cn(
        'flex w-full items-center gap-4 rounded-2xl p-4 text-left transition-all duration-200',
        active ? 'bg-husky-red/10' : 'hover:bg-husky-subtle',
        className
      )}
    >
      <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-full">
        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-husky-subtle animate-pulse">
            <span className="sr-only">Loading</span>
          </div>
        )}
        <img
          src={message.avatar}
          alt={message.name}
          className={cn(
            'h-full w-full object-cover transition-opacity duration-500',
            imageLoaded ? 'opacity-100' : 'opacity-0'
          )}
          onLoad={() => setImageLoaded(true)}
        />
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex justify-between">
          <h3 className={cn(
            'font-medium',
            message.unread && 'font-semibold text-husky-black'
          )}>
            {message.name}
          </h3>
          <span className="text-xs text-husky-gray">
            {message.time}
          </span>
        </div>
        <p className={cn(
          'line-clamp-1 text-sm text-husky-gray-dark mt-1',
          message.unread && 'font-medium text-husky-black'
        )}>
          {message.lastMessage}
        </p>
      </div>
      
      {message.unread && (
        <div className="h-2.5 w-2.5 flex-shrink-0 rounded-full bg-husky-red" />
      )}
    </button>
  );
};

export default MessagePreview;
