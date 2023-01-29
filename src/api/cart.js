
import axiosClient from "./axiosClient"

const deleteProductCart = (params) => {
    const url = "/cart/delete-product-cart"
    return axiosClient.post(url, params)
}

const addToCart = (params) => {
    const url = "/add-to-cart"
    return axiosClient.post(url, params)
}

export { deleteProductCart, addToCart }