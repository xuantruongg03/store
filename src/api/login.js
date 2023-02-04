import axiosClient from "./axiosClient";

const loginAPI = (params) => {
    const url = '/login';
    return axiosClient.post(url, params);
}

const checkTokenAPI = () => {
    const url = '/check-token';
    return axiosClient.get(url);
}

export { loginAPI, checkTokenAPI };