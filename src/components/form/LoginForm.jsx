import React from "react";
import { useFormik } from "formik";
import InputField from "./InputField";
import { useLogin } from "../../hooks/auth/useLogin";

const LoginForm = () => {
  const { formik, isPending } = useLogin();

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
        className={`w-full hover:bg-secondary  transition-all   duration-500 ease-in-out px-6 py-2 rounded-lg border border-secondary flex justify-center items-center ${
          isPending
            ? "bg-gray-600 cursor-not-allowed"
            : "bg-accent hover:bg-accent/80"
        }`}
      >
        {isPending ? "Logging In..." : "Login"}
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
