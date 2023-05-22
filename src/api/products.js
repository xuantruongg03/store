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

export { getAllProducts, getProductById, getProductsByType, getProductsSale };
