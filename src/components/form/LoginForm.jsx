import React from "react";
import { useFormik } from "formik";
import InputField from "./InputField";
import { useLogin } from "../../hooks/auth/useLogin";

const LoginForm = () => {
  const { mutate, isPending } = useLogin();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      mutate(values);
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className=" w-full max-w-md p-8 rounded-2xl shadow-2xl bg-primary/70 border border-gray-700 backdrop-blur-md space-y-6"
    >
      <div className="text-center mb-4">
        <h2 className="text-3xl font-semibold text-white">Login</h2>
        <p className="text-gray-400 text-sm mt-1">
            Welcome back! Please login to your account.
        </p>
      </div>

      <InputField
        label="Email"
        name="email"
        type="email"
        placeholder="Enter email"
        value={formik.values.email}
        onChange={formik.handleChange}
      />

      <InputField
        label="Password"
        name="password"
        type="password"
        placeholder="Enter password"
        value={formik.values.password}
        onChange={formik.handleChange}
      />

      <button
        type="submit"
        disabled={isPending}
        className={`w-full py-3 rounded-lg font-medium text-white transition ${
          isPending
            ? "bg-gray-600 cursor-not-allowed"
            : "bg-accent hover:bg-accent/80"
        }`}
      >
        {isPending ? "Registering..." : "Register"}
      </button>

      <p className="text-center text-gray-400 text-sm">
       Didn't have an account?{" "}
        <a href="/authenticate/register" className="text-accent hover:underline">
          Register
        </a>
      </p>
    </form>
  );
};

export default LoginForm;
