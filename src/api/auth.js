// src/api/auth.js
import axiosInstance from "./axios";

export const checkAuth = async () => {
  try {
    const res = await axiosInstance.get("/check-auth");
    return res.data;
  } catch (err) {
    return { isAuthenticated: false };
  }
};
