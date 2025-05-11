
import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Layout from '@/components/Layout';
import CampCard from '@/components/CampCard';

// Sample data for recent camps
const recentCamps = [
  {
    id: 1,
    title: "City Hospital Blood Drive",
    organizer: "City Hospital",
    date: "May 15, 2025",
    time: "10:00 AM - 4:00 PM",
    location: "City Hospital Main Building",
    city: "Delhi"
  },
  {
    id: 2,
    title: "Community Health Center Drive",
    organizer: "Red Cross Society",
    date: "May 18, 2025",
    time: "9:00 AM - 2:00 PM",
    location: "Community Health Center",
    city: "Mumbai"
  },
  {
    id: 3,
    title: "College Campus Blood Drive",
    organizer: "Student Council",
    date: "May 20, 2025",
    time: "11:00 AM - 5:00 PM",
    location: "University Auditorium",
    city: "Bangalore"
  }
];

const Index = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-red-600 to-red-800 text-white py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Your Blood Can Save a Life</h1>
            <p className="text-xl mb-8">Join Palak's Blood Donation community and help those in need. Every drop counts.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/camps">
                <Button size="lg" className="bg-white text-primary hover:bg-gray-100 hover:text-red-700">
                  <MapPin className="mr-2 h-5 w-5" />
                  Find Camps Near You
                </Button>
              </Link>
              <Link to="/urgent">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                  <AlertTriangle className="mr-2 h-5 w-5" />
                  Urgent Requests
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-accent rounded-lg shadow-sm">
              <h3 className="text-4xl font-bold text-primary mb-2">1,000+</h3>
              <p className="text-gray-700">Successful Donations</p>
            </div>
            <div className="text-center p-6 bg-accent rounded-lg shadow-sm">
              <h3 className="text-4xl font-bold text-primary mb-2">500+</h3>
              <p className="text-gray-700">Registered Donors</p>
            </div>
            <div className="text-center p-6 bg-accent rounded-lg shadow-sm">
              <h3 className="text-4xl font-bold text-primary mb-2">50+</h3>
              <p className="text-gray-700">Partner Hospitals</p>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Camps Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Recent Blood Donation Camps</h2>
            <p className="mt-2 text-gray-600">Find and register for upcoming blood donation camps near you</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {recentCamps.map(camp => (
              <CampCard key={camp.id} {...camp} />
            ))}
          </div>
          
          <div className="text-center mt-10">
            <Link to="/camps">
              <Button variant="outline">View All Camps</Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Why Donate Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Why Donate Blood?</h2>
            <p className="mt-2 text-gray-600">Your donation can impact multiple lives</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            <div className="bg-accent p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-3 text-gray-900">Save Lives</h3>
              <p className="text-gray-700">A single donation can save up to three lives. Blood cannot be manufactured; it can only come from generous donors like you.</p>
            </div>
            <div className="bg-accent p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-3 text-gray-900">Health Benefits</h3>
              <p className="text-gray-700">Regular blood donation can help reduce the risk of heart attacks and cancer. It also helps in maintaining good health.</p>
            </div>
            <div className="bg-accent p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-3 text-gray-900">Free Health Check</h3>
              <p className="text-gray-700">Before donation, you'll receive a free health check including blood pressure, hemoglobin levels, and testing for blood-borne diseases.</p>
            </div>
            <div className="bg-accent p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-3 text-gray-900">Help Your Community</h3>
              <p className="text-gray-700">Blood donations typically stay within the community, helping local patients in need and supporting your community's healthcare system.</p>
            </div>
          </div>
          
          <div className="text-center mt-10">
            <Link to="/register-donor">
              <Button>Become a Donor Today</Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Make a Difference?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">Join our community of blood donors today and help save lives. Every donation counts!</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/register-donor">
              <Button size="lg" className="bg-white text-primary hover:bg-gray-100">Register as Donor</Button>
            </Link>
            <Link to="/login">
              <Button size="lg" variant="outline" className="border-white hover:bg-white hover:text-primary">Login</Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
