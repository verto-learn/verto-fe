import { useQuery } from "@tanstack/react-query";
import { getUserSession } from "../../api/users/getUserSession";

export const useGetUserSession = () => {
    const { data, isLoading, isError, error } = useQuery({
    queryKey: ["user"],
    queryFn: getUserSession,
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