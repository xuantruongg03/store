import axiosClient from "./axiosClient";

const getAllProducts = () => {
  const url = "/get-product-all";
  return axiosClient.get(url);
};

const getProductById = (id) => {
  const url = `/get-product-info?search=${id}`;
  return axiosClient.get(url);
};

const getProductsByType = (type) => {
  const url = `/get-product-type?type=${type}`;
  return axiosClient.get(url);
};

const getProductsSale = () => {
  const url = `/get-product-sale`;
  return axiosClient.get(url);
};

const addLikeProduct = (params) => {
    const url = `/like-product`;
    return axiosClient.post(url, params);
}

const getLikeProduct = () => {
    const url = `/get-like-product`;
    return axiosClient.get(url);
}

const unlikeProduct = (params) => {
    const url = `/unlike-product`;
    return axiosClient.post(url, params);
}

export { getAllProducts, getProductById, getProductsByType, getProductsSale, addLikeProduct, getLikeProduct, unlikeProduct };
