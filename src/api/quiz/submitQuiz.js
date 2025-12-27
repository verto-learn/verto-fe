import axiosInstance from "../axiosInstance"
import { ENDPOINT } from "../endpoint"

export const submitQuiz = async (body) => {
    const response = await axiosInstance.post(`${ENDPOINT.QUIZ}/submit`, body)
    return response.data
}