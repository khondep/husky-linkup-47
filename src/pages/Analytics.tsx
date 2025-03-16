
import React, { useState } from 'react';
import NavigationBar from '@/components/NavigationBar';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar, Legend } from 'recharts';
import { Card } from '@/components/ui/card';
import { TrendingUp, TrendingDown, Users, Info, Clock, UserCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent 
} from '@/components/ui/chart';

// Sample data for time on app chart
const timeOnAppData = [
  { date: 'Mar 17', minutes: 12 },
  { date: 'Apr 15', minutes: 24 },
  { date: 'May 12', minutes: 18 },
  { date: 'Jun 10', minutes: 35 },
  { date: 'Jul 7', minutes: 22 },
  { date: 'Aug 5', minutes: 42 },
  { date: 'Sep 1', minutes: 28 },
  { date: 'Oct 1', minutes: 31 },
  { date: 'Oct 27', minutes: 19 },
  { date: 'Nov 25', minutes: 26 },
  { date: 'Dec 22', minutes: 24 },
  { date: 'Jan 20', minutes: 38 },
  { date: 'Feb 16', minutes: 29 },
];

// Sample analytics data (adjusted for a 600-user app)
const analyticsData = {
  profileViews: 87,
  profileViewsChange: -5,
  connections: 42,
  connectionsChange: 3.5,
  connectionRequests: 64,
  connectionAccepts: 42,
  connectionSuccessRate: 65.6
};

// Profile skills for radar chart
const mySkills = ['React', 'Node.js', 'Python', 'Machine Learning'];

// Sample connections data (simplified)
const connections = [
  {
    id: '1',
    skills: ['React', 'Node.js', 'Python']
  },
  {
    id: '2',
    skills: ['React', 'UX Research']
  },
  {
    id: '3',
    skills: ['Business Strategy', 'Market Research']
  },
  {
    id: '4',
    skills: ['SQL', 'Data Visualization', 'Machine Learning']
  },
  {
    id: '5',
    skills: ['Java', 'Algorithms', 'Node.js']
  },
];

// Process data for radar chart - only include skills from your profile
const prepareSkillData = (connections) => {
  // Filter to only include skills that match your profile
  const relevantSkills = {};
  
  mySkills.forEach(skill => {
    relevantSkills[skill] = 0;
    
    connections.forEach(conn => {
      if (conn.skills.includes(skill)) {
        relevantSkills[skill] += 1;
      }
    });
  });
  
  return Object.keys(relevantSkills).map(skill => ({
    subject: skill,
    A: relevantSkills[skill],
    fullMark: connections.length
  }));
};

const Analytics = () => {
  const skillData = prepareSkillData(connections);
  
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
        {/* Time on App Card */}
        <Card className="p-6 space-y-4">
          <div>
            <div className="flex items-center">
              <Clock className="h-5 w-5 mr-2 text-blue-600" />
              <h2 className="text-xl font-bold">Time on App</h2>
            </div>
            <p className="text-sm text-muted-foreground mt-1">Your app usage over time</p>
          </div>
          
          <div className="h-56">
            <ChartContainer 
              config={{
                minutes: {
                  label: "Minutes",
                  color: "#3b82f6"
                }
              }}
              className="h-full w-full"
            >
              <LineChart
                data={timeOnAppData}
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
                  domain={[0, 45]} 
                  ticks={[0, 15, 30, 45]} 
                  axisLine={{ stroke: '#e5e7eb' }} 
                  tickLine={false}
                  unit=" min"
                />
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line 
                  type="monotone" 
                  dataKey="minutes" 
                  stroke="#3b82f6" 
                  strokeWidth={2} 
                  dot={{ strokeWidth: 0, r: 0 }}
                  activeDot={{ r: 5, strokeWidth: 0 }}
                />
              </LineChart>
            </ChartContainer>
          </div>
        </Card>
        
        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4">
          {/* Connections */}
          <Card className="p-4">
            <div className="flex flex-col">
              <h3 className="text-2xl font-bold">{analyticsData.connections}</h3>
              <p className="text-sm text-muted-foreground">Connections</p>
              <div className="flex items-center mt-1 text-green-500 text-sm">
                <TrendingUp className="h-3 w-3 mr-0.5" />
                {analyticsData.connectionsChange}% past 7 days
              </div>
            </div>
          </Card>
          
          {/* Connection Success Rate */}
          <Card className="p-4">
            <div className="flex flex-col">
              <div className="flex items-center">
                <UserCheck className="h-4 w-4 mr-1.5 text-green-500" />
                <h3 className="text-2xl font-bold">{analyticsData.connectionSuccessRate}%</h3>
              </div>
              <p className="text-sm text-muted-foreground">Connection success rate</p>
              <p className="text-xs text-gray-500">{analyticsData.connectionAccepts} accepted of {analyticsData.connectionRequests} requests</p>
            </div>
          </Card>
        </div>
        
        {/* Skill Matching Radar Chart */}
        <Card className="p-6">
          <div className="flex items-center mb-4">
            <h2 className="text-xl font-bold">Skill Distribution</h2>
            <Info className="h-4 w-4 ml-2 text-muted-foreground" />
          </div>
          
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={skillData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <Radar name="Connections with matching skills" dataKey="A" stroke="#c53030" fill="#c53030" fillOpacity={0.6} />
                <Legend />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-sm text-center text-muted-foreground mt-4">
            This chart shows connections who share your key skills
          </p>
        </Card>
      </main>
      
      <NavigationBar />
    </div>
  );
};

export default Analytics;
