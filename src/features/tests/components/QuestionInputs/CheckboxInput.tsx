import { FiCheck } from 'react-icons/fi';
import type { AnswerState } from '../../types/testTypes';
import { checkIsActive, useChangeMode } from '../../utils/functions';

export const CheckboxInput = ({
  options,
  state,
  onChange,
  disabled,
}: {
  options: string[];
  state: AnswerState;
  onChange: (val: string[]) => void;
  disabled: boolean;
}) => {
  useChangeMode(state, onChange as (val: string[]) => void);
  const toggleOption = (option: string) => {
    const val = state.value as string[];

    if (val.includes(option)) {
      onChange(val.filter((v) => v !== option));
    } else {
      onChange([...val, option]);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      {options.map((option) => {
        const isSelected = state.value.includes(option);
        const isActive = checkIsActive(state.mode);
        return (
          <label
            key={option}
            className={`relative flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all duration-200

            ${
              isSelected
                ? 'border-primary bg-primary/5'
                : `border-card-foreground/10 ${isActive ? 'bg-background hover:border-card-background/30 hover:bg-background/5' : ''}`
            }
            ${!disabled ? 'cursor-pointer' : ''}`}
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
              ${isSelected ? 'border-primary bg-primary text-primary-foreground' : 'border-card-foreground/40'}`}
            >
              {isSelected && isActive && <FiCheck size={14} />}
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
