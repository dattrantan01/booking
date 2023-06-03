import React from "react";

const Button = ({
  children,
  onClick,
  rounded = "rounded-lg",
  styleClass,
  isLoading = false,
  type,
}) => {
  return (
    <>
      <button
        className={`px-5 py-3 bg-primary text-white ${rounded} shadow-lg hover:bg-primaryHover hover:-translate-y-[1px] hover:shadow-2xl ${styleClass}`}
        onClick={onClick}
        disabled={isLoading}
        type={type ?? type}
      >
        {isLoading ? (
          <div className="w-9 h-9 border-8 rounded-full border-t-noColor animate-spin border-slate-300"></div>
        ) : (
          children
        )}
      </button>
    </>
  );
};

export default Button;
