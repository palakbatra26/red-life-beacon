
import { DonorFormValues } from "../schemas/donorFormSchema";
import { Camp } from '@/types/camp';

/**
 * Submits donor information to schedule a donation appointment
 */
export const scheduleDonation = async (
  donorInfo: DonorFormValues,
  campDetails: Camp
): Promise<boolean> => {
  try {
    const response = await fetch("https://formspree.io/f/mvgabbqn", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        campDetails: campDetails,
        donorInfo: donorInfo,
        message: `New donation appointment for ${campDetails?.title}`,
      })
    });
    
    return response.ok;
  } catch (error) {
    console.error("Error submitting form:", error);
    return false;
  }
};
