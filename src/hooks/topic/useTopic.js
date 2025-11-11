import { useQuery } from "@tanstack/react-query";
import { topic } from "../../api/topic/topic";

export const useTopic = () => {
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["topic"],
        queryFn: topic,
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