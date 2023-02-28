import axios from "axios";

const API_URL = 'http://localhost:8000/api/v1/';
const PRODUCTION_API = "http://localhost:8000/api/v1/"

const axiosInstance = axios.create({
    baseURL: API_URL,
    withCredentials: true
});

export default axiosInstance;