
import axiosClient from "./axiosClient";

const getBannersAPI = () => {
    const url = '/get-banners';
    return axiosClient.get(url);
}

export { getBannersAPI };