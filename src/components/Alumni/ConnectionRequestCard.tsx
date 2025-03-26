
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, CheckCircle, XCircle } from "lucide-react";

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

interface ConnectionRequestCardProps {
  request: ConnectionRequest;
  onMessageClick: (id: string) => void;
}

const ConnectionRequestCard: React.FC<ConnectionRequestCardProps> = ({ 
  request, 
  onMessageClick 
}) => {
  return (
    <Card key={request.id} className="overflow-hidden">
      <CardContent className="p-0">
        <div className="p-6">
          <div className="flex items-start gap-4">
            <Avatar className="h-14 w-14 border-2 border-white shadow-md">
              <AvatarImage src={request.image} alt={request.name} />
              <AvatarFallback>{request.name.slice(0, 2)}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-lg">{request.name}</h3>
                  <p className="text-sm text-husky-gray-dark">{request.major}</p>
                </div>
                <Badge className="bg-husky-blue text-white">
                  {request.matchPercentage}% Match
                </Badge>
              </div>
              <p className="text-sm mt-2">{request.bio}</p>
              <div className="flex flex-wrap gap-2 mt-3">
                {request.skills.map((skill, index) => (
                  <Badge key={index} variant="outline" className="bg-husky-subtle/50">
                    {skill}
                  </Badge>
                ))}
              </div>
              <div className="text-xs text-husky-gray mt-3">Requested {request.requestDate}</div>
            </div>
          </div>
          <div className="flex gap-3 mt-4">
            <Button className="flex-1" variant="outline" size="sm" onClick={() => onMessageClick(request.id)}>
              <MessageSquare className="h-4 w-4 mr-2" />
              Message
            </Button>
            <Button className="flex-1" variant="default" size="sm">
              <CheckCircle className="h-4 w-4 mr-2" />
              Accept
            </Button>
            <Button className="flex-1" variant="outline" size="sm">
              <XCircle className="h-4 w-4 mr-2" />
              Decline
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ConnectionRequestCard;
