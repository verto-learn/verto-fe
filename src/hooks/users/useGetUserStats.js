import { useQuery } from "@tanstack/react-query";
import { getUserStats } from "../../api/users/getUserStats";

export const useGetUserStats = () => {
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["user-stats"],
        queryFn: getUserStats,
        staleTime: 1000 * 60 * 5,
        cacheTime: 1000 * 60 * 15,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        onError: (err) => {x
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