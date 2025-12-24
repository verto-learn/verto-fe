import { useFormik } from "formik";
import { useMutation } from "@tanstack/react-query";
import { postTopic } from "../../api/topic/postTopic";
import { toast } from "react-toastify";

export const useCreateTopic = () => {

    const { mutate, isPending } = useMutation({
        mutationFn: (body) => postTopic(body),
        onError: (err) => {
            console.error("Create Topic error:", err);
            toast.error(`Create Topic error ${err.response.data.message}`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
        },
        onSuccess: (res) => {
            toast.success('Topic Created Successfully!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
        }
    });


      const formik = useFormik({
        initialValues: {
          name: "",
          description: "",
        },
        onSubmit: (values) => {
          mutate(values);
        },
      });
    
      return { formik, isPending };
}