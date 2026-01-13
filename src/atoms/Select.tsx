interface SelectProps {
  children?: React.ReactNode;
  label?: string;
  value: string | number;
  layout?: "col" | "row";
  onChange: (value: string) => void;
}

export const Select = ({ children, value, label, onChange, layout = "col",  }: SelectProps) => {
  return (
    <div className={`flex ${layout === "col" ? "flex-col space-y-1" : "flex-row items-center space-x-2"}`}>
      {label && <label className="font-family-[--font-family-text] text-text size-text">{label}</label>}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border rounded p-1 font-family-[--font-family-text] text-text size-text"
      >
        {children}
      </select>
    </div>
  );
};