
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from '@/hooks/use-toast';
import { ArrowRight, Upload, User } from 'lucide-react';

const profileSetupSchema = z.object({
  about: z.string().min(10, 'Please write at least 10 characters about yourself').max(500, 'Bio must be less than 500 characters'),
  major: z.string().min(2, 'Please enter your major'),
  jobTitle: z.string().optional(),
  skills: z.string().optional(),
  interests: z.string().optional(),
  location: z.string().optional(),
});

type ProfileSetupValues = z.infer<typeof profileSetupSchema>;

const ProfileSetup = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  
  const form = useForm<ProfileSetupValues>({
    resolver: zodResolver(profileSetupSchema),
    defaultValues: {
      about: '',
      major: '',
      jobTitle: '',
      skills: '',
      interests: '',
      location: '',
    },
  });
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProfileImage(file);
      
      // Create a preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const onSubmit = async (data: ProfileSetupValues) => {
    setIsLoading(true);
    
    // Convert comma-separated strings to arrays
    const skills = data.skills ? data.skills.split(',').map(skill => skill.trim()) : [];
    const interests = data.interests ? data.interests.split(',').map(interest => interest.trim()) : [];
    
    try {
      // Simulate API call for saving profile data
      setTimeout(() => {
        console.log('Profile data:', {
          ...data,
          skills,
          interests,
          profileImage: profileImage ? profileImage.name : 'No image uploaded'
        });
        
        setIsLoading(false);
        toast({
          title: "Profile setup complete!",
          description: "Your profile has been created successfully",
        });
        navigate('/home');
      }, 1000);
    } catch (error) {
      setIsLoading(false);
      toast({
        title: "Something went wrong",
        description: "Please try again later",
        variant: "destructive",
      });
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col p-6 bg-gray-50">
      <div className="flex-1 flex flex-col max-w-md mx-auto w-full">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900">Complete Your Profile</h1>
          <p className="text-gray-600 mt-1">Tell us more about yourself to get better matches</p>
        </div>
        
        <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="h-24 w-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden border-2 border-husky-red">
                {imagePreview ? (
                  <img 
                    src={imagePreview} 
                    alt="Profile preview" 
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <User className="h-12 w-12 text-gray-400" />
                )}
              </div>
              <label 
                htmlFor="profile-image"
                className="absolute -bottom-1 -right-1 bg-husky-red text-white p-1.5 rounded-full cursor-pointer hover:bg-husky-red/90 transition-colors"
              >
                <Upload className="h-4 w-4" />
                <span className="sr-only">Upload profile picture</span>
              </label>
              <input 
                id="profile-image"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </div>
          </div>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="about"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>About Me</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Tell others about yourself, your background, interests, and what you're looking for..." 
                        className="min-h-[100px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="major"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Major</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Computer Science" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="jobTitle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Job Title (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Software Engineer" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="skills"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Skills (Optional)</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="e.g. Python, Data Analysis, Public Speaking (comma separated)" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="interests"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Interests (Optional)</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="e.g. Hiking, Reading, Photography (comma separated)" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Boston, MA" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button
                type="submit"
                className="w-full"
                size="lg"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Saving Profile...</span>
                  </div>
                ) : (
                  <div className="flex items-center">
                    <span>Continue to Husky Match</span>
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </div>
                )}
              </Button>
              
              <p className="text-center text-sm text-gray-500">
                You can always update your profile information later
              </p>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ProfileSetup;
