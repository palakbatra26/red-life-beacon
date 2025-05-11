
export interface Camp {
  id: number;
  title: string;
  organizer: string;
  date: string;
  time: string;
  location: string;
  city: string;
  phone: string;
  imageUrl?: string;
  description?: string;
  bloodTypesNeeded?: string[];
}
