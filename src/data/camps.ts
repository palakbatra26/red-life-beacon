
// Sample data for blood donation camps
export const allCamps = [
  {
    id: 1,
    title: "City Hospital Blood Drive",
    organizer: "City Hospital",
    date: "May 15, 2025",
    time: "10:00 AM - 4:00 PM",
    location: "City Hospital Main Building",
    city: "Delhi",
    phone: "011-2345-6789"
  },
  {
    id: 2,
    title: "Community Health Center Drive",
    organizer: "Red Cross Society",
    date: "May 18, 2025",
    time: "9:00 AM - 2:00 PM",
    location: "Community Health Center",
    city: "Mumbai",
    phone: "022-3456-7890"
  },
  {
    id: 3,
    title: "College Campus Blood Drive",
    organizer: "Student Council",
    date: "May 20, 2025",
    time: "11:00 AM - 5:00 PM",
    location: "University Auditorium",
    city: "Bangalore",
    phone: "080-4567-8901"
  },
  {
    id: 4,
    title: "Corporate Office Drive",
    organizer: "Tech Solutions Inc.",
    date: "May 22, 2025",
    time: "10:00 AM - 3:00 PM",
    location: "Tech Park Building A",
    city: "Hyderabad",
    phone: "040-5678-9012"
  },
  {
    id: 5,
    title: "District Hospital Campaign",
    organizer: "State Health Department",
    date: "May 25, 2025",
    time: "9:00 AM - 5:00 PM",
    location: "District Hospital",
    city: "Chennai",
    phone: "044-6789-0123"
  },
  {
    id: 6,
    title: "Mall Awareness Drive",
    organizer: "Blood Connects NGO",
    date: "May 27, 2025",
    time: "11:00 AM - 7:00 PM",
    location: "Central City Mall",
    city: "Delhi",
    phone: "011-7890-1234"
  },
  {
    id: 7,
    title: "Rural Health Center Drive",
    organizer: "Rural Health Mission",
    date: "May 29, 2025",
    time: "10:00 AM - 4:00 PM",
    location: "Village Community Center",
    city: "Pune",
    phone: "020-8901-2345"
  },
  {
    id: 8,
    title: "Weekend Public Drive",
    organizer: "Life Savers Foundation",
    date: "May 30, 2025",
    time: "9:00 AM - 6:00 PM",
    location: "Public Park",
    city: "Mumbai",
    phone: "022-9012-3456"
  }
];

// List of cities
export const cities = [...new Set(allCamps.map(camp => camp.city))].sort();
