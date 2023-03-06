
import axiosClient from "./axiosClient"

const checkUserAPI = (params) => {
    const url = "/check-user"
    return axiosClient.post(url, params)
}

const updateUserAPI = (params) => {
    const url = "/update-user"
    return axiosClient.post(url, params)
}

const getUserAPI = () => {
    const url = `/get-user`
    return axiosClient.get(url)
}

const getCapchaAPI = () => {
    const url = `/get-capcha`
    return axiosClient.get(url)
}

const updateEmailAPI = (params) => {
    const url = "/update-email"
    return axiosClient.post(url, params)
}

export { checkUserAPI, updateUserAPI, getUserAPI, getCapchaAPI, updateEmailAPI }