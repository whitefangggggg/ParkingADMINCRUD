import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

export const api = {
  parkingLots: {
    getAll: () => axios.get(`${API_BASE_URL}/parking-lots`),
    getById: (id) => axios.get(`${API_BASE_URL}/parking-lots/${id}`),
    create: (data) => axios.post(`${API_BASE_URL}/parking-lots`, data),
    update: (id, data) => axios.put(`${API_BASE_URL}/parking-lots/${id}`, data),
    delete: (id) => axios.delete(`${API_BASE_URL}/parking-lots/${id}`),
  },
  parkingSpaces: {
    getAll: () => axios.get(`${API_BASE_URL}/parking-spaces`),
    getById: (id) => axios.get(`${API_BASE_URL}/parking-spaces/${id}`),
    create: (lotId, data) =>
      axios.post(`${API_BASE_URL}/parking-spaces/${lotId}`, data),
    update: (id, data) => axios.put(`${API_BASE_URL}/parking-spaces/${id}`, data),
    delete: (id) => axios.delete(`${API_BASE_URL}/parking-spaces/${id}`),
  },
  parkingReservations: {
    getAll: () => axios.get(`${API_BASE_URL}/parking-reservations`),
    getById: (id) => axios.get(`${API_BASE_URL}/parking-reservations/${id}`),
    create: (data) => axios.post(`${API_BASE_URL}/parking-reservations`, data),
    update: (id, data) =>
      axios.put(`${API_BASE_URL}/parking-reservations/${id}`, data),
    delete: (id) => axios.delete(`${API_BASE_URL}/parking-reservations/${id}`),
  },
};
