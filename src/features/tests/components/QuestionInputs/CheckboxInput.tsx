import { FiCheck } from 'react-icons/fi';

export const CheckboxInput = ({
  options,
  value = [],
  onChange,
  disabled,
}: {
  options: string[];
  value: string[];
  onChange: (val: string[]) => void;
  disabled: boolean;
}) => {
  const toggleOption = (option: string) => {
    if (value.includes(option)) {
      onChange(value.filter((v) => v !== option));
    } else {
      onChange([...value, option]);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      {options.map((option) => {
        const isSelected = value.includes(option);
        return (
          <label
            key={option}
            className={`relative flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all duration-200
            ${
              isSelected
                ? 'border-primary bg-primary/5'
                : 'border-card-foreground/10 hover:border-card-foreground/30 hover:bg-card-foreground/5'
            }${!disabled ? 'cursor-pointer' : ''}`}
          >
            <input
              type="checkbox"
              checked={isSelected}
              disabled={disabled}
              onChange={() => toggleOption(option)}
              className="hidden"
            />
            <div
              className={`w-5 h-5 rounded border-2 mr-4 flex items-center justify-center transition-colors
              ${isSelected ? 'border-primary bg-primary text-white' : 'border-card-foreground/40'}`}
            >
              {isSelected && <FiCheck size={14} />}
            </div>
            <span
              className={`font-medium ${isSelected ? 'text-primary' : 'text-card-foreground'}`}
            >
              {option}
            </span>
          </label>
        );
      })}
    </div>
  );
};
