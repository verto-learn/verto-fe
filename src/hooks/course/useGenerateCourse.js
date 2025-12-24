import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { generateCourse } from "../../api/course/generateCourse";
import { Bounce } from "react-toastify";

export const useGenerateCourse = () => {
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            topic_id: "",
            difficulty: "beginner",
        },
        onSubmit: (values) => {
            mutate(values);
        }
    })

    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationFn: (body) => generateCourse(body),
        onError: (err) => {
            console.error("Failed to generate course. Please try again.", err);
        },
        onSuccess: (data) => {
            console.log("Course generated successfully!", data);
            toast.success('Course Generated!', {
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
            formik.handleReset();
            // const courseId = data?.data?.id;
            // queryClient.invalidateQueries(["course"]);

            // if (courseId) {
            //     setTimeout(() => navigate(`/courses/${courseId}`), 500);
            // } else {
            //     setTimeout(() => navigate(`/courses/${courseId}`), 500);
            // }
        }

    })

    return { formik, isPending };
}