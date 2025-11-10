import axiosInstance from "../axiosInstance";
import { ENDPOINT } from "../endpoint";

export const register = async (body) => {
    const response = await axiosInstance.post(ENDPOINT.REGISTER, body);
    return response.data;
}