import React from "react";
import { useController } from "react-hook-form";

const Input = ({
  name,
  type = "text",
  control,
  rounded = "rounded-md",
  edit = false,
  ...props
}) => {
  const { field } = useController({
    control: control,
    name: name,
    defaultValue: "",
  });
  return (
    <input
      type={type}
      id={name}
      maxLength={35}
      className={`w-full py-2 px-3 ${rounded} focus:bg-white outline-none ${
        edit
          ? "border-noColor bg-noColor"
          : "border bg-slate-100 focus:border-primary"
      }`}
      {...field}
      {...props}
    />
  );
};

export default Input;
