
import * as z from "zod";

// Define the blood groups array
export const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

// Form schema
export const donorFormSchema = z.object({
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

export type DonorFormValues = z.infer<typeof donorFormSchema>;
