// src/components/form/InputField.jsx
import React from "react";

const InputField = ({ label, name, type = "text", value, onChange, placeholder }) => {
  return (
    <div className="space-y-1">
      <label htmlFor={name} className="block text-sm font-medium text-gray-100">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full rounded-lg border border-gray-600 bg-gray-900/60 text-gray-100 placeholder-gray-400 p-3 focus:outline-none focus:ring-2 focus:ring-accent transition"
      />
    </div>
  );
};

export default InputField;
