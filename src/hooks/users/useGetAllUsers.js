import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "../../api/users/getAllUsers";

export const useGetAllUsers = () => {
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["all-users"],
        queryFn: getAllUsers,
        staleTime: 1000 * 60 * 5,
        cacheTime: 1000 * 60 * 15,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
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