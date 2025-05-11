
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-10 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* About section */}
          <div>
            <h3 className="text-xl font-bold mb-4">Palak's Blood Donation</h3>
            <p className="text-gray-300 mb-4">
              We connect blood donors with recipients, helping save lives through the timely availability of blood.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/camps" className="text-gray-300 hover:text-white transition-colors">Donation Camps</Link>
              </li>
              <li>
                <Link to="/urgent" className="text-gray-300 hover:text-white transition-colors">Urgent Requests</Link>
              </li>
              <li>
                <Link to="/register-donor" className="text-gray-300 hover:text-white transition-colors">Become a Donor</Link>
              </li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center text-gray-300">
                <Mail size={16} className="mr-2" />
                <span>contact@palaksblooddonation.com</span>
              </li>
              <li className="flex items-center text-gray-300">
                <Phone size={16} className="mr-2" />
                <span>+91 84659-54559</span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="pt-4 border-t border-gray-700 text-center text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} Palak's Blood Donation. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
