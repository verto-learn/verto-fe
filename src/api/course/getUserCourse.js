import axiosInstance from "../axiosInstance"
import { ENDPOINT } from "../endpoint"

export const getUserCourse = async () => {
   const response = await axiosInstance.get(`${ENDPOINT.COURSE}`)
   return response.data
}