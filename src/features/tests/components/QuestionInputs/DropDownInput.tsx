import { FiChevronDown } from 'react-icons/fi';

export const DropdownInput = ({
  options,
  value,
  onChange,
  disabled,
}: {
  options: string[];
  value: string;
  onChange: (val: string) => void;
  disabled: boolean;
}) => (
  <div className="relative">
    <select
      value={value}
      disabled={disabled}
      onChange={(e) => onChange(e.target.value)}
      className="w-full p-4 pr-10 rounded-xl bg-background border-2 border-card-foreground/10 
      text-card-foreground appearance-none cursor-pointer focus:border-primary focus:outline-none transition-all"
    >
      <option value="" disabled>
        {disabled
          ? 'AI or Random will generate this answer'
          : 'Choose your Answer'}
      </option>
      {options.map((opt) => (
        <option key={opt} value={opt} className="text-foreground bg-card">
          {opt}
        </option>
      ))}
    </select>
    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-card-foreground/50">
      <FiChevronDown size={20} />
    </div>
  </div>
);
