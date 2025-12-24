import axiosInstance from "../axiosInstance"
import { ENDPOINT } from "../endpoint"

export const postTopic = async (body) => {
    const response = await axiosInstance.post(`${ENDPOINT.TOPICS}`, body);
    return response.data;
}