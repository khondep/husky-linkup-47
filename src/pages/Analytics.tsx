
import React, { useState } from 'react';
import NavigationBar from '@/components/NavigationBar';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar, Legend, BarChart, Bar, Cell, PieChart, Pie, Sector } from 'recharts';
import { Card } from '@/components/ui/card';
import { TrendingUp, TrendingDown, Users, Info, MessageCircle, Layers, Network, ChartBar } from 'lucide-react';
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
  connectionSuccessRate: 65.6
};

// Conversation topics data
const conversationTopicsData = [
  { name: 'Career Advice', value: 35 },
  { name: 'Course Help', value: 28 },
  { name: 'Social Planning', value: 15 },
  { name: 'Research', value: 12 },
  { name: 'Industry News', value: 10 }
];

// Opportunity gaps data
const opportunityGapsData = [
  { name: 'Academic Support', value: 85 },
  { name: 'Technical Skills', value: 65 },
  { name: 'Industry Insights', value: 25 },
  { name: 'Job Referrals', value: 30 },
  { name: 'Leadership', value: 40 }
];

// Connection strength data for heatmap
const connectionStrengthData = [
  { name: 'Alex Kim', frequency: 9, value: 80, category: 'Academic' },
  { name: 'Jamie Lee', frequency: 7, value: 70, category: 'Technical' },
  { name: 'Taylor Smith', frequency: 4, value: 50, category: 'Industry' },
  { name: 'Jordan Williams', frequency: 12, value: 95, category: 'Academic' },
  { name: 'Casey Johnson', frequency: 2, value: 30, category: 'Industry' },
  { name: 'Riley Brown', frequency: 5, value: 60, category: 'Technical' },
  { name: 'Morgan Davis', frequency: 8, value: 75, category: 'Academic' }
];

// Connection ROI data
const connectionROIData = [
  { name: 'Time Invested (hrs)', Academic: 8, Technical: 6, Industry: 3 },
  { name: 'Messages Exchanged', Academic: 47, Technical: 35, Industry: 12 },
  { name: 'Valuable Outcomes', Academic: 5, Technical: 3, Industry: 1 }
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
  const [activeTab, setActiveTab] = useState("topics");
  
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
        
        {/* Opportunity Gaps */}
        <Card className="p-6 space-y-4">
          <div>
            <div className="flex items-center">
              <Layers className="h-5 w-5 mr-2 text-amber-500" />
              <h2 className="text-xl font-bold">Opportunity Gaps</h2>
            </div>
            <p className="text-sm text-muted-foreground mt-1">Strong academic connections, but few industry insights in your field</p>
          </div>
          
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={opportunityGapsData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                <XAxis dataKey="name" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Bar dataKey="value" name="Strength">
                  {opportunityGapsData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.value > 60 ? '#10b981' : '#f59e0b'} 
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
        
        {/* Relationship Strength Heatmap */}
        <Card className="p-6 space-y-4">
          <div>
            <div className="flex items-center">
              <Network className="h-5 w-5 mr-2 text-indigo-600" />
              <h2 className="text-xl font-bold">Relationship Strength</h2>
            </div>
            <p className="text-sm text-muted-foreground mt-1">Visual representation of your strongest connections</p>
          </div>
          
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Connection</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Frequency</TableHead>
                  <TableHead>Strength</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {connectionStrengthData.map((connection) => (
                  <TableRow key={connection.name}>
                    <TableCell className="font-medium">{connection.name}</TableCell>
                    <TableCell>{connection.category}</TableCell>
                    <TableCell>{connection.frequency} msgs/week</TableCell>
                    <TableCell>
                      <div className="relative w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                        <div 
                          className="absolute top-0 left-0 h-full rounded-full" 
                          style={{ 
                            width: `${connection.value}%`,
                            background: connection.value > 70 
                              ? '#10b981' // green for strong
                              : connection.value > 40 
                                ? '#f59e0b' // amber for medium
                                : '#ef4444' // red for weak
                          }}
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>
        
        {/* Connection ROI */}
        <Card className="p-6 space-y-4">
          <div>
            <div className="flex items-center">
              <ChartBar className="h-5 w-5 mr-2 text-rose-600" />
              <h2 className="text-xl font-bold">Connection ROI</h2>
            </div>
            <p className="text-sm text-muted-foreground mt-1">Time invested in networking vs. valuable outcomes achieved</p>
          </div>
          
          <Tabs defaultValue="topics" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="topics">Academic</TabsTrigger>
              <TabsTrigger value="technical">Technical</TabsTrigger>
              <TabsTrigger value="industry">Industry</TabsTrigger>
            </TabsList>
            
            <TabsContent value="topics">
              <div className="space-y-4 pt-4">
                <div className="grid grid-cols-3 gap-2">
                  <div className="flex flex-col items-center p-3 bg-slate-50 rounded-lg">
                    <span className="text-2xl font-bold text-indigo-600">8</span>
                    <span className="text-xs text-slate-500">Hours Invested</span>
                  </div>
                  <div className="flex flex-col items-center p-3 bg-slate-50 rounded-lg">
                    <span className="text-2xl font-bold text-indigo-600">47</span>
                    <span className="text-xs text-slate-500">Messages</span>
                  </div>
                  <div className="flex flex-col items-center p-3 bg-slate-50 rounded-lg">
                    <span className="text-2xl font-bold text-green-600">5</span>
                    <span className="text-xs text-slate-500">Outcomes</span>
                  </div>
                </div>
                
                <div className="p-3 bg-slate-50 rounded-lg">
                  <h4 className="text-sm font-medium mb-2">Academic Insights</h4>
                  <p className="text-xs text-slate-600">Your academic connections have yielded 5 valuable outcomes, including research collaborations and study group formations. This represents a strong ROI with 0.6 outcomes per hour invested.</p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="technical">
              <div className="space-y-4 pt-4">
                <div className="grid grid-cols-3 gap-2">
                  <div className="flex flex-col items-center p-3 bg-slate-50 rounded-lg">
                    <span className="text-2xl font-bold text-indigo-600">6</span>
                    <span className="text-xs text-slate-500">Hours Invested</span>
                  </div>
                  <div className="flex flex-col items-center p-3 bg-slate-50 rounded-lg">
                    <span className="text-2xl font-bold text-indigo-600">35</span>
                    <span className="text-xs text-slate-500">Messages</span>
                  </div>
                  <div className="flex flex-col items-center p-3 bg-slate-50 rounded-lg">
                    <span className="text-2xl font-bold text-green-600">3</span>
                    <span className="text-xs text-slate-500">Outcomes</span>
                  </div>
                </div>
                
                <div className="p-3 bg-slate-50 rounded-lg">
                  <h4 className="text-sm font-medium mb-2">Technical Insights</h4>
                  <p className="text-xs text-slate-600">Your technical connections have resulted in 3 valuable outcomes, including skill improvements and code reviews. This represents a moderate ROI with 0.5 outcomes per hour invested.</p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="industry">
              <div className="space-y-4 pt-4">
                <div className="grid grid-cols-3 gap-2">
                  <div className="flex flex-col items-center p-3 bg-slate-50 rounded-lg">
                    <span className="text-2xl font-bold text-indigo-600">3</span>
                    <span className="text-xs text-slate-500">Hours Invested</span>
                  </div>
                  <div className="flex flex-col items-center p-3 bg-slate-50 rounded-lg">
                    <span className="text-2xl font-bold text-indigo-600">12</span>
                    <span className="text-xs text-slate-500">Messages</span>
                  </div>
                  <div className="flex flex-col items-center p-3 bg-slate-50 rounded-lg">
                    <span className="text-2xl font-bold text-green-600">1</span>
                    <span className="text-xs text-slate-500">Outcomes</span>
                  </div>
                </div>
                
                <div className="p-3 bg-slate-50 rounded-lg">
                  <h4 className="text-sm font-medium mb-2">Industry Insights</h4>
                  <p className="text-xs text-slate-600">Your industry connections have only produced 1 valuable outcome. This represents a lower ROI with 0.3 outcomes per hour invested, suggesting an opportunity for focused networking.</p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
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
