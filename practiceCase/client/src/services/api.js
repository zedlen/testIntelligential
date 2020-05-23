import axios from "axios";

const AxiosService = axios.create({
  baseURL: process.env.API_URL || 'http://localhost:3001',
  headers: {
    "Content-Type": "application/json"
  }
});

export default AxiosService;

