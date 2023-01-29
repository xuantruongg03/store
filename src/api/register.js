import axiosClient from "./axiosClient";

const registerAPI = (params) => {
    const url = '/register';
    return axiosClient.post(url, params);
}

export { registerAPI };