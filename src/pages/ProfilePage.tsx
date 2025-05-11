import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/components/ui/use-toast';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { UserRound, Edit, Calendar, MapPin, Award, AlertTriangle, X } from 'lucide-react';

// Sample user data
const userData = {
  name: 'Rahul Sharma',
  email: 'rahul.sharma@example.com',
  bloodGroup: 'B+',
  city: 'Delhi',
  phone: '9876543210',
  joinDate: 'January 15, 2023',
  donationsCount: 5,
  lastDonation: 'March 10, 2025'
};

// Sample donation history
const donationHistory = [
  {
    id: 1,
    date: 'March 10, 2025',
    location: 'City Hospital, Delhi',
    bloodGroup: 'B+',
    units: 1,
    certificate: '#CH78945'
  },
  {
    id: 2,
    date: 'December 5, 2024',
    location: 'Red Cross Blood Bank, Delhi',
    bloodGroup: 'B+',
    units: 1,
    certificate: '#RC45678'
  },
  {
    id: 3,
    date: 'August 22, 2024',
    location: 'Community Health Center, Gurgaon',
    bloodGroup: 'B+',
    units: 1,
    certificate: '#CHC3456'
  },
  {
    id: 4,
    date: 'April 15, 2024',
    location: 'Blood Donation Camp, Delhi University',
    bloodGroup: 'B+',
    units: 1,
    certificate: '#DU12345'
  },
  {
    id: 5,
    date: 'December 1, 2023',
    location: 'AIIMS Hospital, Delhi',
    bloodGroup: 'B+',
    units: 1,
    certificate: '#AI98765'
  }
];

// Sample upcoming appointments
const upcomingAppointments = [
  {
    id: 1,
    date: 'June 15, 2025',
    time: '10:30 AM',
    location: 'City Hospital, Delhi',
    status: 'confirmed'
  }
];

// Sample notifications
const notifications = [
  {
    id: 1,
    message: 'Urgent need for B+ blood at AIIMS Delhi',
    date: '2 hours ago',
    type: 'urgent'
  },
  {
    id: 2,
    message: 'Your donation certificate from March 10 is ready',
    date: '2 days ago',
    type: 'info'
  },
  {
    id: 3,
    message: 'Thank you for your recent donation!',
    date: '5 days ago',
    type: 'success'
  },
  {
    id: 4,
    message: 'Upcoming blood donation camp near your location',
    date: '1 week ago',
    type: 'info'
  }
];

const ProfilePage = () => {
  const { toast } = useToast();
  
  // State for editing profile
  const [isEditing, setIsEditing] = useState(false);
  const [filteredHistory, setFilteredHistory] = useState(donationHistory);
  
  // Handle logout
  const handleLogout = () => {
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
    
    // In a real app, this would invalidate the session and redirect to home
    setTimeout(() => {
      window.location.href = '/';
    }, 1500);
  };
  
  // Handle filter change
  const handleFilterChange = (year: string) => {
    if (year === 'all') {
      setFilteredHistory(donationHistory);
    } else {
      setFilteredHistory(
        donationHistory.filter(donation => donation.date.includes(year))
      );
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Sidebar */}
          <div>
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold">Profile</h2>
                  <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => setIsEditing(!isEditing)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="text-center">
                <div className="flex flex-col items-center">
                  <Avatar className="h-24 w-24 mb-4">
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback>
                      <UserRound className="h-12 w-12" />
                    </AvatarFallback>
                  </Avatar>
                  
                  <h3 className="text-2xl font-semibold text-gray-900">{userData.name}</h3>
                  <div className="flex items-center mt-1">
                    <Badge variant="outline" className="flex items-center text-primary">
                      {userData.bloodGroup}
                    </Badge>
                    <span className="mx-2">•</span>
                    <span className="text-sm text-gray-500">
                      {userData.donationsCount} donations
                    </span>
                  </div>
                  
                  <div className="space-y-3 w-full text-left mt-6">
                    <div className="flex items-center text-sm">
                      <Mail className="h-4 w-4 mr-2 text-gray-500" />
                      <span>{userData.email}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Phone className="h-4 w-4 mr-2 text-gray-500" />
                      <span>{userData.phone}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                      <span>{userData.city}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                      <span>Last donation: {userData.lastDonation}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-4">
                <Button variant="outline" className="w-full" onClick={() => window.location.href = '/camps'}>
                  Schedule Donation
                </Button>
                
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline" className="w-full text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600">
                      Logout
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure you want to logout?</AlertDialogTitle>
                      <AlertDialogDescription>
                        You'll need to log back in to access your profile information.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={handleLogout} className="bg-red-500 hover:bg-red-600">
                        Logout
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </CardFooter>
            </Card>
          </div>
          
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information */}
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Manage your account information</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="overview">
                  <TabsList className="mb-4">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="appointments">Appointments</TabsTrigger>
                    <TabsTrigger value="notifications">Notifications</TabsTrigger>
                  </TabsList>
                  
                  {/* Overview Tab */}
                  <TabsContent value="overview">
                    <div className="space-y-6">
                      {/* Donor Statistics */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="bg-accent p-4 rounded-lg text-center">
                          <p className="text-sm text-gray-500">Total Donations</p>
                          <h4 className="text-2xl font-bold text-primary">{userData.donationsCount}</h4>
                        </div>
                        <div className="bg-accent p-4 rounded-lg text-center">
                          <p className="text-sm text-gray-500">Lives Saved</p>
                          <h4 className="text-2xl font-bold text-primary">{userData.donationsCount * 3}</h4>
                        </div>
                        <div className="bg-accent p-4 rounded-lg text-center">
                          <p className="text-sm text-gray-500">Next Donation</p>
                          <h4 className="text-sm font-medium">Available after Jun 10</h4>
                        </div>
                      </div>
                      
                      {/* Donation History */}
                      <div>
                        <div className="flex justify-between items-center mb-4">
                          <h3 className="font-semibold text-gray-900">Donation History</h3>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm" onClick={() => handleFilterChange('all')}>All</Button>
                            <Button variant="outline" size="sm" onClick={() => handleFilterChange('2025')}>2025</Button>
                            <Button variant="outline" size="sm" onClick={() => handleFilterChange('2024')}>2024</Button>
                            <Button variant="outline" size="sm" onClick={() => handleFilterChange('2023')}>2023</Button>
                          </div>
                        </div>
                        
                        {filteredHistory.length > 0 ? (
                          <div className="space-y-4">
                            {filteredHistory.map((donation) => (
                              <div key={donation.id} className="flex items-center justify-between border-b pb-4">
                                <div>
                                  <div className="font-medium">{donation.date}</div>
                                  <div className="text-sm text-gray-500">{donation.location}</div>
                                </div>
                                <div className="flex items-center">
                                  <Badge className="mr-2">{donation.bloodGroup}</Badge>
                                  <Button variant="outline" size="sm">Certificate</Button>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center py-8">
                            <p className="text-gray-500">No donations found for this filter</p>
                          </div>
                        )}
                      </div>
                      
                      {/* Achievements */}
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-4">Your Achievements</h3>
                        <div className="flex flex-wrap gap-4">
                          <div className="flex items-center p-3 border rounded-lg">
                            <Award className="h-8 w-8 text-primary mr-3" />
                            <div>
                              <p className="font-medium">First Donation</p>
                              <p className="text-xs text-gray-500">Completed your first blood donation</p>
                            </div>
                          </div>
                          <div className="flex items-center p-3 border rounded-lg">
                            <Award className="h-8 w-8 text-primary mr-3" />
                            <div>
                              <p className="font-medium">5+ Donations</p>
                              <p className="text-xs text-gray-500">Donated blood five or more times</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  {/* Appointments Tab */}
                  <TabsContent value="appointments">
                    <div className="space-y-6">
                      <h3 className="font-semibold text-gray-900">Upcoming Appointments</h3>
                      {upcomingAppointments.length > 0 ? (
                        <div className="space-y-4">
                          {upcomingAppointments.map((appointment) => (
                            <Card key={appointment.id}>
                              <CardContent className="p-4">
                                <div className="flex justify-between items-center">
                                  <div>
                                    <h4 className="font-medium">{appointment.date} at {appointment.time}</h4>
                                    <p className="text-sm text-gray-500">{appointment.location}</p>
                                  </div>
                                  <Badge variant={appointment.status === 'confirmed' ? 'default' : 'outline'}>
                                    {appointment.status === 'confirmed' ? 'Confirmed' : 'Scheduled'}
                                  </Badge>
                                </div>
                                <div className="flex justify-end mt-4">
                                  <Button variant="outline" size="sm" className="mr-2">Reschedule</Button>
                                  <Button variant="destructive" size="sm">Cancel</Button>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <p className="text-gray-500 mb-4">You have no upcoming appointments</p>
                          <Button onClick={() => window.location.href = '/camps'}>Schedule Donation</Button>
                        </div>
                      )}
                      
                      <div className="border-t pt-4 mt-6">
                        <h3 className="font-semibold text-gray-900 mb-4">Schedule a New Donation</h3>
                        <p className="text-sm text-gray-600 mb-4">
                          Find a convenient blood donation camp or center near you and schedule your next donation.
                        </p>
                        <Button onClick={() => window.location.href = '/camps'}>
                          Find Donation Centers
                        </Button>
                      </div>
                    </div>
                  </TabsContent>
                  
                  {/* Notifications Tab */}
                  <TabsContent value="notifications">
                    <div className="space-y-4">
                      {notifications.map((notification) => (
                        <div key={notification.id} className={`p-4 border rounded-lg ${
                          notification.type === 'urgent' ? 'border-red-200 bg-red-50' : 
                          notification.type === 'success' ? 'border-green-200 bg-green-50' : 
                          'border-gray-200'
                        }`}>
                          <div className="flex items-start">
                            {notification.type === 'urgent' && (
                              <AlertTriangle className="h-5 w-5 text-red-500 mr-3 mt-0.5" />
                            )}
                            <div className="flex-1">
                              <p className={`${
                                notification.type === 'urgent' ? 'text-red-700' : 
                                notification.type === 'success' ? 'text-green-700' : 
                                'text-gray-900'
                              }`}>{notification.message}</p>
                              <p className="text-xs text-gray-500 mt-1">{notification.date}</p>
                            </div>
                            <Button variant="ghost" size="icon" className="h-6 w-6">
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      ))}
                      
                      {notifications.length === 0 && (
                        <div className="text-center py-8">
                          <p className="text-gray-500">No new notifications</p>
                        </div>
                      )}
                      
                      <div className="border-t pt-4 mt-4">
                        <h4 className="font-medium text-gray-900 mb-2">Notification Settings</h4>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Urgent blood requests</span>
                            <Switch checked={true} />
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Upcoming camps</span>
                            <Switch checked={true} />
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Email notifications</span>
                            <Switch checked={true} />
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm">SMS notifications</span>
                            <Switch checked={false} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

// Adding missing imports
import { Switch } from "@/components/ui/switch";
import { Mail, Phone } from 'lucide-react';

export default ProfilePage;
