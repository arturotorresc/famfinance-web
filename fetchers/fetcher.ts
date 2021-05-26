import axios from "axios";

const fetcher = axios.create({
  baseURL: process.env.BACKEND_URL,
  withCredentials: true,
});

export default fetcher;
