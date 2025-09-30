import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const collegeService = {
  // Get all colleges
  getAllColleges: async () => {
    const response = await api.get('/colleges');
    return response.data;
  },

  // Get college by ID
  getCollegeById: async (id) => {
    const response = await api.get(`/colleges/${id}`);
    return response.data;
  },

  // Search colleges
  searchColleges: async (searchParams) => {
    const response = await api.get('/colleges/search', { params: searchParams });
    return response.data;
  },

  // Get college recommendations (requires authentication)
  getRecommendations: async () => {
    const response = await api.get('/colleges/recommendations');
    return response.data;
  },

  // Get colleges by filters
  getCollegesByFilters: async (filters) => {
    const response = await api.get('/colleges/search', { params: filters });
    return response.data;
  },

  // Get colleges by location
  getCollegesByLocation: async (location) => {
    const response = await api.get('/colleges/search', { 
      params: { location } 
    });
    return response.data;
  },

  // Get colleges by type
  getCollegesByType: async (type) => {
    const response = await api.get('/colleges/search', { 
      params: { type } 
    });
    return response.data;
  },

  // Get colleges within budget
  getCollegesByBudget: async (maxTuition) => {
    const response = await api.get('/colleges/search', { 
      params: { maxTuition } 
    });
    return response.data;
  },

  // Get colleges by GPA requirements
  getCollegesByGPA: async (minGpa) => {
    const response = await api.get('/colleges/search', { 
      params: { minGpa } 
    });
    return response.data;
  }
};

export default collegeService; 