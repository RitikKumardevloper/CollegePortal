import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AddLocation from './AddLocation';
import LocationTable from './LocationTable';

const ManageLocation = () => {
  const [locations, setLocations] = useState([]);

  // Fetch all locations on mount
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const res = await axios.get('http://localhost:5000/admin/managelocaiton');
        setLocations(res.data.reverse()); // newest first
      } catch (error) {
        console.error('Error fetching locations:', error);
      }
    };
    

    fetchLocations();
  }, []);

  // Add location to the list (optional enhancement: POST to server)
  const handleAddLocation = (location) => {
    setLocations((prev) => [...prev, location]);
    // Optionally, send POST request to server here
  };

  // Delete location (based on id, if available)
  const handleDeleteLocation = async (indexToDelete) => {
    const locationToDelete = locations[indexToDelete];
    
    try {
      // If the location has an _id or id field, send delete request
      if (locationToDelete._id) {
        await axios.delete(`http://localhost:5000/admin/managelocaiton/${locationToDelete._id}`);
      }

      // Update state after successful delete
      setLocations(locations.filter((_, index) => index !== indexToDelete));
    } catch (error) {
      console.error('Error deleting location:', error);
    }
  };

  return (
    <div className="space-y-6">
      <AddLocation onAddLocation={handleAddLocation} />
      <LocationTable locations={locations} onDeleteLocation={handleDeleteLocation} />
      </div>
  );
};

export default ManageLocation;
