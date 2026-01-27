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
      {label && <label className="font-small-title text-base">{label}</label>}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border border-black rounded p-1 font-small-title text-base text-text"
      >
        {children}
      </select>
    </div>
  );
};