import { useQuery } from "@tanstack/react-query";
import { session } from "../../api/users/session";

export const useGetUserSession = () => {
    const { data, isLoading, isError, error } = useQuery({
    queryKey: ["user"],
    queryFn: session,
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