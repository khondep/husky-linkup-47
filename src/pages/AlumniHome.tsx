
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
import NavigationBar from '@/components/NavigationBar';
import AlumniStatusCard from '@/components/Alumni/AlumniStatusCard';
import ConnectionRequestsTab from '@/components/Alumni/ConnectionRequestsTab';
import MessagesTab from '@/components/Alumni/MessagesTab';
import RecentFeedbackCard from '@/components/Alumni/RecentFeedbackCard';
import { connectionRequests, messages, performanceData } from '@/data/alumniData';

const AlumniHome = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("requests");

  const handleMessageClick = (id: string) => {
    navigate(`/messages?contactId=${id}`);
  };

  const handleProfileClick = () => {
    navigate('/profile');
  };

  const handleAnalyticsClick = () => {
    navigate('/analytics');
  };

  return (
    <div className="flex flex-col min-h-screen bg-husky-light">
      <header className="sticky top-0 z-10 flex items-center justify-between bg-white/80 backdrop-blur-md px-6 py-4 border-b border-husky-gray-light">
        <h1 className="text-2xl font-semibold text-husky-black">Alumni Dashboard</h1>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={handleProfileClick}>
            <User className="h-5 w-5" />
          </Button>
        </div>
      </header>

      <main className="flex-1 p-6 pb-24">
        <div className="grid grid-cols-1 gap-6 mb-6">
          <AlumniStatusCard 
            performanceData={performanceData} 
            onAnalyticsClick={handleAnalyticsClick} 
          />
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-2 mb-6">
            <TabsTrigger value="requests" className="text-base py-3">
              Connection Requests
            </TabsTrigger>
            <TabsTrigger value="messages" className="text-base py-3">
              Recent Messages
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="requests">
            <ConnectionRequestsTab 
              requests={connectionRequests} 
              onMessageClick={handleMessageClick} 
            />
          </TabsContent>
          
          <TabsContent value="messages">
            <MessagesTab 
              messages={messages} 
              onMessageClick={handleMessageClick} 
            />
          </TabsContent>
        </Tabs>

        <RecentFeedbackCard 
          ratings={performanceData.recentRatings} 
          onViewAllClick={handleAnalyticsClick} 
        />
      </main>

      <NavigationBar />
    </div>
  );
};

export default AlumniHome;
