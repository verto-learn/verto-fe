import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { login } from "../../api/auth/login";
import { useFormik } from "formik";
import { Bounce, toast } from "react-toastify";

export const useLogin = () => {
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: (body) => login(body),
    onError: (err) => {
      console.error("Registration error:", err);
      toast.error(`Login error ${err.response.data.message}`, {
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
      const role = res?.data?.role;
      const selectedCourse = res?.data?.selected_courses;

      if (role === "admin") {
        return navigate("/admin/profile");
      }

      if (!selectedCourse) {
        return navigate("/authenticate/quiz");
      }

      toast.success('Login Success!', {
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
      return navigate(`/users/profile`);
    }
  })

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      mutate(values);
    },
  });

  return { formik, isPending };
};
