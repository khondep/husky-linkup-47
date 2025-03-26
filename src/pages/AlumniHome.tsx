import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { Star, Mail, User, BarChart, MessageSquare, CheckCircle, XCircle, Clock } from "lucide-react";
import NavigationBar from '@/components/NavigationBar';

// Sample data for connection requests
const connectionRequests = [
  {
    id: '1',
    name: 'Alex Johnson',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=60',
    major: 'Computer Science',
    bio: 'Senior CS student passionate about AI and machine learning. Looking for mentorship in tech industry.',
    skills: ['Machine Learning', 'Python', 'React'],
    matchPercentage: 92,
    requestDate: '2 days ago'
  },
  {
    id: '2',
    name: 'Sophia Chen',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=60',
    major: 'Information Systems',
    bio: 'Graduate student interested in data analytics and product management. Seeking guidance on career paths.',
    skills: ['Data Analysis', 'SQL', 'Tableau'],
    matchPercentage: 88,
    requestDate: '1 day ago'
  },
  {
    id: '3',
    name: 'Marcus Wilson',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=60',
    major: 'Engineering Management',
    bio: 'Working on my capstone project in engineering management. Looking for industry insights.',
    skills: ['Project Management', 'Leadership', 'Systems Engineering'],
    matchPercentage: 85,
    requestDate: '5 hours ago'
  }
];

// Sample message data
const messages = [
  {
    id: '1',
    name: 'Daniel Lee',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=60',
    lastMessage: "Thank you for the advice on my resume. I've implemented your suggestions.",
    time: '2h ago',
    unread: true
  },
  {
    id: '2',
    name: 'Emma Wilson',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&auto=format&fit=crop&q=60',
    lastMessage: 'Would you be available for a quick call next week to discuss my project?',
    time: '1d ago',
    unread: false
  },
  {
    id: '3',
    name: 'James Roberts',
    image: 'https://images.unsplash.com/photo-1504257432389-52343af06ae3?w=400&auto=format&fit=crop&q=60',
    lastMessage: 'I applied for the internship you recommended!',
    time: '3d ago',
    unread: false
  }
];

// Sample performance data
const performanceData = {
  rating: 4.8,
  totalRatings: 24,
  connectionRate: 85,
  totalRequests: 38,
  acceptedRequests: 32,
  pendingRequests: 3,
  recentRatings: [
    { id: '1', name: 'Sarah Johnson', rating: 5, comment: 'Extremely helpful with career guidance and industry insights.', date: '2 weeks ago' },
    { id: '2', name: 'Mike Chen', rating: 5, comment: 'Great mentor, always responsive and provides valuable feedback.', date: '1 month ago' },
    { id: '3', name: 'Jessica Park', rating: 4, comment: 'Very knowledgeable. Helped me prepare for interviews.', date: '1 month ago' }
  ]
};

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
                onClick={handleAnalyticsClick}
              >
                <BarChart className="h-4 w-4 mr-2" />
                View Detailed Analytics
              </Button>
            </CardContent>
          </Card>
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
            <ScrollArea className="h-[500px]">
              {connectionRequests.length > 0 ? (
                <div className="space-y-4">
                  {connectionRequests.map((request) => (
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
                            <Button className="flex-1" variant="outline" size="sm" onClick={() => handleMessageClick(request.id)}>
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
          </TabsContent>
          
          <TabsContent value="messages">
            <ScrollArea className="h-[500px]">
              {messages.length > 0 ? (
                <div className="space-y-2">
                  {messages.map((message) => (
                    <Card 
                      key={message.id} 
                      className={`overflow-hidden cursor-pointer transition-colors hover:bg-husky-subtle/30 ${message.unread ? 'border-l-4 border-l-husky-blue' : ''}`}
                      onClick={() => handleMessageClick(message.id)}
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
          </TabsContent>
        </Tabs>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Recent Feedback</CardTitle>
            <CardDescription>Ratings and comments from your mentees</CardDescription>
          </CardHeader>
          <CardContent>
            {performanceData.recentRatings.map((rating) => (
              <div key={rating.id} className="py-3 border-b last:border-b-0">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-medium">{rating.name}</div>
                    <div className="flex items-center mt-1">
                      {Array(5).fill(0).map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-4 w-4 ${i < rating.rating ? 'text-yellow-500 fill-current' : 'text-gray-300'}`} 
                        />
                      ))}
                      <span className="text-xs text-husky-gray ml-2">{rating.date}</span>
                    </div>
                  </div>
                </div>
                <p className="text-sm mt-2 text-husky-gray-dark">{rating.comment}</p>
              </div>
            ))}
          </CardContent>
          <CardFooter>
            <Button 
              variant="ghost" 
              className="w-full text-husky-blue" 
              onClick={handleAnalyticsClick}
            >
              View All Feedback
            </Button>
          </CardFooter>
        </Card>
      </main>

      <NavigationBar />
    </div>
  );
};

export default AlumniHome;
