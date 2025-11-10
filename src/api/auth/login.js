import axiosInstance from "../axiosInstance";
import { ENDPOINT } from "../endpoint";

export const login = async (body) => {
    const response = await axiosInstance.post(ENDPOINT.LOGIN, body);
    return response.data;
}