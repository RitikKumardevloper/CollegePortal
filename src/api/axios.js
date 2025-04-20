// src/api/axios.js
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000", // or whatever your backend URL is
  withCredentials: true, // to send cookies with the requests
});

export default axiosInstance;  // Make sure it is a default export
