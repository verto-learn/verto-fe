import { course } from "../../data/course"

export const getUserCourse = async () => {
    await new Promise((resolve) => setTimeout(resolve, 600));
    return course
}