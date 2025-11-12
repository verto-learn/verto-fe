import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { generateCourse } from "../../api/course/generateCourse";

export const useGenerateCourse = () => {
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            topic_id: "",
            difficulty: "",
        },
        onSubmit: (values) => {
            mutate(values);
        }
    })

    const { mutate, isPending } = useMutation({
        mutationFn: (body) => generateCourse(body),
        onError: (err) => {
            console.error("Failed to generate course. Please try again.", err);
        },
        onSuccess: () => {
            console.log("Course generated successfully!");
            formik.handleReset();
            navigate('/courses/overview');
        }

    })
    
    return { formik, isPending };
}