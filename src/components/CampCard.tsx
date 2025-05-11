
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, Phone, Share2 } from 'lucide-react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/components/ui/use-toast';

interface CampCardProps {
  id: number;
  title: string;
  organizer: string;
  date: string;
  time: string;
  location: string;
  city: string;
  phone?: string;
}

const CampCard = ({
  id,
  title,
  organizer,
  date,
  time,
  location,
  city,
  phone = "1800-123-4567" // Default phone number if not provided
}: CampCardProps) => {
  const { toast } = useToast();

  const handleShare = (platform: string) => {
    const shareText = `Join blood donation camp: ${title} by ${organizer} on ${date} at ${location}, ${city}`;
    const shareUrl = window.location.href;

    switch (platform) {
      case 'whatsapp':
        window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`, '_blank');
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`, '_blank');
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`, '_blank');
        break;
      case 'copy':
        navigator.clipboard.writeText(shareText + ' ' + shareUrl)
          .then(() => {
            toast({
              title: "Link Copied!",
              description: "The camp details have been copied to your clipboard.",
            });
          })
          .catch(() => {
            toast({
              title: "Failed to Copy",
              description: "Could not copy the link. Please try again.",
              variant: "destructive",
            });
          });
        break;
      default:
        break;
    }
  };

  const handleCallNow = () => {
    window.location.href = `tel:${phone}`;
  };

  return (
    <Card className="overflow-hidden transition-shadow hover:shadow-md">
      <div className="bg-red-100 text-primary p-4">
        <h3 className="font-semibold text-lg truncate">{title}</h3>
        <p className="text-sm">{organizer}</p>
      </div>
      
      <CardContent className="p-4 space-y-3">
        <div className="flex items-center text-sm">
          <Calendar className="h-4 w-4 mr-2 text-gray-500" />
          <span>
            {date} • {time}
          </span>
        </div>
        <div className="flex items-center text-sm">
          <MapPin className="h-4 w-4 mr-2 text-gray-500" />
          <span className="truncate">{location}, {city}</span>
        </div>
        {phone && (
          <div className="flex items-center text-sm">
            <Phone className="h-4 w-4 mr-2 text-gray-500" />
            <span className="truncate">{phone}</span>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="p-4 pt-0 flex justify-between gap-2">
        <Button asChild className="flex-1">
          <Link to={`/donate/${id}`}>Donate Now</Link>
        </Button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <Share2 className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => handleShare('whatsapp')}>
              Share to WhatsApp
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleShare('facebook')}>
              Share to Facebook
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleShare('twitter')}>
              Share to Twitter
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleShare('copy')}>
              Copy Link
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
        <Button variant="outline" size="icon" onClick={handleCallNow}>
          <Phone className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CampCard;
