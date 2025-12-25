import axiosInstance from "../axiosInstance"
import { ENDPOINT } from "../endpoint"

export const setCompleteChapter = async (chapterId) => {
    const response = await axiosInstance.patch(`${ENDPOINT.COURSE}/${chapterId}`)
    return response
}