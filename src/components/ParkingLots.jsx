import React, { useEffect, useState } from "react";
import { api } from "../api/api"; // Import the api object

const ParkingLots = () => {
  const [parkingLots, setParkingLots] = useState([]);
  const [formData, setFormData] = useState({ parkingLotName: "", spaces: 0 });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchParkingLots();
  }, []);

  const fetchParkingLots = async () => {
    try {
      const response = await api.parkingLots.getAll();
      setParkingLots(response.data);
    } catch (error) {
      console.error("Error fetching parking lots", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.parkingLots.update(editingId, formData);
      } else {
        await api.parkingLots.create(formData);
      }
      fetchParkingLots();
      setFormData({ parkingLotName: "", spaces: 0 });
      setEditingId(null);
    } catch (error) {
      console.error("Error saving parking lot", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.parkingLots.delete(id);
      fetchParkingLots();
    } catch (error) {
      console.error("Error deleting parking lot", error);
    }
  };

  const handleEdit = (lot) => {
    setEditingId(lot.id);
    setFormData({ parkingLotName: lot.parkingLotName, spaces: lot.spaces });
  };

  return (
    <div>
      <h2>Parking Lots</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Parking Lot Name"
          value={formData.parkingLotName}
          onChange={(e) => setFormData({ ...formData, parkingLotName: e.target.value })}
        />
        <input
          type="number"
          placeholder="Spaces"
          value={formData.spaces}
          onChange={(e) => setFormData({ ...formData, spaces: e.target.value })}
        />
        <button type="submit">{editingId ? "Update" : "Add"} Parking Lot</button>
      </form>
      <ul>
        {parkingLots.map((lot) => (
          <li key={lot.id}>
            {lot.parkingLotName} - {lot.spaces} spaces
            <button onClick={() => handleEdit(lot)}>Edit</button>
            <button onClick={() => handleDelete(lot.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ParkingLots;
