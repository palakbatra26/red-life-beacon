
import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import CampCard from '@/components/CampCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, MapPin, Search, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface Camp {
  id: string;  // Keep as string to match backend, we'll convert when needed
  title: string;
  organizer: string;
  date: string;
  time: string;
  location: string;
  city: string;
  description?: string;
  imageUrl?: string;
  phone?: string; // Add missing phone field
}

// List of cities for the filter
const cities = [
  'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Ahmedabad',
  'Chennai', 'Kolkata', 'Pune', 'Jaipur', 'Lucknow'
];

// Static camps data
const staticCamps: Camp[] = [
  {
    id: '1',
    title: 'Mega Blood Donation Camp',
    organizer: 'Red Cross Society',
    date: '2025-05-15',
    time: '09:00',
    city: 'Mumbai',
    location: 'City Center Mall, Andheri East',
    description: 'Join us for a mega blood donation drive. All blood types are welcome.',
    phone: '1800-123-4567'
  },
  {
    id: '2',
    title: 'Save Lives Blood Drive',
    organizer: 'Lions Club',
    date: '2025-05-20',
    time: '10:00',
    city: 'Delhi',
    location: 'Community Hall, Connaught Place',
    description: 'Your one donation can save up to three lives. Join us in this noble cause.',
    phone: '1800-234-5678'
  },
  {
    id: '3',
    title: 'Blood Donation Camp by Rotaract',
    organizer: 'Rotaract Club',
    date: '2025-05-25',
    time: '11:00',
    city: 'Bangalore',
    location: 'Town Hall, MG Road',
    description: 'Be a hero, donate blood. Refreshments will be provided.',
    phone: '1800-345-6789'
  },
  {
    id: '4',
    title: 'Emergency Blood Donation Camp',
    organizer: 'Help Foundation',
    date: '2025-04-28',
    time: '08:00',
    city: 'Mumbai',
    location: 'Public Ground, Bandra West',
    description: 'Urgent need for O- blood type. Your donation is crucial.',
    phone: '1800-456-7890'
  },
  {
    id: '5',
    title: 'Community Blood Donation Drive',
    organizer: 'Local Community Group',
    date: '2025-04-30',
    time: '10:00',
    city: 'Pune',
    location: 'Community Center, Kothrud',
    description: 'Join hands to save lives. All donors will receive a certificate of appreciation.',
    phone: '1800-567-8901'
  },
  {
    id: '6',
    title: 'Corporate Blood Donation Camp',
    organizer: 'Tech Solutions Inc.',
    date: '2025-06-05',
    time: '09:30',
    city: 'Hyderabad',
    location: 'Office Premises, Hitech City',
    description: 'Exclusive for employees and their families. Refreshments and goodies provided.',
    phone: '1800-678-9012'
  }
];

const CampsPage = () => {
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [camps, setCamps] = useState<Camp[]>(staticCamps);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  // Separate camps into upcoming and past
  const now = new Date();
  now.setHours(0, 0, 0, 0); // Normalize to start of day for accurate date comparison
  
  const { upcomingCamps, pastCamps } = camps.reduce<{ 
    upcomingCamps: Camp[]; 
    pastCamps: Camp[] 
  }>((acc, camp) => {
    const campDate = new Date(camp.date);
    campDate.setHours(0, 0, 0, 0); // Normalize to start of day
    
    if (campDate >= now) {
      acc.upcomingCamps.push(camp);
    } else {
      acc.pastCamps.push(camp);
    }
    return acc;
  }, { upcomingCamps: [], pastCamps: [] });
  
  // Sort upcoming camps by date (earliest first)
  upcomingCamps.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  
  // Sort past camps by date (newest first)
  pastCamps.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  
  // Filter camps based on selected city and search query
  const filterCamps = (campList: Camp[]) => {
    return campList.filter(camp => {
      const matchesCity = selectedCity ? camp.city === selectedCity : true;
      const matchesSearch = searchQuery 
        ? camp.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
          (camp.location && camp.location.toLowerCase().includes(searchQuery.toLowerCase()))
        : true;
      
      return matchesCity && matchesSearch;
    });
  };
  
  const filteredUpcomingCamps = filterCamps(upcomingCamps);
  const filteredPastCamps = filterCamps(pastCamps);

  return (
    <Layout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Blood Donation Camps</h1>
          <p className="mt-2 text-gray-600">Find and register for blood donation camps near you</p>
        </div>
        
        {/* Filters */}
        <div className="mb-8 bg-white p-4 rounded-lg shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* City filter */}
            <div className="flex flex-col">
              <label className="mb-1 text-sm font-medium text-gray-700">Select City</label>
              <Select value={selectedCity} onValueChange={setSelectedCity}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="All Cities" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-cities">All Cities</SelectItem>
                  {cities.map(city => (
                    <SelectItem key={city} value={city}>{city}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            {/* Search */}
            <div className="flex flex-col md:col-span-2">
              <label className="mb-1 text-sm font-medium text-gray-700">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search by location or name"
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>
          
          {/* Additional filters - can be expanded */}
          <div className="mt-4 flex flex-wrap gap-2">
            <Button variant="outline" size="sm" className="flex items-center">
              <Calendar className="mr-1 h-4 w-4" />
              This Week
            </Button>
            <Button variant="outline" size="sm" className="flex items-center">
              <Calendar className="mr-1 h-4 w-4" />
              This Month
            </Button>
            <Button variant="outline" size="sm" className="flex items-center">
              <MapPin className="mr-1 h-4 w-4" />
              Near Me
            </Button>
          </div>
        </div>
        
        {/* Results */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            Upcoming Camps
            {selectedCity && ` in ${selectedCity}`}
            <span className="ml-2 text-sm font-normal text-gray-500">
              ({filteredUpcomingCamps.length} found)
            </span>
          </h2>
          
          {/* Loading and error states */}
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <span className="ml-2">Loading camps...</span>
            </div>
          ) : error ? (
            <div className="text-center py-8">
              <p className="text-red-500">{error}</p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => window.location.reload()}
              >
                Retry
              </Button>
            </div>
          ) : (
            <>
              {/* Camp Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredUpcomingCamps.length > 0 ? (
                  filteredUpcomingCamps.map(camp => (
                    <CampCard 
                      key={camp.id} 
                      {...camp} 
                      id={parseInt(camp.id, 10) || 0}
                    />
                  ))
                ) : (
                  <div className="col-span-3 text-center py-8">
                    <p>No upcoming camps found matching your criteria.</p>
                    <Button 
                      variant="ghost" 
                      className="mt-2"
                      onClick={() => {
                        setSelectedCity('');
                        setSearchQuery('');
                      }}
                    >
                      Clear filters
                    </Button>
                  </div>
                )}
              </div>
            </>
          )}
          
          {/* Past Camps Section */}
          {filteredPastCamps.length > 0 && (
            <div className="mt-16">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">
                Past Camps
                <span className="ml-2 text-sm font-normal text-gray-500">
                  ({filteredPastCamps.length} past events)
                </span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 opacity-75">
                {filteredPastCamps.map(camp => (
                  <CampCard 
                    key={camp.id} 
                    {...camp} 
                    id={parseInt(camp.id, 10) || 0}
                  />
                ))}
              </div>
            </div>
          )}
          
          {/* No results state */}
          {filteredUpcomingCamps.length === 0 && filteredPastCamps.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium text-gray-900 mb-2">No camps found</h3>
              <p className="text-gray-600">Try adjusting your filters or search query</p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => {
                  setSelectedCity('');
                  setSearchQuery('');
                }}
              >
                Reset Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default CampsPage;
