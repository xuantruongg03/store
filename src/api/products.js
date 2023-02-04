
import axiosClient from "./axiosClient";

const getAllProducts = (params) => {
    const url = '/get-product-all';
    return axiosClient.get(url, { params });
}

const getProductById = (id) => {
    const url = `/get-product-info?product_id=${id}`;
    return axiosClient.get(url);
}

export { getAllProducts, getProductById }