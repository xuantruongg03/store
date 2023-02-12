import axiosClient from "./axiosClient";

const bookingApi = (params) => {
    const url = '/booking';
    return axiosClient.post(url, params);
}

export default bookingApi;