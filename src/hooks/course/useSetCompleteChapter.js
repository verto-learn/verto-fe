import { useMutation, useQueryClient } from "@tanstack/react-query";
import { setCompleteChapter } from "../../api/course/setCompleteChapter";


export const useCompleteChapter = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (chapterId) => setCompleteChapter(chapterId),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["course"] }); 
      
      console.log("Chapter marked as complete!", data);
    },
    onError: (error) => {
      console.error("Gagal menyelesaikan chapter:", error);
    },
  });
};