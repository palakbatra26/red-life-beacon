import React from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format } from 'date-fns';
import { Camp } from '@/types/camp';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription
} from "@/components/ui/form";
import { CalendarIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

// Form schema
const formSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  bloodGroup: z.string().min(1, "Blood group is required"),
  preferredTime: z.date(),
  medicalInfo: z.string().optional(),
  agreeToTerms: z.boolean().refine(val => val === true, {
    message: "You must agree to the terms and conditions"
  })
});

export type DonorFormValues = z.infer<typeof formSchema>;

interface DonorInfoFormProps {
  campDetails: Camp;
  onSubmitSuccess?: () => void;
}

const DonorInfoForm = ({ campDetails, onSubmitSuccess }: DonorInfoFormProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Form
  const form = useForm<DonorFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      bloodGroup: "",
      medicalInfo: "",
      agreeToTerms: false
    }
  });

  // Handle form submission
  const onSubmit = async (data: DonorFormValues) => {
    console.log("Form data:", data);
    
    // Send notification via Formspree
    try {
      const response = await fetch("https://formspree.io/f/mvgabbqn", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          campDetails: campDetails,
          donorInfo: data,
          message: `New donation appointment for ${campDetails?.title} on ${format(data.preferredTime, "PPP")}`,
        })
      });
      
      if (response.ok) {
        toast({
          title: "Donation Appointment Scheduled!",
          description: "Thank you for scheduling your donation. We'll contact you shortly to confirm the details.",
        });
        
        setTimeout(() => {
          navigate('/profile');
        }, 2000);

        if (onSubmitSuccess) {
          onSubmitSuccess();
        }
      } else {
        toast({
          title: "Error",
          description: "There was a problem scheduling your donation. Please try again.",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Error",
        description: "There was a problem scheduling your donation. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your first name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your last name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="your@email.com" type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your phone number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="bloodGroup"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Blood Group</FormLabel>
                  <Select 
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your blood group" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {bloodGroups.map((group) => (
                        <SelectItem key={group} value={group}>
                          {group}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="preferredTime"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Preferred Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={
                            "w-full pl-3 text-left font-normal"
                          }
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span className="text-muted-foreground">Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date < new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="medicalInfo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Medical Information (Optional)</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Any medical conditions or medications we should know about"
                    className="h-24"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  This information will be kept confidential and only used for donor eligibility assessment.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="agreeToTerms"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                    checked={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>
                    I confirm that I am eligible to donate blood and consent to the donation process
                  </FormLabel>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          <div className="pt-2">
            <Button type="submit" className="w-full" size="lg">
              Schedule Donation
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default DonorInfoForm;
