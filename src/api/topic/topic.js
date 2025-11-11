import axiosInstance from "../axiosInstance";
import { ENDPOINT } from "../endpoint";

export const topic = async () => {
    const response = await axiosInstance.get(ENDPOINT.TOPICS);
    return response.data;
}