// src/api.js

import axios from 'axios';

const API_URL = 'http://localhost:5000'; // Adjust to your backend URL

// Group-related API calls
export const getAllGroups = async () => {
  const response = await axios.get(`${API_URL}/groups`);
  return response.data;
};

export const createGroup = async (name, description) => {
  const response = await axios.post(`${API_URL}/groups`, { name, description });
  return response.data;
};

export const joinGroup = async (userId, groupId) => {
  await axios.post(`${API_URL}/groups/${groupId}/join`, { userId });
};

export const getUserGroups = async (userId) => {
  const response = await axios.get(`${API_URL}/users/${userId}/groups`);
  return response.data;
};

// Goal-related API calls
export const addGoal = async (userId, description, target, frequency) => {
  const response = await axios.post(`${API_URL}/goals`, {
    user_id: userId,
    description,
    target,
    frequency,
  });
  return response.data;
};

export const getUserGoals = async (userId) => {
  const response = await axios.get(`${API_URL}/users/${userId}/goals`);
  return response.data;
};

export const completeGoal = async (goalId) => {
  const response = await axios.put(`${API_URL}/goals/${goalId}/complete`);
  return response.data;
};
