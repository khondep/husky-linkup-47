
import React, { useState } from 'react';
import NavigationBar from '@/components/NavigationBar';
import { Calendar, Award, Coffee, Users, Book, Zap, Globe, Music, Briefcase, ChevronRight } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";

// Sample data
const exploreCategories = [
  {
    id: 'clubs',
    title: 'Clubs & Organizations',
    icon: Users,
    color: 'bg-blue-500',
    items: [
      { name: 'Coding Club', members: 120, image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=60' },
      { name: 'Data Science Society', members: 95, image: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?w=800&auto=format&fit=crop&q=60' },
      { name: 'Entrepreneurship Association', members: 85, image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&auto=format&fit=crop&q=60' },
      { name: 'Women in Tech', members: 78, image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&auto=format&fit=crop&q=60' },
    ]
  },
  {
    id: 'events',
    title: 'Upcoming Events',
    icon: Calendar,
    color: 'bg-purple-500',
    items: [
      { name: 'Tech Career Fair', date: 'May 15', image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&auto=format&fit=crop&q=60' },
      { name: 'AI Workshop', date: 'May 22', image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&auto=format&fit=crop&q=60' },
      { name: 'Startup Weekend', date: 'Jun 5-7', image: 'https://images.unsplash.com/photo-1582213782179-e0d4d3cce817?w=800&auto=format&fit=crop&q=60' },
      { name: 'Hackathon 2023', date: 'Jun 12', image: 'https://images.unsplash.com/photo-1577563908411-5077b6dc7624?w=800&auto=format&fit=crop&q=60' },
    ]
  },
  {
    id: 'communities',
    title: 'Study Groups',
    icon: Book,
    color: 'bg-amber-500',
    items: [
      { name: 'Algorithm Study Group', members: 32, image: 'https://images.unsplash.com/photo-1606326608690-4e0281b1e588?w=800&auto=format&fit=crop&q=60' },
      { name: 'Machine Learning Circle', members: 28, image: 'https://images.unsplash.com/photo-1526378800651-c32d170fe6f8?w=800&auto=format&fit=crop&q=60' },
      { name: 'Web Development Squad', members: 45, image: 'https://images.unsplash.com/photo-1598257006458-087169a1f08d?w=800&auto=format&fit=crop&q=60' },
      { name: 'Mobile App Builders', members: 24, image: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=800&auto=format&fit=crop&q=60' },
    ]
  },
  {
    id: 'mentorship',
    title: 'Mentorship Programs',
    icon: Coffee,
    color: 'bg-green-500',
    items: [
      { name: 'Career Guidance', description: 'Get matched with industry mentors', image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=60' },
      { name: 'Tech Interview Prep', description: 'Practice interviews with professionals', image: 'https://images.unsplash.com/photo-1543269664-56d93c1b41a6?w=800&auto=format&fit=crop&q=60' },
      { name: 'Research Mentorship', description: 'Find research advisors in your field', image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&auto=format&fit=crop&q=60' },
      { name: 'Startup Advisors', description: 'Connect with entrepreneurs', image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&auto=format&fit=crop&q=60' },
    ]
  },
  {
    id: 'projects',
    title: 'Student Projects',
    icon: Zap,
    color: 'bg-orange-500',
    items: [
      { name: 'AR Campus Tour App', team: 'Mobile Dev Team', image: 'https://images.unsplash.com/photo-1581091877018-dac6a371d50f?w=800&auto=format&fit=crop&q=60' },
      { name: 'Smart Campus IoT', team: 'Hardware Hackers', image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&auto=format&fit=crop&q=60' },
      { name: 'Sustainable Dining', team: 'Green Initiative', image: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=800&auto=format&fit=crop&q=60' },
      { name: 'AI Study Assistant', team: 'ML Group', image: 'https://images.unsplash.com/photo-1591696205602-2f950c417cb9?w=800&auto=format&fit=crop&q=60' },
    ]
  }
];

// News and announcements data
const campusNews = [
  {
    title: 'New Computer Science Building Opening',
    date: 'May 5, 2023',
    image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&auto=format&fit=crop&q=60',
    category: 'Campus'
  },
  {
    title: 'Summer Research Opportunities Available',
    date: 'Apr 28, 2023',
    image: 'https://images.unsplash.com/photo-1484069560501-87d72b0c3669?w=800&auto=format&fit=crop&q=60',
    category: 'Research'
  },
  {
    title: 'Career Fair Registration Now Open',
    date: 'Apr 20, 2023',
    image: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?w=800&auto=format&fit=crop&q=60',
    category: 'Careers'
  },
];

const Explore = () => {
  const [activeTab, setActiveTab] = useState('discover');

  return (
    <div className="flex flex-col min-h-screen bg-husky-light">
      <header className="sticky top-0 z-10 flex items-center justify-between bg-white/80 backdrop-blur-md px-6 py-4 border-b border-husky-gray-light">
        <h1 className="text-2xl font-semibold text-husky-black">Explore</h1>
      </header>
      
      <div className="bg-white border-b border-husky-gray-light">
        <div className="flex px-6">
          <button 
            className={`px-4 py-3 font-medium text-sm relative ${activeTab === 'discover' ? 'text-husky-red' : 'text-husky-gray-dark'}`}
            onClick={() => setActiveTab('discover')}
          >
            Discover
            {activeTab === 'discover' && 
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-husky-red" />
            }
          </button>
          <button 
            className={`px-4 py-3 font-medium text-sm relative ${activeTab === 'news' ? 'text-husky-red' : 'text-husky-gray-dark'}`}
            onClick={() => setActiveTab('news')}
          >
            News
            {activeTab === 'news' && 
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-husky-red" />
            }
          </button>
        </div>
      </div>
      
      <main className="flex-1 p-6 pb-24">
        {activeTab === 'discover' ? (
          <div className="space-y-8">
            {exploreCategories.map((category) => (
              <div key={category.id} className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className={`p-1.5 rounded-lg ${category.color} text-white`}>
                      <category.icon className="h-5 w-5" />
                    </div>
                    <h2 className="text-lg font-semibold text-husky-black">{category.title}</h2>
                  </div>
                  <button className="text-husky-red text-sm font-medium flex items-center">
                    See all
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </button>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  {category.items.map((item, index) => (
                    <div 
                      key={index}
                      className="bg-white rounded-xl shadow-subtle overflow-hidden"
                    >
                      <div className="h-32 w-full overflow-hidden">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="p-3">
                        <h3 className="font-medium text-husky-black text-sm">{item.name}</h3>
                        <p className="text-xs text-husky-gray-dark mt-0.5">
                          {'members' in item ? `${item.members} members` : 
                          'date' in item ? item.date : 
                          'team' in item ? item.team :
                          'description' in item ? item.description : ''}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-husky-black">Campus News & Updates</h2>
            
            <div className="space-y-4">
              {campusNews.map((news, index) => (
                <Card key={index} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="flex h-24 sm:h-32">
                      <div className="w-1/3 overflow-hidden">
                        <img 
                          src={news.image} 
                          alt={news.title} 
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="w-2/3 p-3 flex flex-col justify-between">
                        <div>
                          <span className="text-xs font-medium text-husky-red">{news.category}</span>
                          <h3 className="font-medium text-husky-black text-sm mt-1">{news.title}</h3>
                        </div>
                        <time className="text-xs text-husky-gray-dark">{news.date}</time>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <button className="w-full py-3 text-husky-red font-medium text-sm bg-white rounded-lg border border-husky-gray-light">
              Load More News
            </button>
          </div>
        )}
      </main>
      
      <NavigationBar />
    </div>
  );
};

export default Explore;
