
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import CampCard from '@/components/CampCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, MapPin, Search } from 'lucide-react';
import { allCamps, cities } from '@/data/camps';

const CampsPage = () => {
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Filter camps based on selected city and search query
  const filteredCamps = allCamps.filter(camp => {
    const matchesCity = selectedCity ? camp.city === selectedCity : true;
    const matchesSearch = searchQuery 
      ? camp.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        camp.location.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    
    return matchesCity && matchesSearch;
  });

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
          <h2 className="text-xl font-semibold text-gray-800">
            {filteredCamps.length} Camps Found
            {selectedCity && ` in ${selectedCity}`}
          </h2>
          
          {/* Camp Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCamps.map(camp => (
              <CampCard key={camp.id} {...camp} />
            ))}
          </div>
          
          {/* No results state */}
          {filteredCamps.length === 0 && (
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
