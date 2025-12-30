import { useQuery } from "@tanstack/react-query";
import { getLeaderboard } from "../../api/course/getLeaderboard";

export const useGetLeaderboard = () => {
    return useQuery({
        queryKey: ['leaderboard'],
        queryFn: () => getLeaderboard(),
        staleTime: 1000 * 60 * 5,
        cacheTime: 1000 * 60 * 15,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
    });
}