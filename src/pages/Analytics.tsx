
import React, { useState } from 'react';
import NavigationBar from '@/components/NavigationBar';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar, Legend, BarChart, Bar, Cell, PieChart, Pie, Sector } from 'recharts';
import { Card } from '@/components/ui/card';
import { TrendingUp, TrendingDown, Users, Info, MessageCircle, Trophy, ChartBar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent 
} from '@/components/ui/chart';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Sample analytics data (adjusted for a 600-user app)
const analyticsData = {
  profileViews: 87,
  profileViewsChange: -5,
  connections: 42,
  connectionsChange: 3.5,
  connectionRequests: 64,
  connectionAccepts: 42,
  connectionSuccessRate: 65.6,
  networkingScore: 78
};

// Conversation topics data
const conversationTopicsData = [
  { name: 'Career Advice', value: 35 },
  { name: 'Course Help', value: 28 },
  { name: 'Social Planning', value: 15 },
  { name: 'Research', value: 12 },
  { name: 'Industry News', value: 10 }
];

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

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * Math.PI / 180);
  const y = cy + radius * Math.sin(-midAngle * Math.PI / 180);

  return (
    <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
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
                <Users className="h-4 w-4 mr-1.5 text-green-500" />
                <h3 className="text-2xl font-bold">{analyticsData.connectionSuccessRate}%</h3>
              </div>
              <p className="text-sm text-muted-foreground">Connection success rate</p>
              <p className="text-xs text-gray-500">{analyticsData.connectionAccepts} accepted of {analyticsData.connectionRequests} requests</p>
            </div>
          </Card>
        </div>
        
        {/* Networking Score - New Section */}
        <Card className="p-6 space-y-4">
          <div>
            <div className="flex items-center">
              <Trophy className="h-5 w-5 mr-2 text-amber-500" />
              <h2 className="text-xl font-bold">Networking Score</h2>
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              Gamified metric that evaluates your networking effectiveness
            </p>
          </div>
          
          <div className="flex flex-col">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-baseline">
                  <span className="text-4xl font-bold">{analyticsData.networkingScore}</span>
                  <span className="text-sm text-muted-foreground ml-1">/100</span>
                </div>
                <p className="text-sm font-medium text-green-600 mt-1">Advanced Networker</p>
              </div>
            </div>
            
            <div className="space-y-3 mt-4">
              <p className="text-sm">
                The Networking Score is a gamified metric that evaluates a student's engagement and effectiveness 
                in networking with alumni. It encourages proactive outreach, meaningful conversations, 
                and a strategic approach to building professional connections.
              </p>
              
              <div className="space-y-2">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                  <span className="text-sm">Outreach: 85%</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                  <span className="text-sm">Response Rate: 72%</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-amber-500 rounded-full mr-2"></div>
                  <span className="text-sm">Engagement: 78%</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 pt-2">
            <div className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
              Next milestone: 80 points
            </div>
            <div className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
              2 more alumni outreach needed
            </div>
            <div className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded">
              Follow up with 3 recent connections
            </div>
          </div>
        </Card>
        
        {/* Conversation Topics */}
        <Card className="p-6 space-y-4">
          <div>
            <div className="flex items-center">
              <MessageCircle className="h-5 w-5 mr-2 text-blue-600" />
              <h2 className="text-xl font-bold">Conversation Topics</h2>
            </div>
            <p className="text-sm text-muted-foreground mt-1">AI-identified themes in your conversations</p>
          </div>
          
          <div className="h-64 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={conversationTopicsData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {conversationTopicsData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value} messages`, 'Frequency']} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
        
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
