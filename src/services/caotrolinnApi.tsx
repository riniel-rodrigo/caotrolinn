import axios from "axios";

const api = axios.create({
  baseURL: "https://caotrolinn-api.onrender.com",
  // baseURL: "http://ipv4:3000",
  // baseURL: 'http://localhost:3000',
  timeout: 2000,
});

export default api;
