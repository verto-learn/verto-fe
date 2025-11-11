import axiosInstance from "../axiosInstance";
import { ENDPOINT } from "../endpoint";

export const quiz = async (topicId) => {
    const response = await axiosInstance.get(`${ENDPOINT.QUIZ}?topicId=${topicId}`);
    return response.data;
}