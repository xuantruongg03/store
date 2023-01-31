
import axiosClient from "./axiosClient"

const checkUserAPI = (params) => {
    const url = "/check-user"
    return axiosClient.post(url, params)
}

const updateUserAPI = (params) => {
    const url = "/update-user"
    return axiosClient.post(url, params)
}

const getUser = (params) => {
    const { id } = params
    const url = `/get-user/${id}`
    return axiosClient.get(url, params)
}

export { checkUserAPI, updateUserAPI, getUser }