import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_URL}/api/document-requests`;

// Create a new document request
export const createDocumentRequest = async (requestData) => {
  try {
    const response = await axios.post(`${API_URL}/docs`, requestData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to create document request' };
  }
};

// Get all document requests
export const getAllDocumentRequests = async () => {
  try {
    const response = await axios.get(`${API_URL}/docs`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch document requests' };
  }
};

// Get a specific document request by ID
export const getDocumentRequestById = async (requestId) => {
  try {
    const response = await axios.get(`${API_URL}/docs/${requestId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch document request' };
  }
};

// Get document request with student details
export const getDocumentRequestWithStudent = async (requestId) => {
  try {
    const response = await axios.get(`${API_URL}/docs/with-student/${requestId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch document request with student details' };
  }
};

// Update a document request
export const updateDocumentRequest = async (requestId, updateData) => {
  try {
    const response = await axios.put(`${API_URL}/docs/${requestId}`, updateData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to update document request' };
  }
};

// Delete a document request
export const deleteDocumentRequest = async (requestId) => {
  try {
    const response = await axios.delete(`${API_URL}/docs/${requestId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to delete document request' };
  }
};