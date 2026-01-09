interface SelectProps {
  children?: React.ReactNode; // options du select
  label?: string; // texte affiché au-dessus du select
  value: string | number;
  onChange: (value: string) => void;
}

export const Select = ({ children, value, label, onChange }: SelectProps) => {
  return (
    <div className="flex flex-col space-y-1">
      {label && <label className="font-medium">{label}</label>}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border rounded p-1"
      >
        {children}
      </select>
    </div>
  );
};