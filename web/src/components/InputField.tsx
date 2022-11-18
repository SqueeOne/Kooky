import { useField } from "formik";
import React, { InputHTMLAttributes } from "react";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  name: string;
  textarea?: boolean;
};

export const InputField: React.FC<InputFieldProps> = ({
  label,
  textarea,
  size: _,
  ...props
}) => {
  const [field, { error }] = useField(props);
  return (
    <div className="mb-4">
      <label
        className="block text-gray-700 text-sm font-bold mb-2"
        htmlFor={field.name}
      >
        {label}
      </label>
      <input
        {...field}
        {...props}
        id={field.name}
        className="w-full p-3 rounded-lg bg-gray-200 shadow-inner border border-gray-300"
      />
    </div>
  );
};
