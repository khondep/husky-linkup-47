
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from '@/hooks/use-toast';
import { ArrowRight, ChevronDown, Plus, Upload, User, X } from 'lucide-react';

const profileSetupSchema = z.object({
  about: z.string().min(10, 'Please write at least 10 characters about yourself').max(500, 'Bio must be less than 500 characters'),
  major: z.string().min(2, 'Please enter your major'),
  jobTitle: z.string().optional(),
  skills: z.string().optional(),
  interests: z.string().optional(),
  location: z.string().optional(),
});

type ProfileSetupValues = z.infer<typeof profileSetupSchema>;

// Predefined lists of common options
const commonSkills = [
  "JavaScript", "Python", "Java", "C++", "React", "Angular", "Vue.js", 
  "Node.js", "Express", "MongoDB", "SQL", "Data Analysis", "Machine Learning",
  "UI/UX Design", "Project Management", "Public Speaking", "Leadership",
  "Problem Solving", "Critical Thinking", "Communication"
];

const commonInterests = [
  "Reading", "Writing", "Hiking", "Traveling", "Photography", "Music", 
  "Art", "Movies", "Gaming", "Cooking", "Fitness", "Sports", "Technology",
  "Volunteering", "Gardening", "Fashion", "Dance", "Theater", "DIY Projects"
];

const ProfileSetup = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [newSkill, setNewSkill] = useState('');
  const [newInterest, setNewInterest] = useState('');
  
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

  const addSkill = (skill: string) => {
    if (skill && !selectedSkills.includes(skill)) {
      setSelectedSkills([...selectedSkills, skill]);
      form.setValue('skills', [...selectedSkills, skill].join(', '));
      setNewSkill('');
    }
  };

  const removeSkill = (skill: string) => {
    const updated = selectedSkills.filter(s => s !== skill);
    setSelectedSkills(updated);
    form.setValue('skills', updated.join(', '));
  };

  const addInterest = (interest: string) => {
    if (interest && !selectedInterests.includes(interest)) {
      setSelectedInterests([...selectedInterests, interest]);
      form.setValue('interests', [...selectedInterests, interest].join(', '));
      setNewInterest('');
    }
  };

  const removeInterest = (interest: string) => {
    const updated = selectedInterests.filter(i => i !== interest);
    setSelectedInterests(updated);
    form.setValue('interests', updated.join(', '));
  };
  
  const onSubmit = async (data: ProfileSetupValues) => {
    setIsLoading(true);
    
    try {
      // Simulate API call for saving profile data
      setTimeout(() => {
        console.log('Profile data:', {
          ...data,
          skills: selectedSkills,
          interests: selectedInterests,
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
                    <FormLabel>Skills</FormLabel>
                    <div className="space-y-2">
                      <div className="flex flex-wrap gap-2 mb-2">
                        {selectedSkills.map((skill, index) => (
                          <div 
                            key={index}
                            className="bg-gray-100 text-gray-800 text-sm px-3 py-1 rounded-full flex items-center"
                          >
                            {skill}
                            <button 
                              type="button" 
                              onClick={() => removeSkill(skill)}
                              className="ml-1.5 text-gray-500 hover:text-gray-700"
                            >
                              <X className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>

                      <div className="flex gap-2">
                        <div className="flex-1">
                          <Input 
                            placeholder="Add a skill..."
                            value={newSkill}
                            onChange={(e) => setNewSkill(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter' && newSkill) {
                                e.preventDefault();
                                addSkill(newSkill);
                              }
                            }}
                          />
                        </div>

                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline" type="button">
                              <ChevronDown className="h-4 w-4 mr-2" />
                              Select
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-[200px] max-h-[300px] overflow-y-auto">
                            {commonSkills.map((skill, idx) => (
                              <DropdownMenuItem 
                                key={idx} 
                                onClick={() => addSkill(skill)}
                                disabled={selectedSkills.includes(skill)}
                                className={selectedSkills.includes(skill) ? "opacity-50" : ""}
                              >
                                {skill}
                              </DropdownMenuItem>
                            ))}
                          </DropdownMenuContent>
                        </DropdownMenu>

                        <Button 
                          type="button" 
                          variant="outline" 
                          size="icon"
                          onClick={() => addSkill(newSkill)}
                          disabled={!newSkill}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      <input type="hidden" {...field} />
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="interests"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Interests</FormLabel>
                    <div className="space-y-2">
                      <div className="flex flex-wrap gap-2 mb-2">
                        {selectedInterests.map((interest, index) => (
                          <div 
                            key={index}
                            className="bg-gray-100 text-gray-800 text-sm px-3 py-1 rounded-full flex items-center"
                          >
                            {interest}
                            <button 
                              type="button" 
                              onClick={() => removeInterest(interest)}
                              className="ml-1.5 text-gray-500 hover:text-gray-700"
                            >
                              <X className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                      
                      <div className="flex gap-2">
                        <div className="flex-1">
                          <Input 
                            placeholder="Add an interest..."
                            value={newInterest}
                            onChange={(e) => setNewInterest(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter' && newInterest) {
                                e.preventDefault();
                                addInterest(newInterest);
                              }
                            }}
                          />
                        </div>

                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline" type="button">
                              <ChevronDown className="h-4 w-4 mr-2" />
                              Select
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-[200px] max-h-[300px] overflow-y-auto">
                            {commonInterests.map((interest, idx) => (
                              <DropdownMenuItem 
                                key={idx} 
                                onClick={() => addInterest(interest)}
                                disabled={selectedInterests.includes(interest)}
                                className={selectedInterests.includes(interest) ? "opacity-50" : ""}
                              >
                                {interest}
                              </DropdownMenuItem>
                            ))}
                          </DropdownMenuContent>
                        </DropdownMenu>

                        <Button 
                          type="button" 
                          variant="outline" 
                          size="icon"
                          onClick={() => addInterest(newInterest)}
                          disabled={!newInterest}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      <input type="hidden" {...field} />
                    </div>
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
