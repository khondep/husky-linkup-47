
import React from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Clock } from "lucide-react";
import ConnectionRequestCard from './ConnectionRequestCard';

interface ConnectionRequest {
  id: string;
  name: string;
  image: string;
  major: string;
  bio: string;
  skills: string[];
  matchPercentage: number;
  requestDate: string;
}

interface ConnectionRequestsTabProps {
  requests: ConnectionRequest[];
  onMessageClick: (id: string) => void;
}

const ConnectionRequestsTab: React.FC<ConnectionRequestsTabProps> = ({ 
  requests, 
  onMessageClick 
}) => {
  return (
    <ScrollArea className="h-[500px]">
      {requests.length > 0 ? (
        <div className="space-y-4">
          {requests.map((request) => (
            <ConnectionRequestCard 
              key={request.id} 
              request={request} 
              onMessageClick={onMessageClick} 
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center p-8 text-husky-gray">
          <Clock className="h-12 w-12 mb-4 opacity-50" />
          <p className="text-lg font-medium">No pending requests</p>
          <p className="text-sm mt-1">You're all caught up!</p>
        </div>
      )}
    </ScrollArea>
  );
};

export default ConnectionRequestsTab;
