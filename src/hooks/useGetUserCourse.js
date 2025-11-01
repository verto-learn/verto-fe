import { useQuery } from "@tanstack/react-query"
import { getUserCourse } from "../api/course/getUserCourse"

export const useGetUserCourse = () => {
    const { data, isLoading, isError, error } = useQuery({
    queryKey: ["course"],
    queryFn: getUserCourse,
    onError: (err) => {
      console.error("❌ Error fetching courses:", err);
    },
  });

  return {
    data,
    isLoading,
    isError,
    error,
  };
}