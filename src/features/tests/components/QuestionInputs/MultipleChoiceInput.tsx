export const MultupleChoiceInput = ({
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
  <div className="flex flex-col gap-3">
    {options.map((option) => {
      const isSelected = value === option;
      return (
        <label
          key={option}
          className={`relative flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 group
          ${
            isSelected
              ? 'border-primary bg-primary/5'
              : 'border-card-foreground/10 hover:border-card-foreground/30 hover:bg-card-foreground/5'
          }${!disabled ? 'cursor-pointer group' : ''}`}
        >
          <input
            type="radio"
            name="radio-group"
            disabled={disabled}
            value={option}
            checked={isSelected}
            onChange={() => onChange(option)}
            className="hidden"
          />
          <div
            className={`w-5 h-5 rounded-full border-2 mr-4 flex items-center justify-center transition-colors
            ${isSelected ? 'border-primary' : 'border-card-foreground/40'}`}
          >
            {isSelected && (
              <div className="w-2.5 h-2.5 rounded-full bg-primary" />
            )}
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
