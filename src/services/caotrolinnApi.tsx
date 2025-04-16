import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.1.2:3000",
  // baseURL: 'http://localhost:3000',
  timeout: 2000,
});

export default api;
