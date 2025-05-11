import React, { useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import { UserRound, Calendar, MapPin, Award, AlertTriangle, Mail, Phone, Droplet } from 'lucide-react';
import Layout from '../components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

interface Donation {
  id: string;
  date: string;
  location: string;
  bloodGroup: string;
  units: number;
}

interface UserMetadata {
  bloodGroup?: string;
  city?: string;
  phone?: string;
  lastDonation?: string;
  donationsCount?: number;
  donationHistory?: Donation[];
}

const ProfilePage = () => {
  const { user, isLoaded } = useUser();
  const [donationHistory, setDonationHistory] = useState<Donation[]>([]);
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    bloodGroup: 'Not specified',
    city: 'Not specified',
    phone: 'Not specified',
    joinDate: new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }),
    donationsCount: 0,
    lastDonation: 'Never'
  });

  useEffect(() => {
    if (isLoaded && user) {
      const firstName = user.firstName || '';
      const lastName = user.lastName || '';
      const fullName = `${firstName} ${lastName}`.trim() || 'User';
      
      const metadata = user.unsafeMetadata as UserMetadata || {};
      
      setUserData({
        name: fullName,
        email: user.primaryEmailAddress?.emailAddress || '',
        bloodGroup: metadata.bloodGroup || 'Not specified',
        city: metadata.city || 'Not specified',
        phone: user.phoneNumbers[0]?.phoneNumber || 'Not specified',
        joinDate: user.createdAt 
          ? new Date(user.createdAt).toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })
          : new Date().toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            }),
        donationsCount: metadata.donationsCount || 0,
        lastDonation: metadata.lastDonation || 'Never'
      });

      setDonationHistory(metadata.donationHistory || []);
    }
  }, [user, isLoaded]);

  const formatDate = (dateString: string): string => {
    if (!dateString) return 'Date not available';
    
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return 'Invalid date';
      
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Date format error';
    }
  };

  if (!isLoaded) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </Layout>
    );
  }

  if (!user) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Please sign in to view your profile</h2>
            <p>You need to be signed in to access this page.</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile Sidebar */}
            <div className="lg:col-span-1">
              <Card className="h-full">
                <CardHeader className="bg-primary/5 p-6">
                  <div className="flex flex-col items-center space-y-4">
                    <Avatar className="h-24 w-24">
                      <AvatarImage src={user.imageUrl} alt={userData.name} />
                      <AvatarFallback>
                        {userData.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="text-center">
                      <h2 className="text-xl font-semibold">{userData.name}</h2>
                      <p className="text-muted-foreground">{userData.email}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-medium">Personal Information</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center space-x-2">
                        <Droplet className="h-4 w-4 text-red-500" />
                        <span className="text-muted-foreground">Blood Group:</span>
                        <span className="font-medium">{userData.bloodGroup}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4 text-blue-500" />
                        <span className="text-muted-foreground">Location:</span>
                        <span className="font-medium">{userData.city}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Phone className="h-4 w-4 text-green-500" />
                        <span className="text-muted-foreground">Phone:</span>
                        <span className="font-medium">{userData.phone}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-purple-500" />
                        <span className="text-muted-foreground">Member Since:</span>
                        <span className="font-medium">{userData.joinDate}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-medium">Donation Stats</h3>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="bg-muted/50 p-3 rounded-lg text-center">
                        <p className="text-2xl font-bold">{userData.donationsCount}</p>
                        <p className="text-xs text-muted-foreground">Total Donations</p>
                      </div>
                      <div className="bg-muted/50 p-3 rounded-lg text-center">
                        <p className="text-2xl font-bold">{userData.lastDonation}</p>
                        <p className="text-xs text-muted-foreground">Last Donation</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Donation History</CardTitle>
                </CardHeader>
                <CardContent>
                  {donationHistory.length > 0 ? (
                    <div className="space-y-4">
                      {donationHistory.map((donation) => (
                        <div key={donation.id} className="border rounded-lg p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-medium">{donation.location}</h4>
                              <p className="text-sm text-muted-foreground">
                                {formatDate(donation.date)}
                              </p>
                            </div>
                            <Badge variant="outline" className="flex items-center gap-1">
                              <Droplet className="h-3 w-3 text-red-500" />
                              {donation.bloodGroup}
                            </Badge>
                          </div>
                          <div className="mt-2 text-sm">
                            <span className="text-muted-foreground">Units Donated:</span>{' '}
                            <span className="font-medium">{donation.units}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <div className="mx-auto h-16 w-16 text-muted-foreground mb-4">
                        <Award className="h-full w-full" />
                      </div>
                      <h3 className="text-lg font-medium mb-1">No donation history</h3>
                      <p className="text-sm text-muted-foreground">
                        Your donation history will appear here once you make a donation.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Notifications</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4 p-4 bg-muted/50 rounded-lg">
                      <div className="flex-shrink-0">
                        <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center">
                          <AlertTriangle className="h-5 w-5 text-red-500" />
                        </div>
                      </div>
                      <div className="space-y-1">
                        <h4 className="font-medium">Urgent Blood Need</h4>
                        <p className="text-sm text-muted-foreground">
                          Urgent need for {userData.bloodGroup} blood in your area. Can you help?
                        </p>
                        <p className="text-xs text-muted-foreground">2 hours ago</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 p-4 bg-muted/50 rounded-lg">
                      <div className="flex-shrink-0">
                        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                          <Calendar className="h-5 w-5 text-blue-500" />
                        </div>
                      </div>
                      <div className="space-y-1">
                        <h4 className="font-medium">Upcoming Donation Drive</h4>
                        <p className="text-sm text-muted-foreground">
                          Join us for our monthly blood donation drive this weekend.
                        </p>
                        <p className="text-xs text-muted-foreground">1 day ago</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProfilePage;
