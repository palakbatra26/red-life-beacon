
import React from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Camp } from '@/types/camp';
import { Button } from '@/components/ui/button';
import { Form } from "@/components/ui/form";
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { donorFormSchema, DonorFormValues } from './schemas/donorFormSchema';
import PersonalInfoSection from './form-sections/PersonalInfoSection';
import BloodInfoSection from './form-sections/BloodInfoSection';
import MedicalInfoSection from './form-sections/MedicalInfoSection';
import TermsSection from './form-sections/TermsSection';
import { scheduleDonation } from './services/donationService';

interface DonorInfoFormProps {
  campDetails: Camp;
  onSubmitSuccess?: () => void;
}

const DonorInfoForm = ({ campDetails, onSubmitSuccess }: DonorInfoFormProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Form
  const form = useForm<DonorFormValues>({
    resolver: zodResolver(donorFormSchema),
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
    
    try {
      const success = await scheduleDonation(data, campDetails);
      
      if (success) {
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
          <PersonalInfoSection form={form} />
          <BloodInfoSection form={form} />
          <MedicalInfoSection form={form} />
          <TermsSection form={form} />
          
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
