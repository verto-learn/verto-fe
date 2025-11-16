import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik"
import { useNavigate } from "react-router-dom";
import { register } from "../../api/auth/register";
import { Bounce, toast } from "react-toastify";

export const useRegister = () => {
    const navigate = useNavigate()


    const formik = useFormik({
        initialValues: {
            full_name: "",
            email: "",
            password: ""
        },
        onSubmit: (values) => {
            mutate(values)
        },

    })

    const { mutate, isPending } = useMutation({
        mutationFn: (body) => register(body),
        onError: (err) => {
            console.error("Failed to create account. Please try again.", err)
            toast.error(`Register error ${err.response.data.message}`, {
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
        onSuccess: () => {
            console.log("Account created successfully!")
            toast.success('Register Success!', {
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
            formik.handleReset()
            navigate('/authenticate/login')
        },
    })

    return { formik, isPending }

};
