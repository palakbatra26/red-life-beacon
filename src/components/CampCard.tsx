
import React from 'react';
import { Calendar, MapPin, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

interface CampCardProps {
  title: string;
  organizer: string;
  date: string;
  time: string;
  location: string;
  city: string;
}

const CampCard: React.FC<CampCardProps> = ({
  title,
  organizer,
  date,
  time,
  location,
  city
}) => {
  return (
    <Card className="w-full transition-all duration-300 hover:shadow-lg">
      <CardHeader className="bg-primary text-white rounded-t-lg">
        <CardTitle>{title}</CardTitle>
        <CardDescription className="text-gray-100">Organized by {organizer}</CardDescription>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="space-y-3">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-2 text-gray-500" />
            <span>{date}</span>
          </div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-2 text-gray-500" />
            <span>{time}</span>
          </div>
          <div className="flex items-center">
            <MapPin className="h-4 w-4 mr-2 text-gray-500" />
            <span>{location}, {city}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end pt-2">
        <Button variant="default">Donate Now</Button>
      </CardFooter>
    </Card>
  );
};

export default CampCard;
