import axiosInstance from "../axiosInstance";
import { ENDPOINT } from "../endpoint";

export const submitStudyCase = async ({ chapterId, proof_url, notes }) => {
  const response = await axiosInstance.post(`${ENDPOINT.COURSE}/chapter/${chapterId}/study-case`, {
    proof_url,
    notes,
  });
  return response.data;
};
