import React, { useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import { Trash2, Edit, Plus } from 'lucide-react';
import Layout from '../components/Layout';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface Camp {
  id: string;
  title: string;
  organizer: string;
  date: string;
  time: string;
  city: string;
  location: string;
  description?: string;
  imageUrl?: string;
}

interface UrgentNeed {
  id: string;
  patientName: string;
  bloodGroup: string;
  hospital: string;
  city: string;
  contact: string;
  details: string;
  date: string;
}

const AdminPanel = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('camps');
  const [camps, setCamps] = useState<Camp[]>([]);
  const [urgentNeeds, setUrgentNeeds] = useState<UrgentNeed[]>([]);
  const [editingCamp, setEditingCamp] = useState<Camp | null>(null);
  const [editingUrgent, setEditingUrgent] = useState<UrgentNeed | null>(null);
  
  // Form states
  const [campForm, setCampForm] = useState<Omit<Camp, 'id'>>({ 
    title: '', 
    organizer: '', 
    date: '', 
    time: '', 
    city: '', 
    location: '' 
  });
  
  const [urgentForm, setUrgentForm] = useState<Omit<UrgentNeed, 'id' | 'date'>>({ 
    patientName: '', 
    bloodGroup: 'A+', 
    hospital: '', 
    city: '', 
    contact: '', 
    details: '' 
  });

  // Load data from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch camps
        const campsResponse = await fetch('http://localhost:8080/camps');
        if (!campsResponse.ok) throw new Error('Failed to fetch camps');
        const campsData = await campsResponse.json();
        setCamps(campsData);
        
        // Fetch urgent needs
        const urgentResponse = await fetch('http://localhost:8080/urgent-needs');
        if (!urgentResponse.ok) throw new Error('Failed to fetch urgent needs');
        const urgentData = await urgentResponse.json();
        setUrgentNeeds(urgentData);
        
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('Failed to load data. Please try again later.');
      }
    };
    
    fetchData();
  }, []);
  
  // Handle form changes
  const handleCampChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCampForm(prev => ({ ...prev, [name]: value }));
  };
  
  const handleUrgentChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUrgentForm(prev => ({ ...prev, [name]: value }));
  };
  
  // Form submissions
  const handleCampSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      let response;
      
      if (editingCamp) {
        // Update existing camp
        response = await fetch(`http://localhost:8080/camps/${editingCamp.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(campForm),
        });
        
        if (!response.ok) throw new Error('Failed to update camp');
        
        // Update local state
        setCamps(camps.map(camp => 
          camp.id === editingCamp.id ? { ...campForm, id: editingCamp.id } : camp
        ));
        
        toast.success('Camp updated successfully');
        setEditingCamp(null);
      } else {
        // Add new camp
        response = await fetch('http://localhost:8080/camps', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(campForm),
        });
        
        if (!response.ok) throw new Error('Failed to add camp');
        
        const newCamp = await response.json();
        
        // Update local state
        setCamps([...camps, newCamp]);
        toast.success('Camp added successfully');
      }
      
      // Reset form
      setCampForm({ 
        title: '', 
        organizer: '', 
        date: '', 
        time: '', 
        city: '', 
        location: '',
        description: '',
        imageUrl: '',
        phone: ''
      });
      
    } catch (error) {
      console.error('Error saving camp:', error);
      toast.error('Failed to save camp. Please try again.');
    }
  };
  
  const handleUrgentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingUrgent) {
      // Update existing urgent need
      setUrgentNeeds(urgentNeeds.map(urgent => 
        urgent.id === editingUrgent.id ? { ...urgentForm, id: editingUrgent.id, date: new Date().toISOString() } as UrgentNeed : urgent
      ));
      toast.success('Urgent need updated successfully');
      setEditingUrgent(null);
    } else {
      // Add new urgent need
      const newUrgent: UrgentNeed = {
        ...urgentForm,
        id: Date.now().toString(),
        date: new Date().toISOString()
      };
      setUrgentNeeds([...urgentNeeds, newUrgent]);
      toast.success('Urgent need added successfully');
    }
    
    // Reset form
    setUrgentForm({ patientName: '', bloodGroup: 'A+', hospital: '', city: '', contact: '', details: '' });
  };
  
  // Edit handlers
  const handleEditCamp = (camp: Camp) => {
    setEditingCamp(camp);
    setCampForm({
      title: camp.title,
      organizer: camp.organizer,
      date: camp.date,
      time: camp.time,
      city: camp.city,
      location: camp.location,
      description: camp.description || '',
      imageUrl: camp.imageUrl || '',
      phone: camp.phone || ''
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const handleEditUrgent = (urgent: UrgentNeed) => {
    setEditingUrgent(urgent);
    setUrgentForm({
      patientName: urgent.patientName,
      bloodGroup: urgent.bloodGroup,
      hospital: urgent.hospital,
      city: urgent.city,
      contact: urgent.contact,
      details: urgent.details
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  // Delete handlers
  const handleDeleteCamp = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this camp?')) return;
    
    try {
      const response = await fetch(`http://localhost:8080/camps/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) throw new Error('Failed to delete camp');
      
      // Update local state
      setCamps(camps.filter(camp => camp.id !== id));
      toast.success('Camp deleted successfully');
      
    } catch (error) {
      console.error('Error deleting camp:', error);
      toast.error('Failed to delete camp. Please try again.');
    }
  };
  
  const handleDeleteUrgent = (id: string) => {
    if (window.confirm('Are you sure you want to delete this urgent need?')) {
      setUrgentNeeds(urgentNeeds.filter(urgent => urgent.id !== id));
      toast.success('Urgent need deleted successfully');
    }
  };

  // Check if user is admin
  const isAdmin = user?.primaryEmailAddress?.emailAddress === 'palakbatra79@gmail.com';

  if (!isAdmin) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Access Denied</h2>
            <p>You don't have permission to access this page.</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
        
        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('camps')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'camps'
                  ? 'border-red-600 text-red-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Manage Camps
            </button>
            <button
              onClick={() => setActiveTab('urgent')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'urgent'
                  ? 'border-red-600 text-red-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Urgent Needs
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        <div className="bg-white p-6 rounded-lg shadow">
          {activeTab === 'camps' ? (
            <div>
              <h2 className="text-xl font-semibold mb-4">
                {editingCamp ? 'Edit Camp' : 'Add New Camp'}
              </h2>
              <form onSubmit={handleCampSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Title *</label>
                    <input 
                      type="text" 
                      name="title"
                      value={campForm.title}
                      onChange={handleCampChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" 
                      required 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Organizer *</label>
                    <input 
                      type="text" 
                      name="organizer"
                      value={campForm.organizer}
                      onChange={handleCampChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" 
                      required 
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Date *</label>
                    <input 
                      type="date" 
                      name="date"
                      value={campForm.date}
                      onChange={handleCampChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" 
                      required 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Time *</label>
                    <input 
                      type="time" 
                      name="time"
                      value={campForm.time}
                      onChange={handleCampChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" 
                      required 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">City *</label>
                    <input 
                      type="text" 
                      name="city"
                      value={campForm.city}
                      onChange={handleCampChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" 
                      required 
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Location *</label>
                  <input 
                    type="text" 
                    name="location"
                    value={campForm.location}
                    onChange={handleCampChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" 
                    required 
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  {editingCamp && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setEditingCamp(null);
                        setCampForm({ title: '', organizer: '', date: '', time: '', city: '', location: '' });
                      }}
                    >
                      Cancel
                    </Button>
                  )}
                  <Button
                    type="submit"
                    className="bg-red-600 hover:bg-red-700"
                  >
                    {editingCamp ? 'Update Camp' : 'Add Camp'}
                  </Button>
                </div>
              </form>
              
              {/* List of Camps */}
              <div className="mt-8">
                <h3 className="text-lg font-medium mb-4">Manage Camps</h3>
                {camps.length === 0 ? (
                  <p className="text-gray-500">No camps added yet.</p>
                ) : (
                  <div className="space-y-4">
                    {camps.map(camp => (
                      <div key={camp.id} className="border rounded-lg p-4 flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">{camp.title}</h4>
                          <p className="text-sm text-gray-600">{camp.organizer}</p>
                          <p className="text-sm text-gray-500">
                            {new Date(camp.date).toLocaleDateString()} • {camp.time} • {camp.city}
                          </p>
                          <p className="text-sm text-gray-500">{camp.location}</p>
                        </div>
                        <div className="flex space-x-2">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => handleEditCamp(camp)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-red-600 hover:text-red-700"
                            onClick={() => handleDeleteCamp(camp.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div>
              <h2 className="text-xl font-semibold mb-4">
                {editingUrgent ? 'Edit Urgent Need' : 'Add Urgent Need'}
              </h2>
              <form onSubmit={handleUrgentSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Patient Name *</label>
                    <input 
                      type="text" 
                      name="patientName"
                      value={urgentForm.patientName}
                      onChange={handleUrgentChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" 
                      required 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Blood Group *</label>
                    <select 
                      name="bloodGroup"
                      value={urgentForm.bloodGroup}
                      onChange={handleUrgentChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                      required
                    >
                      <option value="A+">A+</option>
                      <option value="A-">A-</option>
                      <option value="B+">B+</option>
                      <option value="B-">B-</option>
                      <option value="AB+">AB+</option>
                      <option value="AB-">AB-</option>
                      <option value="O+">O+</option>
                      <option value="O-">O-</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Hospital *</label>
                    <input 
                      type="text" 
                      name="hospital"
                      value={urgentForm.hospital}
                      onChange={handleUrgentChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" 
                      required 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">City *</label>
                    <input 
                      type="text" 
                      name="city"
                      value={urgentForm.city}
                      onChange={handleUrgentChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" 
                      required 
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Contact Number *</label>
                  <input 
                    type="tel" 
                    name="contact"
                    value={urgentForm.contact}
                    onChange={handleUrgentChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" 
                    required 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Additional Details</label>
                  <textarea 
                    rows={3} 
                    name="details"
                    value={urgentForm.details}
                    onChange={handleUrgentChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                  ></textarea>
                </div>
                <div className="flex justify-end space-x-2">
                  {editingUrgent && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setEditingUrgent(null);
                        setUrgentForm({ patientName: '', bloodGroup: 'A+', hospital: '', city: '', contact: '', details: '' });
                      }}
                    >
                      Cancel
                    </Button>
                  )}
                  <Button
                    type="submit"
                    className="bg-red-600 hover:bg-red-700"
                  >
                    {editingUrgent ? 'Update Urgent Need' : 'Post Urgent Need'}
                  </Button>
                </div>
              </form>
              
              {/* List of Urgent Needs */}
              <div className="mt-8">
                <h3 className="text-lg font-medium mb-4">Manage Urgent Needs</h3>
                {urgentNeeds.length === 0 ? (
                  <p className="text-gray-500">No urgent needs posted yet.</p>
                ) : (
                  <div className="space-y-4">
                    {urgentNeeds.map(urgent => (
                      <div key={urgent.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium">{urgent.patientName}</h4>
                            <p className="text-sm text-gray-600">
                              <span className="font-medium">Blood Group:</span> {urgent.bloodGroup}
                            </p>
                            <p className="text-sm text-gray-600">
                              <span className="font-medium">Hospital:</span> {urgent.hospital}
                            </p>
                            <p className="text-sm text-gray-600">
                              <span className="font-medium">City:</span> {urgent.city}
                            </p>
                            <p className="text-sm text-gray-600">
                              <span className="font-medium">Contact:</span> {urgent.contact}
                            </p>
                            {urgent.details && (
                              <p className="text-sm text-gray-600 mt-2">
                                <span className="font-medium">Details:</span> {urgent.details}
                              </p>
                            )}
                            <p className="text-xs text-gray-500 mt-2">
                              Posted on: {new Date(urgent.date).toLocaleString()}
                            </p>
                          </div>
                          <div className="flex space-x-2">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => handleEditUrgent(urgent)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="text-red-600 hover:text-red-700"
                              onClick={() => handleDeleteUrgent(urgent.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default AdminPanel;
