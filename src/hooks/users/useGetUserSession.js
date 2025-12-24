import { useQuery } from "@tanstack/react-query";
import { session } from "../../api/users/session";

export const useGetUserSession = (queryOptions = {}) => {
    const { data, isLoading, isError, error } = useQuery({
    queryKey: ["user"],
    queryFn: session,
    staleTime: 1000 * 60 * 5, // 5 minutes
    cacheTime: 1000 * 60 * 15, // 15 minutes
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    ...queryOptions,
    onError: (err) => {
      console.error("❌ Error fetching user session:", err);
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