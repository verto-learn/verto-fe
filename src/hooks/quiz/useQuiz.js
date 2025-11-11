import { useQuery } from "@tanstack/react-query";
import { quiz } from "../../api/quiz/quiz";

export const useQuiz = (topicId) => {
  const {
    data,
    isLoading,
    isError,
    error,
    isFetching,
  } = useQuery({
    queryKey: ["quiz", topicId], 
    queryFn: () => quiz(topicId), 
    enabled: !!topicId, 
    onError: (err) => {
      console.error("❌ Error fetching quiz:", err);
    },
  });

  return {
    data: data?.data ?? [],
    isLoading,
    isFetching,
    isError,
    error,
  };
};
