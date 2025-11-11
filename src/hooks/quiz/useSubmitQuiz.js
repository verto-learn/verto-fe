import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import { submit } from "../../api/quiz/submit";

export const useSubmitQuiz = (onSuccessCallback) => {
  const { mutate, isPending, data, isSuccess, isError, error, reset } = useMutation({
    mutationFn: (body) => submit(body),
    onSuccess: (res) => {
      console.log("✅ Quiz submitted:", res);
      onSuccessCallback?.(res);
    },
    onError: (err) => {
      console.error("❌ Quiz submit failed:", err);
    },
  });

  const formik = useFormik({
    initialValues: {
      topicId: "",
      answers: [], 
    },
    onSubmit: (values) => {
    
      const payload = {
        topicId: values.topicId,
        answers: values.answers.map((a) => ({
          questionId: a.questionId,
          answerIndex: a.answerIndex,
        })),
      };

      mutate(payload);
    },
  });

  return {
    formik,
    mutate,
    isPending,
    isSuccess,
    isError,
    data,
    error,
    reset,
  };
};
