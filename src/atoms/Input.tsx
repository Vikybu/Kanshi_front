interface InputProps {
    children?:React.ReactNode;
    type: "text" | "password" | "email" | "textarea" | "number" | "time";
    identification: string;
    value: string | number;
    onChange: (value: string) => void;
}

export const Input = ({
    children,
    type,
    identification,
    value,
    onChange,
}: InputProps) => {

    return (
            <div className="flex flex-col space-y-1">
                <label className="text-sm font-family-[--font-family-text] text-text text-center">{children}
                    <input 
                    type={type} 
                    name={identification} 
                    id={identification}
                    value={value}
                    onChange={e => onChange(e.target.value)} 
                    className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-primary"/>
                </label>
            </div>
    )
};