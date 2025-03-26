
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";

interface Rating {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
}

interface RecentFeedbackCardProps {
  ratings: Rating[];
  onViewAllClick: () => void;
}

const RecentFeedbackCard: React.FC<RecentFeedbackCardProps> = ({ 
  ratings, 
  onViewAllClick 
}) => {
  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Recent Feedback</CardTitle>
        <CardDescription>Ratings and comments from your mentees</CardDescription>
      </CardHeader>
      <CardContent>
        {ratings.map((rating) => (
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
          onClick={onViewAllClick}
        >
          View All Feedback
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RecentFeedbackCard;
