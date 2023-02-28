import axios from "axios";

const API_URL = 'http://localhost:8000/api/v1/';
const PRODUCTION_API = "https://displaylab-back-final-production.up.railway.app/api/v1/"

const axiosInstance = axios.create({
    baseURL: PRODUCTION_API,
    withCredentials: true
});

export default axiosInstance;