
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Star, Clock, ThumbsUp, MessageCircle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const feedbackSchema = z.object({
  replyTime: z.enum(['1', '2', '3', '4', '5']),
  replyQuality: z.enum(['1', '2', '3', '4', '5']),
  additionalFeedback: z.string().optional(),
});

type FeedbackValues = z.infer<typeof feedbackSchema>;

interface FeedbackModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  alumniName: string;
}

const FeedbackModal: React.FC<FeedbackModalProps> = ({ open, onOpenChange, alumniName }) => {
  const form = useForm<FeedbackValues>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: {
      replyTime: '3',
      replyQuality: '3',
      additionalFeedback: '',
    },
  });

  const onSubmit = (values: FeedbackValues) => {
    console.log('Feedback submitted:', values);
    
    // Here you would typically send this data to your backend
    // For now, we'll just show a toast message
    toast({
      title: "Feedback submitted",
      description: "Thank you for your feedback!",
    });
    
    onOpenChange(false);
  };

  const renderStars = (value: string, name: string) => {
    return (
      <div className="flex gap-1 items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <Label
            key={star}
            htmlFor={`${name}-${star}`}
            className={`cursor-pointer p-1 rounded-md transition-colors ${
              parseInt(value) >= star ? 'text-yellow-500' : 'text-gray-300'
            }`}
          >
            <Star className="h-6 w-6 fill-current" />
          </Label>
        ))}
      </div>
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">
            Rate your conversation with {alumniName}
          </DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="replyTime"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    How would you rate the reply time?
                  </FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500">Slow</span>
                        {renderStars(field.value, 'replyTime')}
                        <span className="text-sm text-gray-500">Fast</span>
                      </div>
                      <div className="hidden">
                        {[1, 2, 3, 4, 5].map((value) => (
                          <RadioGroupItem
                            key={value}
                            value={String(value)}
                            id={`replyTime-${value}`}
                          />
                        ))}
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="replyQuality"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel className="flex items-center gap-2">
                    <ThumbsUp className="h-4 w-4" />
                    How would you rate the quality of the responses?
                  </FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500">Poor</span>
                        {renderStars(field.value, 'replyQuality')}
                        <span className="text-sm text-gray-500">Excellent</span>
                      </div>
                      <div className="hidden">
                        {[1, 2, 3, 4, 5].map((value) => (
                          <RadioGroupItem
                            key={value}
                            value={String(value)}
                            id={`replyQuality-${value}`}
                          />
                        ))}
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="additionalFeedback"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <MessageCircle className="h-4 w-4" />
                    Additional comments (optional)
                  </FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Share your thoughts about the conversation..." 
                      {...field} 
                      className="min-h-20"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <DialogFooter className="sm:justify-center gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button type="submit">Submit Feedback</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default FeedbackModal;
