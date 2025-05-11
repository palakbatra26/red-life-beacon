
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
const cities = ['Delhi', 'Mumbai', 'Bangalore', 'Chennai', 'Hyderabad', 'Kolkata', 'Pune', 'Jaipur', 'Lucknow', 'Ahmedabad'];

const RegisterDonorPage = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    bloodGroup: '',
    city: '',
    lastDonationDate: null as Date | null,
    medicalConditions: '',
    address: '',
    agreeToTerms: false
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };
  
  const handleSelectChange = (field: string, value: string) => {
    setFormData({
      ...formData,
      [field]: value
    });
    
    // Clear error when selecting
    if (errors[field]) {
      setErrors({
        ...errors,
        [field]: ''
      });
    }
  };
  
  const handleDateChange = (date: Date | null) => {
    setFormData({
      ...formData,
      lastDonationDate: date
    });
    
    // Clear error when selecting date
    if (errors.lastDonationDate) {
      setErrors({
        ...errors,
        lastDonationDate: ''
      });
    }
  };
  
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.checked
    });
    
    // Clear error when checking
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: ''
      });
    }
  };
  
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    // Basic validations
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    // Phone validation
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (formData.phone.length < 10) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    
    // Required selections
    if (!formData.bloodGroup) newErrors.bloodGroup = 'Please select your blood group';
    if (!formData.city) newErrors.city = 'Please select your city';
    
    // Terms agreement
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Handle form submission - in production this would send data to backend
      console.log('Submitted form data:', formData);
      
      toast({
        title: "Registration Successful!",
        description: "Thank you for registering as a blood donor.",
        variant: "default",
      });
      
      // Reset form after successful submission
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        bloodGroup: '',
        city: '',
        lastDonationDate: null,
        medicalConditions: '',
        address: '',
        agreeToTerms: false
      });
    } else {
      toast({
        title: "Form has errors",
        description: "Please check the form and correct errors.",
        variant: "destructive",
      });
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Register as a Blood Donor</h1>
          <p className="mt-2 text-gray-600">Join our donor database and help save lives in your community</p>
        </div>
        
        {/* Registration Form */}
        <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Personal Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* First Name */}
                <div className="space-y-2">
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name *</label>
                  <Input
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className={errors.firstName ? "border-red-500" : ""}
                  />
                  {errors.firstName && <p className="text-red-500 text-xs">{errors.firstName}</p>}
                </div>
                
                {/* Last Name */}
                <div className="space-y-2">
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name *</label>
                  <Input
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className={errors.lastName ? "border-red-500" : ""}
                  />
                  {errors.lastName && <p className="text-red-500 text-xs">{errors.lastName}</p>}
                </div>
                
                {/* Email */}
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email *</label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={errors.email ? "border-red-500" : ""}
                  />
                  {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
                </div>
                
                {/* Phone */}
                <div className="space-y-2">
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number *</label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={errors.phone ? "border-red-500" : ""}
                  />
                  {errors.phone && <p className="text-red-500 text-xs">{errors.phone}</p>}
                </div>
              </div>
            </div>
            
            {/* Blood Donation Information */}
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Donation Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Blood Group */}
                <div className="space-y-2">
                  <label htmlFor="bloodGroup" className="block text-sm font-medium text-gray-700">Blood Group *</label>
                  <Select
                    value={formData.bloodGroup}
                    onValueChange={(value) => handleSelectChange('bloodGroup', value)}
                  >
                    <SelectTrigger className={errors.bloodGroup ? "border-red-500" : ""}>
                      <SelectValue placeholder="Select Blood Group" />
                    </SelectTrigger>
                    <SelectContent>
                      {bloodGroups.map(group => (
                        <SelectItem key={group} value={group}>{group}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.bloodGroup && <p className="text-red-500 text-xs">{errors.bloodGroup}</p>}
                </div>
                
                {/* City */}
                <div className="space-y-2">
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700">City *</label>
                  <Select
                    value={formData.city}
                    onValueChange={(value) => handleSelectChange('city', value)}
                  >
                    <SelectTrigger className={errors.city ? "border-red-500" : ""}>
                      <SelectValue placeholder="Select City" />
                    </SelectTrigger>
                    <SelectContent>
                      {cities.map(city => (
                        <SelectItem key={city} value={city}>{city}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.city && <p className="text-red-500 text-xs">{errors.city}</p>}
                </div>
                
                {/* Last Donation Date */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Last Donation Date (if any)</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={`w-full justify-start text-left font-normal ${
                          formData.lastDonationDate ? "" : "text-muted-foreground"
                        }`}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formData.lastDonationDate ? format(formData.lastDonationDate, "PPP") : "Select date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={formData.lastDonationDate || undefined}
                        onSelect={handleDateChange}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                
                {/* Medical Conditions */}
                <div className="space-y-2 md:col-span-2">
                  <label htmlFor="medicalConditions" className="block text-sm font-medium text-gray-700">
                    Medical Conditions (if any)
                  </label>
                  <Textarea
                    id="medicalConditions"
                    name="medicalConditions"
                    value={formData.medicalConditions}
                    onChange={handleInputChange}
                    placeholder="List any medical conditions that might affect your eligibility to donate blood"
                    className="h-20"
                  />
                </div>
              </div>
            </div>
            
            {/* Address */}
            <div className="space-y-2">
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
              <Textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Enter your full address"
                className="h-20"
              />
            </div>
            
            {/* Terms and Conditions */}
            <div className="space-y-2">
              <div className="flex items-center">
                <input
                  id="agreeToTerms"
                  name="agreeToTerms"
                  type="checkbox"
                  checked={formData.agreeToTerms}
                  onChange={handleCheckboxChange}
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                />
                <label htmlFor="agreeToTerms" className="ml-2 block text-sm text-gray-900">
                  I agree to be contacted when my blood type is needed and consent to the storage of my information *
                </label>
              </div>
              {errors.agreeToTerms && <p className="text-red-500 text-xs">{errors.agreeToTerms}</p>}
            </div>
            
            {/* Submit Button */}
            <div className="pt-2">
              <Button type="submit" className="w-full" size="lg">
                Register as Donor
              </Button>
              <p className="text-xs text-gray-500 text-center mt-2">
                Fields marked with * are mandatory
              </p>
            </div>
          </form>
        </div>
        
        {/* Benefits Section */}
        <div className="max-w-2xl mx-auto mt-12">
          <h3 className="text-xl font-semibold text-center text-gray-800 mb-6">Benefits of Registering as a Donor</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-accent p-4 rounded-lg">
              <h4 className="font-medium mb-2 text-gray-900">Timely Notifications</h4>
              <p className="text-gray-700 text-sm">Receive alerts when your blood type is urgently needed in your area.</p>
            </div>
            
            <div className="bg-accent p-4 rounded-lg">
              <h4 className="font-medium mb-2 text-gray-900">Save Lives</h4>
              <p className="text-gray-700 text-sm">Your donation can help save up to three lives with a single donation.</p>
            </div>
            
            <div className="bg-accent p-4 rounded-lg">
              <h4 className="font-medium mb-2 text-gray-900">Track Donations</h4>
              <p className="text-gray-700 text-sm">Keep a record of your donations and the lives you've impacted.</p>
            </div>
            
            <div className="bg-accent p-4 rounded-lg">
              <h4 className="font-medium mb-2 text-gray-900">Health Checkups</h4>
              <p className="text-gray-700 text-sm">Receive free mini health checkups each time you donate blood.</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default RegisterDonorPage;
