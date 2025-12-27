import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import { submitQuiz } from "../../api/quiz/submitQuiz";


export const useSubmitQuiz = (onSuccessCallback) => {
  
  const mutation = useMutation({
    mutationFn: submitQuiz,
    onSuccess: (data) => {
      if (onSuccessCallback) {
        onSuccessCallback(data);
      }
      alert("Quiz berhasil dikirim!");
    },
    onError: (error) => {
      console.error("Quiz submission failed", error);
      const msg = error.response?.data?.message || "Gagal mengirim quiz";
      alert(msg);
    },
  });

  const formik = useFormik({
    initialValues: {
      topicId: "",
      answers: [], 
    },
    onSubmit: (values) => {
      // Validasi sederhana
      if (!values.topicId) {
        alert("Terjadi kesalahan: Topik tidak ditemukan");
        return;
      }
      if (values.answers.length === 0) {
        alert("Isi minimal satu jawaban!");
        return;
      }
      
      // Kirim data ke API
      mutation.mutate(values);
    },
  });

  return {
    formik,
    submitQuiz: formik.handleSubmit, // Expose fungsi submit formik
    data: mutation.data,             // Response dari backend (score, assigned_course)
    isPending: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
  };
};