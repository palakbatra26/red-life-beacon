
import React from 'react';
import { 
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from '@/components/ui/textarea';
import { UseFormReturn } from 'react-hook-form';
import { DonorFormValues } from '../schemas/donorFormSchema';

interface MedicalInfoSectionProps {
  form: UseFormReturn<DonorFormValues>;
}

const MedicalInfoSection = ({ form }: MedicalInfoSectionProps) => {
  return (
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
  );
};

export default MedicalInfoSection;
