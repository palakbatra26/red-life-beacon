
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Home, Hospital, Bell, UserRound, LogIn, UserPlus, Shield } from 'lucide-react';
import { SignedIn, SignedOut, UserButton, SignInButton, SignUpButton, useUser } from '@clerk/clerk-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useUser();
  const isAdmin = user?.primaryEmailAddress?.emailAddress === 'palakbatra79@gmail.com';

  // Toggle for mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-md fixed w-full z-20 top-0 left-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-primary font-bold text-xl">PB's Blood Donation</span>
            </Link>
          </div>
          
          {/* Desktop menu */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            <Link to="/" className="flex items-center text-gray-700 px-3 py-2 rounded-md text-sm font-medium hover:bg-primary hover:text-white transition-colors duration-200">
              <Home className="mr-1 h-4 w-4" />
              Home
            </Link>
            <Link to="/camps" className="flex items-center text-gray-700 px-3 py-2 rounded-md text-sm font-medium hover:bg-primary hover:text-white transition-colors duration-200">
              <Hospital className="mr-1 h-4 w-4" />
              Camps
            </Link>
            <Link to="/urgent" className="flex items-center text-gray-700 px-3 py-2 rounded-md text-sm font-medium hover:bg-primary hover:text-white transition-colors duration-200">
              <Bell className="mr-1 h-4 w-4" />
              Urgent Need
            </Link>
            <Link to="/register-donor" className="flex items-center text-gray-700 px-3 py-2 rounded-md text-sm font-medium hover:bg-primary hover:text-white transition-colors duration-200">
              <UserPlus className="mr-1 h-4 w-4" />
              Register as Donor
            </Link>
            
            <SignedIn>
              <Link to="/profile" className="flex items-center text-gray-700 px-3 py-2 rounded-md text-sm font-medium hover:bg-primary hover:text-white transition-colors duration-200">
                <UserRound className="mr-1 h-4 w-4" />
                Profile
              </Link>
              {isAdmin && (
                <Link to="/admin" className="flex items-center text-gray-700 px-3 py-2 rounded-md text-sm font-medium hover:bg-primary hover:text-white transition-colors duration-200">
                  <Shield className="mr-1 h-4 w-4" />
                  Admin
                </Link>
              )}
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
            
            <SignedOut>
              <div className="flex items-center">
                <SignInButton mode="modal">
                  <Button variant="ghost" className="flex items-center">
                    <LogIn className="mr-1 h-4 w-4" />
                    Sign In
                  </Button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <Button variant="outline" className="flex items-center ml-2">
                    <UserPlus className="mr-1 h-4 w-4" />
                    Sign Up
                  </Button>
                </SignUpButton>
              </div>
            </SignedOut>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
            
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center ml-2 p-2 rounded-md text-gray-700 hover:text-white hover:bg-primary focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg
                className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden bg-white`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link 
            to="/" 
            className="flex items-center text-gray-700 block px-3 py-2 rounded-md text-base font-medium hover:bg-primary hover:text-white"
            onClick={() => setIsMenuOpen(false)}
          >
            <Home className="mr-2 h-4 w-4" />
            Home
          </Link>
          <Link 
            to="/camps" 
            className="flex items-center text-gray-700 block px-3 py-2 rounded-md text-base font-medium hover:bg-primary hover:text-white"
            onClick={() => setIsMenuOpen(false)}
          >
            <Hospital className="mr-2 h-4 w-4" />
            Camps
          </Link>
          <Link 
            to="/urgent" 
            className="flex items-center text-gray-700 block px-3 py-2 rounded-md text-base font-medium hover:bg-primary hover:text-white"
            onClick={() => setIsMenuOpen(false)}
          >
            <Bell className="mr-2 h-4 w-4" />
            Urgent Need
          </Link>
          <Link 
            to="/register-donor" 
            className="flex items-center text-gray-700 block px-3 py-2 rounded-md text-base font-medium hover:bg-primary hover:text-white"
            onClick={() => setIsMenuOpen(false)}
          >
            <UserPlus className="mr-2 h-4 w-4" />
            Register as Donor
          </Link>
          
          <SignedIn>
            <Link 
              to="/profile" 
              className="flex items-center text-gray-700 block px-3 py-2 rounded-md text-base font-medium hover:bg-primary hover:text-white"
              onClick={() => setIsMenuOpen(false)}
            >
              <UserRound className="mr-2 h-4 w-4" />
              Profile
            </Link>
            {isAdmin && (
              <Link 
                to="/admin" 
                className="flex items-center text-gray-700 block px-3 py-2 rounded-md text-base font-medium hover:bg-primary hover:text-white"
                onClick={() => setIsMenuOpen(false)}
              >
                <Shield className="mr-2 h-4 w-4" />
                Admin Panel
              </Link>
            )}
          </SignedIn>
          
          <SignedOut>
            <div className="flex flex-col space-y-2 pt-2">
              <SignInButton mode="modal">
                <Button variant="ghost" className="flex items-center justify-center w-full">
                  <LogIn className="mr-2 h-4 w-4" />
                  Sign In
                </Button>
              </SignInButton>
              <SignUpButton mode="modal">
                <Button variant="outline" className="flex items-center justify-center w-full">
                  <UserPlus className="mr-2 h-4 w-4" />
                  Sign Up
                </Button>
              </SignUpButton>
            </div>
          </SignedOut>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
