import axiosInstance from "../axiosInstance"
import { ENDPOINT } from "../endpoint"

export const generateCourse = async (body) => {
    const response = await axiosInstance.post(`${ENDPOINT.COURSE}`, body)
    return response.data
}