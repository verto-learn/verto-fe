// src/components/form/RegisterForm.jsx
import React from "react";
import { useFormik } from "formik";
import { useRegister } from "../../hooks/auth/useRegister";
import InputField from "./InputField";

const RegisterForm = () => {
  const { mutate, isPending } = useRegister();

  const formik = useFormik({
    initialValues: {
      username: "",
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
        <h2 className="text-3xl font-semibold text-white">Register</h2>
        <p className="text-gray-400 text-sm mt-1">
         Create your account to get started!
        </p>
      </div>

      <InputField
        label="Username"
        name="username"
        placeholder="Enter username"
        value={formik.values.username}
        onChange={formik.handleChange}
      />

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
        className={`w-full hover:bg-secondary  transition-all   duration-500 ease-in-out px-6 py-2 rounded-lg border border-secondary flex justify-center items-center ${
          isPending
            ? "bg-gray-600 cursor-not-allowed"
            : "bg-accent hover:bg-accent/80"
        }`}
      >
        {isPending ? "Registering..." : "Register"}
      </button>

      <p className="text-center text-gray-400 text-sm">
        Already have an account?{" "}
        <a href="/authenticate/login" className="text-accent hover:underline">
          Login
        </a>
      </p>
    </form>
  );
};

export default RegisterForm;
