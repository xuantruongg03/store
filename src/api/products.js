
import axiosClient from "./axiosClient";

const getAllProducts = (params) => {
    const url = '/get-product';
    return axiosClient.get(url, { params });
}

const getProductById = (id) => {
    const url = `/products/${id}`;
    return axiosClient.get(url);
}

export { getAllProducts, getProductById }