
import axiosClient from "./axiosClient"

const checkUserAPI = (params) => {
    const url = "/check-user"
    return axiosClient.post(url, params)
}

const updateUserAPI = (params) => {
    const url = "/update-user"
    return axiosClient.post(url, params)
}

const getUser = (customer_id) => {
    const url = `/get-user`
    return axiosClient.get(url)
}

export { checkUserAPI, updateUserAPI, getUser }