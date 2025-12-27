import { submitStudyCase } from "../../api/course/submitStudyCase";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useSubmitStudyCase = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: submitStudyCase,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["course"] });
      queryClient.invalidateQueries({ queryKey: ["user-course"] });
      console.log("Submission success:", data);
    },
    onError: (error) => {
      console.error("Gagal mengirim tugas:", error);
    },
  });
};