import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { login } from "../../api/auth/login";
import { useFormik } from "formik";

export const useLogin = () => {
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: (body) => login(body),
    onError: (err) => {
      console.error("Registration error:", err);
    },
    onSuccess: (res) => {
      const role = res?.data?.role;
      const selectedCourse = res?.data?.selectedCourse;

      if (role === "admin") {
        return navigate("/admin/profile");
      }

      if (!selectedCourse) {
        return navigate("/authenticate/quiz");
      }

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
