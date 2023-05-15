import axios from 'axios';
import { parse, stringify } from 'qs';

const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        'content-type': 'application/json',
    },
    paramsSerializer: {
        encode: parse,
        serialize: stringify,
    },
});

const token = localStorage.getItem('token');
if (token) {
    axiosClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}
const refresh_token = localStorage.getItem('refresh_token');
if (refresh_token) {
    axiosClient.defaults.headers.common['refresh_token'] = refresh_token;
}

axiosClient.interceptors.request.use(async (config) => {
    // Handle token here ...
    return config;
});

axiosClient.interceptors.response.use(
    (response) => {
        if (response && response.data) {
            return response.data;
        }

        return response;
    },
    (error) => {
        // Handle errors
        throw error;
    },
);

export default axiosClient;
