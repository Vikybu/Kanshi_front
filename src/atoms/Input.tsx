import React from "react";

interface InputProps {
  children?: React.ReactNode;
  type: "text" | "password" | "email" | "number" | "time" | "datetime-local";
  identification: string;
  value: string | number;
  onChange?: (value: string) => void;
  disabled?: boolean;
  readOnly?: boolean;
  min?: string;
  layout?: "col" | "row";
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeClasses = {
  sm: "px-2 py-1 text-sm h-8",
  md: "px-4 py-2 text-base h-10",
  lg: "px-5 py-3 text-lg h-12",
};

export const Input = ({
  children,
  type,
  identification,
  value,
  onChange,
  disabled = false,
  readOnly = false,
  min,
  layout = "col",
  size = "md",
  className = "",
}: InputProps) => {
  return (
    <div
      className={`flex ${
        layout === "col"
          ? "flex-col space-y-1"
          : "flex-row items-center space-x-2"
      }`}
    >
      {children && (
        <label
          htmlFor={identification}
          className="font-small-title text-base whitespace-nowrap"
        >
          {children}
        </label>
      )}

      <input
        type={type}
        id={identification}
        name={identification}
        value={value}
        disabled={disabled}
        readOnly={readOnly}
        min={min}
        onChange={onChange ? (e) => onChange(e.target.value) : undefined}
        className={`
          border border-primary rounded-lg
          font-small-title text-base
          focus:outline-none focus:ring-2 focus:ring-primary
          disabled:opacity-50 disabled:cursor-not-allowed
          ${sizeClasses[size]}
          ${className}
        `}
      />
    </div>
  );
};

export default Input;