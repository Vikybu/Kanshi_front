interface Props {
    children?:React.ReactNode;
    type?: "submit" | "reset";
    disabled?: boolean;
    onClick?: () => void; 
}

export const Button = ({
  children,
  type,
  disabled = false,
  onClick,
}: Props) => {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`
        bg-primary size-text text-white font-medium px-6 py-2 rounded-lg
        transition duration-200
        ${disabled
          ? "opacity-50 cursor-not-allowed"
          : "hover:bg-primary/90 cursor-pointer"}
      `}
    >
      {children}
    </button>
  );
};