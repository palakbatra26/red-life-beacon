
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import UrgentRequestCard from '@/components/UrgentRequestCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter } from 'lucide-react';

// Sample data for urgent blood requests
const allRequests = [
  {
    id: 1,
    bloodType: 'A+',
    hospital: 'Guru Nanak Hospital',
    location: 'Ludhiana, Punjab',
    contactName: 'Dr. Singh',
    contactNumber: '98765-43210',
    urgency: 'high' as const
  },
  {
    id: 2,
    bloodType: 'O-',
    hospital: 'Civil Hospital',
    location: 'Fazilka, Punjab',
    contactName: 'Dr. Kaur',
    contactNumber: '98765-43211',
    urgency: 'high' as const
  },
  {
    id: 3,
    bloodType: 'B+',
    hospital: 'Apollo Hospital',
    location: 'Delhi',
    contactName: 'Dr. Sharma',
    contactNumber: '98765-43212',
    urgency: 'medium' as const
  },
  {
    id: 4,
    bloodType: 'AB-',
    hospital: 'Fortis Hospital',
    location: 'Mumbai',
    contactName: 'Dr. Patel',
    contactNumber: '98765-43213',
    urgency: 'high' as const
  },
  {
    id: 5,
    bloodType: 'B-',
    hospital: 'City Hospital',
    location: 'Bangalore',
    contactName: 'Dr. Reddy',
    contactNumber: '98765-43214',
    urgency: 'medium' as const
  },
  {
    id: 6,
    bloodType: 'A-',
    hospital: 'AIIMS',
    location: 'Delhi',
    contactName: 'Dr. Gupta',
    contactNumber: '98765-43215',
    urgency: 'low' as const
  }
];

// Blood types
const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

// Cities
const cities = [...new Set(allRequests.map(request => request.location.split(',')[0].trim()))].sort();

const UrgentNeedPage = () => {
  const [selectedBloodType, setSelectedBloodType] = useState<string>('');
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Filter requests based on selected filters and search query
  const filteredRequests = allRequests.filter(request => {
    const matchesBloodType = selectedBloodType ? request.bloodType === selectedBloodType : true;
    const matchesCity = selectedCity ? request.location.includes(selectedCity) : true;
    const matchesSearch = searchQuery 
      ? request.hospital.toLowerCase().includes(searchQuery.toLowerCase()) || 
        request.location.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    
    return matchesBloodType && matchesCity && matchesSearch;
  });

  // Sort with high urgency first
  const sortedRequests = [...filteredRequests].sort((a, b) => {
    const urgencyOrder = { high: 0, medium: 1, low: 2 };
    return urgencyOrder[a.urgency] - urgencyOrder[b.urgency];
  });

  return (
    <Layout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Urgent Blood Requests</h1>
          <p className="mt-2 text-gray-600">Help save lives by responding to urgent blood requests</p>
        </div>
        
        {/* Filters */}
        <div className="mb-8 bg-white p-4 rounded-lg shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Blood Type Filter */}
            <div className="flex flex-col">
              <label className="mb-1 text-sm font-medium text-gray-700">Blood Type</label>
              <Select value={selectedBloodType} onValueChange={setSelectedBloodType}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="All Blood Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Blood Types</SelectItem>
                  {bloodTypes.map(type => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            {/* City Filter */}
            <div className="flex flex-col">
              <label className="mb-1 text-sm font-medium text-gray-700">City</label>
              <Select value={selectedCity} onValueChange={setSelectedCity}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="All Cities" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Cities</SelectItem>
                  {cities.map(city => (
                    <SelectItem key={city} value={city}>{city}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            {/* Search */}
            <div className="flex flex-col">
              <label className="mb-1 text-sm font-medium text-gray-700">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search hospitals or locations"
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>
          
          {/* Additional filters */}
          <div className="mt-4 flex items-center">
            <Button 
              variant="outline" 
              size="sm" 
              className="mr-2"
              onClick={() => {
                setSelectedBloodType('');
                setSelectedCity('');
                setSearchQuery('');
              }}
            >
              Reset Filters
            </Button>
            
            <div className="ml-auto flex items-center text-sm text-gray-600">
              <Filter className="h-4 w-4 mr-1" />
              <span>
                <span className="font-medium text-red-600">{filteredRequests.length}</span> requests found
              </span>
            </div>
          </div>
        </div>
        
        {/* Request Cards */}
        <div className="space-y-6">
          {sortedRequests.map(request => (
            <UrgentRequestCard key={request.id} {...request} />
          ))}
          
          {/* No results state */}
          {sortedRequests.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium text-gray-900 mb-2">No urgent requests found</h3>
              <p className="text-gray-600">Try adjusting your filters or search query</p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => {
                  setSelectedBloodType('');
                  setSelectedCity('');
                  setSearchQuery('');
                }}
              >
                Reset Filters
              </Button>
            </div>
          )}
        </div>
        
        {/* CTA Section */}
        <div className="mt-12 bg-primary text-white p-6 rounded-lg text-center">
          <h2 className="text-2xl font-bold mb-2">Want to help save lives?</h2>
          <p className="mb-4">Register as a blood donor and be notified when your blood type is needed.</p>
          <Button 
            variant="secondary" 
            size="lg" 
            className="bg-white text-primary hover:bg-gray-100"
            onClick={() => window.location.href = '/register-donor'}
          >
            Register as a Donor
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default UrgentNeedPage;
