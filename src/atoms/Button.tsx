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
  type,
  disabled = false,
  showButton = true,
  onClick,
  className = "",
}: Props) => {
  if (!showButton) return null;

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`
        ${className} 
        bg-primary text-secondary font-small-title rounded-lg 
        px-6 py-2 text-l
        transition duration-200
        ${disabled ? "opacity-50 cursor-not-allowed" : "hover:bg-primary/90 cursor-pointer"}
      `}
    >
      {children}
    </button>
  );
};

export default Button;