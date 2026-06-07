import axios from "axios";

const axiosClient = axios.create({
    baseURL: "https://apexcode-production.up.railway.app",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

export default axiosClient;