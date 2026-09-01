import axios, { AxiosInstance } from "axios";

const api: AxiosInstance = axios.create({
  baseURL: "http://192.168.1.26:3000",
  timeout: 5000,
  headers: {
  },
});

export default api;
