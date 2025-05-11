
import React from 'react';
import { Calendar, MapPin } from 'lucide-react';
import { Camp } from '@/types/camp';

interface CampDetailsCardProps {
  campDetails: Camp;
}

const CampDetailsCard = ({ campDetails }: CampDetailsCardProps) => {
  return (
    <div className="bg-accent p-4 rounded-lg mb-8">
      <h2 className="font-semibold text-xl mb-2">{campDetails.title}</h2>
      <p className="text-sm text-gray-600">{campDetails.organizer}</p>
      <div className="flex items-center mt-2 text-sm">
        <Calendar className="h-4 w-4 mr-2 text-gray-500" />
        <span>{campDetails.date} • {campDetails.time}</span>
      </div>
      <div className="flex items-center mt-1 text-sm">
        <MapPin className="h-4 w-4 mr-2 text-gray-500" />
        <span>{campDetails.location}, {campDetails.city}</span>
      </div>
    </div>
  );
};

export default CampDetailsCard;
