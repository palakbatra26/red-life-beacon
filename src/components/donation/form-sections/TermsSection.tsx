
import React from 'react';
import { 
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { UseFormReturn } from 'react-hook-form';
import { DonorFormValues } from '../schemas/donorFormSchema';

interface TermsSectionProps {
  form: UseFormReturn<DonorFormValues>;
}

const TermsSection = ({ form }: TermsSectionProps) => {
  return (
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
  );
};

export default TermsSection;
