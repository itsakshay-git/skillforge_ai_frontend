import axios from "axios"

export const axiosInstance = axios.create({
  baseURL: "https://skillforge-ai-backend.onrender.com/api",
  // baseURL: "http://localhost:5000/api",
  withCredentials: true,
})
