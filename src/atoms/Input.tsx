interface InputProps {
    children?:React.ReactNode;
    type: "text" | "password" | "email" | "textarea" | "number" | "time" |"datetime-local";
    identification: string;
    value: string | number;
    onChange?: (value: string) => void;
    disabled?: boolean;
    readOnly?: boolean;
    min?: string;
    layout?: "col" | "row";
}

export const Input = ({
    children,
    type,
    identification,
    value,
    onChange,
    disabled,
    readOnly,
    min,
    layout = "col", 
}: InputProps) => {

    return (
        <div className={`flex ${layout === "col" ? "flex-col space-y-1" : "flex-row items-center space-x-2"}`}>
            <label htmlFor={identification} className="size-text font-family-[--font-family-text] text-text whitespace-nowrap">
                {children}
            </label>
            <input
                type={type}
                id={identification}
                name={identification}
                value={value}
                disabled={disabled}
                readOnly={readOnly}
                min={min}
                onChange={onChange ? (e) => onChange(e.target.value) : undefined}
                className="border border-primary rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-primary size-text"
            />
        </div>
    )
};

export default Input;