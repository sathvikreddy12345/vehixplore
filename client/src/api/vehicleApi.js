import axios from 'axios';

const API_URL = 'http://localhost:5000/api/vehicles'; // backend endpoint

export const getVehicles = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching vehicles:", error);
    return [];
  }
};
