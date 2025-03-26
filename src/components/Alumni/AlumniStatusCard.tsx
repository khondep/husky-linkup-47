
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, BarChart } from "lucide-react";

interface AlumniStatusCardProps {
  performanceData: {
    rating: number;
    connectionRate: number;
    acceptedRequests: number;
    pendingRequests: number;
  };
  onAnalyticsClick: () => void;
}

const AlumniStatusCard: React.FC<AlumniStatusCardProps> = ({ 
  performanceData, 
  onAnalyticsClick 
}) => {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Alumni Status</CardTitle>
        <CardDescription>Overview of your mentoring impact</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="flex flex-col items-center p-3 bg-husky-subtle/50 rounded-lg">
            <div className="text-3xl font-bold text-husky-blue mb-1">{performanceData.rating}</div>
            <div className="flex items-center text-sm text-husky-gray-dark">
              <Star className="h-4 w-4 text-yellow-500 mr-1 inline" fill="currentColor" />
              <span>Average Rating</span>
            </div>
          </div>
          <div className="flex flex-col items-center p-3 bg-husky-subtle/50 rounded-lg">
            <div className="text-3xl font-bold text-husky-blue mb-1">{performanceData.connectionRate}%</div>
            <div className="text-sm text-husky-gray-dark">Connection Rate</div>
          </div>
          <div className="flex flex-col items-center p-3 bg-husky-subtle/50 rounded-lg">
            <div className="text-3xl font-bold text-husky-blue mb-1">{performanceData.acceptedRequests}</div>
            <div className="text-sm text-husky-gray-dark">Active Connections</div>
          </div>
          <div className="flex flex-col items-center p-3 bg-husky-subtle/50 rounded-lg">
            <div className="text-3xl font-bold text-husky-blue mb-1">{performanceData.pendingRequests}</div>
            <div className="text-sm text-husky-gray-dark">Pending Requests</div>
          </div>
        </div>
        <Button 
          variant="outline" 
          className="w-full mt-4 text-husky-blue"
          onClick={onAnalyticsClick}
        >
          <BarChart className="h-4 w-4 mr-2" />
          View Detailed Analytics
        </Button>
      </CardContent>
    </Card>
  );
};

export default AlumniStatusCard;
