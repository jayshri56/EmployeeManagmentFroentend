// services/api.js
import axios from 'axios';

export const getEmployeeProfile = async (id) => {
  return axios.get(`/api/employees/${id}`);
};

export const updateEmployeeProfile = async (id, updatedProfile) => {
  return axios.put(`/api/employees/${id}`, updatedProfile);
};
