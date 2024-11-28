import React, { useEffect, useState } from "react";
import { api } from "../api/api"; // Import the api object

const ParkingSpaces = () => {
  const [parkingSpaces, setParkingSpaces] = useState([]);
  const [formData, setFormData] = useState({ parkingName: "", spaceType: "" });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchParkingSpaces();
  }, []);

  const fetchParkingSpaces = async () => {
    try {
      const response = await api.parkingSpaces.getAll();
      setParkingSpaces(response.data);
    } catch (error) {
      console.error("Error fetching parking spaces", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.parkingSpaces.update(editingId, formData);
      } else {
        await api.parkingSpaces.create(formData);
      }
      fetchParkingSpaces();
      setFormData({ parkingName: "", spaceType: "" });
      setEditingId(null);
    } catch (error) {
      console.error("Error saving parking space", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.parkingSpaces.delete(id);
      fetchParkingSpaces();
    } catch (error) {
      console.error("Error deleting parking space", error);
    }
  };

  const handleEdit = (space) => {
    setEditingId(space.id);
    setFormData({ parkingName: space.parkingName, spaceType: space.spaceType });
  };

  return (
    <div>
      <h2>Parking Spaces</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Parking Name"
          value={formData.parkingName}
          onChange={(e) => setFormData({ ...formData, parkingName: e.target.value })}
        />
        <input
          type="text"
          placeholder="Space Type"
          value={formData.spaceType}
          onChange={(e) => setFormData({ ...formData, spaceType: e.target.value })}
        />
        <button type="submit">{editingId ? "Update" : "Add"} Parking Space</button>
      </form>
      <ul>
        {parkingSpaces.map((space) => (
          <li key={space.id}>
            {space.parkingName} - {space.spaceType}
            <button onClick={() => handleEdit(space)}>Edit</button>
            <button onClick={() => handleDelete(space.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ParkingSpaces;
