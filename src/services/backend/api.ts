import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api/notes',
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.request) {
      throw new Error('Network error, try again later.');
    } else {
      throw new Error('An unexpected error occurred.');
    }
  },
);

export default api;
