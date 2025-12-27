import axiosInstance from "../axiosInstance"
import { ENDPOINT } from "../endpoint"

export const getAllUsers = async () => {
    const response = await axiosInstance.get(`${ENDPOINT.ALL_USERS}`)
    return response
}