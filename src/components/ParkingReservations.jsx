import React, { useEffect, useState } from "react";
import { api } from "../api/api"; // Import the api object

const ParkingReservations = () => {
  const [reservations, setReservations] = useState([]);
  const [formData, setFormData] = useState({ startTime: "", endTime: "", reservationStatus: "" });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    try {
      const response = await api.parkingReservations.getAll();
      setReservations(response.data);
    } catch (error) {
      console.error("Error fetching reservations", error);
    }
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.parkingReservations.update(editingId, formData);
      } else {
        await api.parkingReservations.create(formData);
      }
      fetchReservations();
      setFormData({ startTime: "", endTime: "", reservationStatus: "" });
      setEditingId(null);
    } catch (error) {
      console.error("Error saving reservation", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.parkingReservations.delete(id);
      fetchReservations();
    } catch (error) {
      console.error("Error deleting reservation", error);
    }
  };

  const handleEdit = (reservation) => {
    setEditingId(reservation.id);
    setFormData({ startTime: reservation.startTime, endTime: reservation.endTime, reservationStatus: reservation.reservationStatus });
  };

  return (
    <div>
      <h2>Parking Reservations</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="datetime-local"
          placeholder="Start Time"
          value={formData.startTime}
          onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
        />
        <input
          type="datetime-local"
          placeholder="End Time"
          value={formData.endTime}
          onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
        />
        <input
          type="text"
          placeholder="Reservation Status"
          value={formData.reservationStatus}
          onChange={(e) => setFormData({ ...formData, reservationStatus: e.target.value })}
        />
        <button type="submit">{editingId ? "Update" : "Add"} Reservation</button>
      </form>
      <ul>
        {reservations.map((reservation) => (
          <li key={reservation.id}>
            {reservation.startTime} - {reservation.endTime} - {reservation.reservationStatus}
            <button onClick={() => handleEdit(reservation)}>Edit</button>
            <button onClick={() => handleDelete(reservation.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ParkingReservations;
