import axios from "axios";

const API_URL = "http://localhost:3000/api/transactions"; // Update with your backend URL

// Add a transaction
export const addTransaction = async (transactionData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(`${API_URL}/add`, transactionData, config);
  return response.data;
};

// Get all transactions for the logged-in user
export const getTransactions = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);
  return response.data;
};

// Delete a transaction
export const deleteTransaction = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(`${API_URL}/${id}`, config);
  return response.data;
};

// Update a transaction
export const updateTransaction = async (id, transactionData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(`${API_URL}/${id}`, transactionData, config);
  return response.data;
};