import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik"
import { useNavigate } from "react-router-dom"; 
import { register } from "../../api/auth/register";

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
        },
        onSuccess: () => {
            console.log("Account created successfully!")
            formik.handleReset()
            navigate('/authenticate/login')
        },
    })

    return { formik, isPending }
  
};
