import axios from "axios";

const API_URL = "http://localhost:3000/api/auth";

// Register User
export const registerUser = async (userData) => {
  const response = await axios.post(`${API_URL}/register`, userData);
  return response.data;
};

// Login User
export const loginUser = async (userData) => {
  const response = await axios.post(`${API_URL}/login`, userData);
  return response.data;
};


// Update Profile (Protected Route)
// export const updateUser = async (token, data) => {
//   return axios.put(`${API_URL}/update`, data, { headers: { Authorization: `Bearer ${token}` } });
// }