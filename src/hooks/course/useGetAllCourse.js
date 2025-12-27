import { useQuery } from "@tanstack/react-query";
import { getAllCourses } from "../../api/course/getAllCourses";

export const useGetAllCourse = () => {
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["allCourses"],
        queryFn: getAllCourses,
        staleTime: 1000 * 60 * 5,
        cacheTime: 1000 * 60 * 15,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        onError: (err) => {
            console.error("❌ Error fetching topic:", err);
            if (queryOptions.onError) queryOptions.onError?.(err);
        },
    });

    return {
        data,
        isLoading,
        isError,
        error,
    };
}