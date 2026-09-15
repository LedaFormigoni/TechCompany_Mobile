import axios, { AxiosInstance } from "axios";

const api: AxiosInstance = axios.create({
  baseURL: "http://192.168.1.49:3000",
  timeout: 10000,
  headers: {
  },
});

export default api;
