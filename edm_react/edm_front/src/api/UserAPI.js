import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_BASE_URL;

export const fetchTeachers = async () => {
  try {
    const response = await axios.get(`${API_BASE}/users`);
    return response.data;
  } catch (error) {
    console.error('Error fetching teacher list:', error);
    throw error;
  }
};
