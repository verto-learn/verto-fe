import axiosInstance from "../axiosInstance"
import { ENDPOINT } from "../endpoint"

export const publishCourse = async ({ courseId, isPublished }) => {
    const response = await axiosInstance.patch(`${ENDPOINT.COURSE}/${courseId}/publish`,
        {
            is_published: isPublished,
        }
    )

    return response;
}