
import React from 'react';
import NavigationBar from '@/components/NavigationBar';
import { Calendar, Award, Coffee, Users, Book, Zap, Globe, Music, Briefcase } from 'lucide-react';
import Logo from '@/components/Logo';

// Sample data - removed job opportunities section
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
];

// Icon mapping
const icons = {
  Users,
  Calendar,
  Briefcase: Briefcase,
  Book,
  Award,
  Coffee,
  Zap,
  Globe,
  Music
};

const Explore = () => {
  return (
    <div className="flex flex-col min-h-screen bg-husky-light">
      <header className="sticky top-0 z-10 flex items-center justify-between bg-white/80 backdrop-blur-md px-6 py-4 border-b border-husky-gray-light">
        <div className="flex items-center">
          <img 
            src="/lovable-uploads/husky-logo.png" 
            alt="Husky Match" 
            className="h-8 w-8 mr-2"
          />
          <h1 className="text-2xl font-semibold text-husky-black">Explore</h1>
        </div>
      </header>
      
      <main className="flex-1 p-6 pb-24">
        <div className="space-y-8">
          {exploreCategories.map((category) => (
            <div key={category.id} className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className={`p-1.5 rounded-lg ${category.color} text-white`}>
                  <category.icon className="h-5 w-5" />
                </div>
                <h2 className="text-lg font-semibold text-husky-black">{category.title}</h2>
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
                         'date' in item ? item.date : ''}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>
      
      <NavigationBar />
    </div>
  );
};

export default Explore;
