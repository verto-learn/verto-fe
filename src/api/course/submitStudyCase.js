import axiosInstance from "../axiosInstance";
import { ENDPOINT } from "../endpoint";

export const submitStudyCase = async (chapterId, payload) => {
  const response = await axiosInstance.post(
    `${ENDPOINT.COURSE}/chapter/${chapterId}/study-case`,
    payload,
  );
  return response.data;
};
