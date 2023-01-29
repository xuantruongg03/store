
import axiosClient from "./axiosClient"

const checkUserAPI = (params) => {
    const url = "/check-user"
    return axiosClient.post(url, params)
}

export { checkUserAPI }