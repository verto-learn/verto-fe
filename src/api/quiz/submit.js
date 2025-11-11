import axiosInstance from "../axiosInstance"
import { ENDPOINT } from "../endpoint"

export const submit = async (body) => {
    const response = await axiosInstance.post(`${ENDPOINT.QUIZ}/submit`, body)
    return response.data
}