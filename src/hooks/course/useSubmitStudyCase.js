import { useMutation, useQueryClient } from "@tanstack/react-query";
import { submitStudyCase } from "../../api/course/submitStudyCase";

export const useSubmitStudyCase = () => {
  const queryClient = useQueryClient();

  return useMutation(
    ({ chapterId, payload }) => submitStudyCase(chapterId, payload),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["course"]);
      },
    },
  );
};
