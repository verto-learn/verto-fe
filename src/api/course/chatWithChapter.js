import axiosInstance from "../axiosInstance";
import { ENDPOINT } from "../endpoint"; 

export const chatWithChapter = async ({ chapterId, question }) => {
  const response = await axiosInstance.post(`${ENDPOINT.COURSE}/chat`, { 
    chapterId, 
    question 
  });
  return response.data;
};