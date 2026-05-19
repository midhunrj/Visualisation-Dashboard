// utils/userInterceptor.ts
import axios from "axios";
import { baseURL } from "./config";

export const userServices = axios.create({
  baseURL: baseURL,
  withCredentials: true, 
  headers: {
    "Content-Type": "application/json",
  }
});
