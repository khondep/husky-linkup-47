
// Sample data for connection requests
export const connectionRequests = [
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
export const messages = [
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
export const performanceData = {
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
