
import React, { useState } from 'react';
import NavigationBar from '@/components/NavigationBar';
import { Calendar, Users, Book, Map, Clock, ExternalLink, ChevronRight } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

// Sample data with enhanced details
const exploreCategories = [
  {
    id: 'clubs',
    title: 'Clubs & Organizations',
    icon: Users,
    color: 'bg-blue-500',
    items: [
      { 
        name: 'Coding Club', 
        members: 120, 
        image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=60',
        description: 'A community for students passionate about programming and software development. Weekly coding challenges, hackathons, and industry speaker events.',
        link: '/clubs/coding-club'
      },
      { 
        name: 'Data Science Society', 
        members: 95, 
        image: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?w=800&auto=format&fit=crop&q=60',
        description: 'Explore the world of data analysis, machine learning, and AI applications. Regular workshops on Python, R, and visualization tools.',
        link: '/clubs/data-science'
      },
      { 
        name: 'Entrepreneurship Association', 
        members: 85, 
        image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&auto=format&fit=crop&q=60',
        description: 'Connect with like-minded innovators to develop business ideas, pitch to investors, and learn from successful founders.',
        link: '/clubs/entrepreneurship'
      },
      { 
        name: 'Women in Tech', 
        members: 78, 
        image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&auto=format&fit=crop&q=60',
        description: 'Supporting gender diversity in technology fields through mentorship, networking events, and professional development workshops.',
        link: '/clubs/women-in-tech'
      },
    ]
  },
  {
    id: 'events',
    title: 'Upcoming Events',
    icon: Calendar,
    color: 'bg-purple-500',
    items: [
      { 
        name: 'Tech Career Fair', 
        date: 'May 15', 
        time: '10:00 AM - 4:00 PM',
        location: 'Science Center, Main Hall',
        image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&auto=format&fit=crop&q=60',
        description: 'Connect with over 50 tech companies hiring for internships and full-time positions. Bring your resume and dress professionally.',
        link: '/events/tech-career-fair'
      },
      { 
        name: 'AI Workshop', 
        date: 'May 22', 
        time: '2:00 PM - 5:00 PM',
        location: 'Engineering Building, Room 302',
        image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&auto=format&fit=crop&q=60',
        description: 'Hands-on workshop exploring practical applications of artificial intelligence and machine learning models.',
        link: '/events/ai-workshop'
      },
      { 
        name: 'Startup Weekend', 
        date: 'Jun 5-7', 
        time: 'All day',
        location: 'Business School',
        image: 'https://images.unsplash.com/photo-1582213782179-e0d4d3cce817?w=800&auto=format&fit=crop&q=60',
        description: '54-hour event where you\'ll experience the highs, lows, fun, and pressure that make up life at a startup. Form teams and build a business idea from scratch.',
        link: '/events/startup-weekend'
      },
      { 
        name: 'Hackathon 2023', 
        date: 'Jun 12', 
        time: '9:00 AM - 9:00 PM',
        location: 'Computer Science Building',
        image: 'https://images.unsplash.com/photo-1577563908411-5077b6dc7624?w=800&auto=format&fit=crop&q=60',
        description: 'Annual coding competition where teams of up to 4 students build innovative solutions to real-world problems in just 12 hours.',
        link: '/events/hackathon'
      },
    ]
  },
  {
    id: 'communities',
    title: 'Study Groups',
    icon: Book,
    color: 'bg-amber-500',
    items: [
      { 
        name: 'Algorithm Study Group', 
        members: 32, 
        activeMembers: 18,
        topics: ['Data Structures', 'Complexity Analysis', 'Dynamic Programming'],
        image: 'https://images.unsplash.com/photo-1606326608690-4e0281b1e588?w=800&auto=format&fit=crop&q=60',
        description: 'Weekly meetings to solve algorithm problems, prepare for technical interviews, and understand theoretical computer science concepts.',
        link: '/study-groups/algorithms'
      },
      { 
        name: 'Machine Learning Circle', 
        members: 28, 
        activeMembers: 15,
        topics: ['Neural Networks', 'Deep Learning', 'Computer Vision'],
        image: 'https://images.unsplash.com/photo-1526378800651-c32d170fe6f8?w=800&auto=format&fit=crop&q=60',
        description: 'Study group focused on understanding machine learning theory and implementing various models using PyTorch and TensorFlow.',
        link: '/study-groups/machine-learning'
      },
      { 
        name: 'Web Development Squad', 
        members: 45, 
        activeMembers: 30,
        topics: ['React', 'Node.js', 'UI/UX Design'],
        image: 'https://images.unsplash.com/photo-1598257006458-087169a1f08d?w=800&auto=format&fit=crop&q=60',
        description: 'Collaborative group working on web projects, sharing best practices, and learning modern frontend and backend technologies.',
        link: '/study-groups/web-dev'
      },
      { 
        name: 'Mobile App Builders', 
        members: 24, 
        activeMembers: 12,
        topics: ['iOS', 'Android', 'React Native'],
        image: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=800&auto=format&fit=crop&q=60',
        description: 'Create mobile applications while learning about app design, development, and publishing for both iOS and Android platforms.',
        link: '/study-groups/mobile-apps'
      },
    ]
  }
];

const Explore = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  
  return (
    <div className="flex flex-col min-h-screen bg-husky-light">
      <header className="sticky top-0 z-10 flex items-center justify-between bg-white/80 backdrop-blur-md px-6 py-4 border-b border-husky-gray-light">
        <h1 className="text-2xl font-semibold text-husky-black">Explore</h1>
      </header>
      
      <main className="flex-1 p-6 pb-24">
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
                    className="bg-white rounded-xl shadow-subtle overflow-hidden cursor-pointer hover:shadow-medium transition-shadow duration-200"
                    onClick={() => setSelectedItem({ ...item, category: category.id })}
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
                        {category.id === 'clubs' && `${item.members} members`}
                        {category.id === 'events' && `${item.date} • ${item.location}`}
                        {category.id === 'communities' && `${item.activeMembers} active members`}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>
      
      {/* Detail Dialog */}
      <Dialog open={!!selectedItem} onOpenChange={(open) => !open && setSelectedItem(null)}>
        <DialogContent className="sm:max-w-[425px]">
          {selectedItem && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedItem.name}</DialogTitle>
                <DialogDescription>
                  {selectedItem.category === 'clubs' && `${selectedItem.members} members`}
                  {selectedItem.category === 'events' && (
                    <div className="flex flex-col gap-1 mt-1">
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="h-4 w-4 text-husky-gray-dark" />
                        <span>{selectedItem.date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="h-4 w-4 text-husky-gray-dark" />
                        <span>{selectedItem.time}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Map className="h-4 w-4 text-husky-gray-dark" />
                        <span>{selectedItem.location}</span>
                      </div>
                    </div>
                  )}
                  {selectedItem.category === 'communities' && (
                    <div className="mt-2">
                      <div className="flex items-center gap-2 text-sm">
                        <Users className="h-4 w-4 text-husky-gray-dark" />
                        <span>{selectedItem.activeMembers} active out of {selectedItem.members} members</span>
                      </div>
                      <div className="mt-2">
                        <p className="text-sm font-medium">Topics covered:</p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {selectedItem.topics && selectedItem.topics.map((topic, i) => (
                            <span key={i} className="text-xs bg-husky-subtle px-2 py-1 rounded-full">
                              {topic}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </DialogDescription>
              </DialogHeader>
              
              <div className="mt-2">
                <p className="text-sm">{selectedItem.description}</p>
              </div>
              
              <div className="mt-4 flex justify-end">
                <Button 
                  className="flex items-center gap-1"
                  onClick={() => {
                    window.location.href = selectedItem.link;
                  }}
                >
                  <span>Go to {selectedItem.category === 'clubs' ? 'club' : 
                             selectedItem.category === 'events' ? 'event' : 'group'} page</span>
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
      
      <NavigationBar />
    </div>
  );
};

export default Explore;
