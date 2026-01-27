interface Props {
  children?: React.ReactNode;
  type?: "submit" | "reset" | "button";
  disabled?: boolean;
  showButton?: boolean;
  onClick?: () => void;
  className?: string;
  variant?: "primary" | "outline" | "danger";
}

export const Button = ({
  children,
  type = "button",
  disabled = false,
  showButton = true,
  onClick,
  className = "",
}: Props) => {
  if (!showButton) return null;

  const hasCustomPadding =
    className.includes("px-") || className.includes("py-");

  const hasCustomBg = className.includes("bg-");

  const defaultPadding = hasCustomPadding ? "" : "px-6 py-2";

  const defaultBg = hasCustomBg
    ? ""
    : "bg-primary hover:bg-primary/90";

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`
        ${defaultBg}
        text-secondary font-small-title rounded-lg
        ${defaultPadding}
        text-l transition duration-200
        ${
          disabled
            ? "opacity-50 cursor-not-allowed"
            : "cursor-pointer"
        }
        ${className}
      `}
    >
      {children}
    </button>
  );
};

export default Button;
