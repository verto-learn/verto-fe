import { useQuery } from "@tanstack/react-query";
import { getAllCourses } from "../../api/course/getAllCourses";

export const useGetAllCourse = () => {
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["allCourses"],
        queryFn: getAllCourses,
        onError: (err) => {
            console.error("❌ Error fetching topic:", err);
        },
    });

    return {
        data,
        isLoading,
        isError,
        error,
    };
}