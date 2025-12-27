import { useQuery } from "@tanstack/react-query"
import { getUserCourse } from "../../api/course/getUserCourse"

export const useGetUserCourse = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["course"],
    queryFn: getUserCourse,
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 15,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
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