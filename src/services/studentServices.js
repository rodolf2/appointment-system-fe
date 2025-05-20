// services/studentService.js
import axios from 'axios';

const API_URL = '/api/students';

// Create a new student
export const createStudent = async (studentData) => {
  try {
    const response = await axios.post(API_URL, studentData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to create student' };
  }
};

// Get all students
export const getAllStudents = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch students' };
  }
};

// Get a specific student by ID
export const getStudentById = async (studentId) => {
  try {
    const response = await axios.get(`${API_URL}/${studentId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch student' };
  }
};

// Update a student
export const updateStudent = async (studentId, updateData) => {
  try {
    const response = await axios.put(`${API_URL}/${studentId}`, updateData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to update student' };
  }
};

// Delete a student
export const deleteStudent = async (studentId) => {
  try {
    const response = await axios.delete(`${API_URL}/${studentId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to delete student' };
  }
};
