import axiosInstance from "../axiosInstance";
import { ENDPOINT } from "../endpoint";

export const logout = async () => {
  const response = await axiosInstance.post(ENDPOINT.LOGOUT);
  return response.data;
};