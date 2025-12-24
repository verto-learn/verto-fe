import axiosInstance from "../axiosInstance"
import { ENDPOINT } from "../endpoint"

export const getAllCourses = async () => {
    const response = await axiosInstance.get(`${ENDPOINT.COURSE}/all-courses`)
    return response
}