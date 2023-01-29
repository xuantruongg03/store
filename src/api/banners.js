
import axiosClient from "./axiosClient";

const bannerAPI = {
  getBanners: (params) => {
    const url = '/get-banners';
    return axiosClient.get(url, { params });
  },
}

export default bannerAPI;