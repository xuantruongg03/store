import axiosClient from "./axiosClient";

const loginAPI = (params) => {
    const url = '/login';
    return axiosClient.post(url, params);
}

export { loginAPI };