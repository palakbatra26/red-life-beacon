
import React from 'react';
import { Phone, MapPin, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';

interface UrgentRequestCardProps {
  bloodType: string;
  hospital: string;
  location: string;
  contactName: string;
  contactNumber: string;
  urgency: 'high' | 'medium' | 'low';
}

const UrgentRequestCard: React.FC<UrgentRequestCardProps> = ({
  bloodType,
  hospital,
  location,
  contactName,
  contactNumber,
  urgency
}) => {
  // Define urgency styles
  const getUrgencyStyle = () => {
    switch (urgency) {
      case 'high':
        return 'animate-pulse-urgent bg-red-600';
      case 'medium':
        return 'bg-orange-500';
      case 'low':
        return 'bg-yellow-500';
      default:
        return 'bg-red-600';
    }
  };

  return (
    <Card className="border-l-4 border-red-600 shadow-md">
      <CardHeader className="flex flex-row justify-between items-center pb-2">
        <div className="flex items-center">
          <span className={`inline-block w-8 h-8 rounded-full ${getUrgencyStyle()} text-white font-bold flex items-center justify-center mr-3`}>
            {bloodType}
          </span>
          <div>
            <h3 className="font-bold text-lg">{bloodType} Blood Needed</h3>
            <p className="text-gray-600">{hospital}</p>
          </div>
        </div>
        {urgency === 'high' && (
          <div className="flex items-center text-red-600">
            <AlertTriangle className="h-5 w-5 mr-1" />
            <span className="font-medium">Urgent</span>
          </div>
        )}
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex items-center mb-2">
          <MapPin className="h-4 w-4 mr-2 text-gray-500" />
          <span className="text-gray-700">{location}</span>
        </div>
        <div className="flex items-center">
          <Phone className="h-4 w-4 mr-2 text-gray-500" />
          <span className="text-gray-700">{contactName}: {contactNumber}</span>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between pt-2">
        <Button variant="outline">Share</Button>
        <Button variant="default">Contact Now</Button>
      </CardFooter>
    </Card>
  );
};

export default UrgentRequestCard;
