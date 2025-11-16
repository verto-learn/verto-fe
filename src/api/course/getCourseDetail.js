import axiosInstance from "../axiosInstance";
import { ENDPOINT } from "../endpoint";

export const getCourseDetail = async (id) => {
  const response = await axiosInstance.get(`${ENDPOINT.COURSE}/${id}`);
  return response.data;
};
