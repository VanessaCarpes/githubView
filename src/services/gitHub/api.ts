import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.github.com/users/',
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.request) {
      throw new Error('Not found.');
    } else {
      throw new Error('An unexpected error occurred.');
    }
  },
);

export default api;
