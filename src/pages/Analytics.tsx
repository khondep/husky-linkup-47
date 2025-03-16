
import React, { useState } from 'react';
import NavigationBar from '@/components/NavigationBar';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TrendingUp, TrendingDown, Eye, Users, Search, FileText, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

// Sample data for profile views chart
const profileViewsData = [
  { date: 'Mar 17', views: 2 },
  { date: 'Apr 15', views: 4 },
  { date: 'May 12', views: 3 },
  { date: 'Jun 10', views: 7 },
  { date: 'Jul 7', views: 5 },
  { date: 'Aug 5', views: 22 },
  { date: 'Sep 1', views: 13 },
  { date: 'Oct 1', views: 18 },
  { date: 'Oct 27', views: 4 },
  { date: 'Nov 25', views: 8 },
  { date: 'Dec 22', views: 6 },
  { date: 'Jan 20', views: 28 },
  { date: 'Feb 16', views: 12 },
];

// Sample analytics data
const analyticsData = {
  profileViews: 236,
  profileViewsChange: -17,
  connections: 354,
  connectionsChange: 0,
  impressions: 32,
  impressionsChange: 14.3,
  searchAppearances: 50,
  weeklyActions: 0,
  weeklyActionsGoal: 3,
  topLocation: 'Boston, MA',
  topIndustry: 'Computer Science and IT',
  topCompany: 'Northeastern University'
};

// Sample company data for progress bars
const companyData = [
  { name: 'Northeastern University', percentage: 12 },
  { name: 'Google', percentage: 8 },
  { name: 'Microsoft', percentage: 6 },
  { name: 'Amazon', percentage: 4 }
];

const Analytics = () => {
  const [selectedTab, setSelectedTab] = useState('overview');
  
  return (
    <div className="flex flex-col min-h-screen bg-husky-light">
      <header className="sticky top-0 z-10 flex items-center justify-between bg-white/80 backdrop-blur-md px-6 py-4 border-b border-husky-gray-light">
        <h1 className="text-2xl font-semibold text-husky-black">Analytics</h1>
        
        <Button variant="ghost" size="sm">
          <Info className="h-4 w-4 mr-1" />
          Help
        </Button>
      </header>
      
      <main className="flex-1 p-6 pb-24 space-y-6">
        {/* Profile Views Card */}
        <Card className="p-6 space-y-4">
          <div>
            <h2 className="text-3xl font-bold">{analyticsData.profileViews}</h2>
            <div className="flex items-center mt-1">
              <p className="text-sm text-muted-foreground">Profile viewers</p>
              <div className="flex items-center ml-2 text-red-500 text-sm">
                <TrendingDown className="h-3 w-3 mr-0.5" />
                {Math.abs(analyticsData.profileViewsChange)}% previous week
              </div>
            </div>
          </div>
          
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={profileViewsData}
                margin={{ top: 5, right: 10, left: 10, bottom: 5 }}
              >
                <XAxis 
                  dataKey="date" 
                  tick={{ fontSize: 12 }} 
                  axisLine={{ stroke: '#e5e7eb' }} 
                  tickLine={false}
                />
                <YAxis 
                  tick={{ fontSize: 12 }} 
                  domain={[0, 32]} 
                  ticks={[0, 16, 32]} 
                  axisLine={{ stroke: '#e5e7eb' }} 
                  tickLine={false}
                />
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="views" 
                  stroke="#3b82f6" 
                  strokeWidth={2} 
                  dot={{ strokeWidth: 0, r: 0 }}
                  activeDot={{ r: 5, strokeWidth: 0 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
        
        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4">
          {/* Impressions */}
          <Card className="p-4">
            <div className="flex flex-col">
              <h3 className="text-2xl font-bold">{analyticsData.impressions}</h3>
              <p className="text-sm text-muted-foreground">Post impressions</p>
              <div className="flex items-center mt-1 text-green-500 text-sm">
                <TrendingUp className="h-3 w-3 mr-0.5" />
                {analyticsData.impressionsChange}% past 7 days
              </div>
            </div>
          </Card>
          
          {/* Followers */}
          <Card className="p-4">
            <div className="flex flex-col">
              <h3 className="text-2xl font-bold">{analyticsData.connections}</h3>
              <p className="text-sm text-muted-foreground">Connections</p>
              <div className="flex items-center mt-1 text-gray-500 text-sm">
                {analyticsData.connectionsChange}% past 7 days
              </div>
            </div>
          </Card>
          
          {/* Profile Views */}
          <Card className="p-4">
            <div className="flex flex-col">
              <h3 className="text-2xl font-bold">98</h3>
              <p className="text-sm text-muted-foreground">Profile viewers</p>
              <p className="text-xs text-gray-500">Past 90 days</p>
            </div>
          </Card>
          
          {/* Search Appearances */}
          <Card className="p-4">
            <div className="flex flex-col">
              <h3 className="text-2xl font-bold">{analyticsData.searchAppearances}</h3>
              <p className="text-sm text-muted-foreground">Search appearances</p>
              <p className="text-xs text-gray-500">Previous week</p>
            </div>
          </Card>
        </div>
        
        {/* Highlights */}
        <Card className="p-6">
          <div className="flex items-center mb-4">
            <h2 className="text-xl font-bold">Highlights</h2>
            <Info className="h-4 w-4 ml-2 text-muted-foreground" />
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-semibold">{analyticsData.topLocation}</h3>
              <p className="text-sm text-muted-foreground">Top location</p>
            </div>
            
            <div>
              <h3 className="font-semibold">{analyticsData.topIndustry}</h3>
              <p className="text-sm text-muted-foreground">Top industry</p>
            </div>
            
            <div>
              <h3 className="font-semibold">{analyticsData.topCompany}</h3>
              <p className="text-sm text-muted-foreground">Top company</p>
            </div>
          </div>
        </Card>
        
        {/* Details */}
        <Card className="p-6">
          <div className="flex items-center mb-4">
            <h2 className="text-xl font-bold">Details</h2>
            <Info className="h-4 w-4 ml-2 text-muted-foreground" />
          </div>
          
          <Tabs defaultValue="companies" className="w-full">
            <TabsList>
              <TabsTrigger value="companies">Companies</TabsTrigger>
              <TabsTrigger value="industries">Industries</TabsTrigger>
              <TabsTrigger value="locations">Locations</TabsTrigger>
            </TabsList>
            <TabsContent value="companies" className="space-y-4 mt-4">
              {companyData.map((company, index) => (
                <div key={index} className="space-y-1.5">
                  <div className="flex justify-between text-sm">
                    <span>{company.name}</span>
                    <span>{company.percentage}%</span>
                  </div>
                  <Progress value={company.percentage} max={20} className="h-2" />
                </div>
              ))}
            </TabsContent>
            <TabsContent value="industries">
              <p className="text-muted-foreground py-4">Industry data will appear here.</p>
            </TabsContent>
            <TabsContent value="locations">
              <p className="text-muted-foreground py-4">Location data will appear here.</p>
            </TabsContent>
          </Tabs>
        </Card>
        
        {/* Weekly Tracker */}
        <Card className="p-6">
          <h2 className="text-xl font-bold mb-4">Weekly sharing tracker</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Increase your visibility by posting, commenting, or contributing to collaborative articles. 
            We suggest taking <strong>3 actions every week</strong>.
          </p>
          
          <div className="border-t pt-4 mt-4">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 bg-gray-100 rounded-full flex items-center justify-center">
                <FileText className="h-8 w-8 text-gray-400" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">Mar 10-Mar 16</p>
                <p className="font-semibold">0 of 3 actions</p>
                <p className="text-sm text-muted-foreground">No actions yet. Take 3 actions to achieve the weekly sharing goal.</p>
              </div>
            </div>
          </div>
        </Card>
      </main>
      
      <NavigationBar />
    </div>
  );
};

export default Analytics;
