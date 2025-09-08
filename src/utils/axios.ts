import axios from "axios";

// Create an Axios instance
const axiosInstance = axios.create({
    baseURL: "https://jobplus-backend-production.up.railway.app/",
    withCredentials: false,
    headers: {
        "Content-Type": "application/json",
    },
});


// Request interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token && config.withCredentials !== false) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        if (config.withCredentials !== false) {
            config.withCredentials = true;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error) {
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;