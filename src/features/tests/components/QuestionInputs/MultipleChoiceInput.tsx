import type { AnswerState } from '../../types/testTypes';
import { checkIsActive, useChangeMode } from '../../utils/functions';

export const MultupleChoiceInput = ({
  options,
  state,
  onChange,
  disabled,
}: {
  options: string[];
  state: AnswerState;
  onChange: (val: string) => void;
  disabled: boolean;
}) => {
  const isActive = checkIsActive(state.mode);
  useChangeMode(state, onChange);

  return (
    <div className="flex flex-col gap-3">
      {options.map((option) => {
        const isSelected = state.value === option;

        return (
          <label
            key={option}
            className={`relative flex items-center p-4  rounded-xl border-2 cursor-pointer transition-all duration-200 group
          ${isActive ? 'bg-background' : ''}
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
            ${isSelected ? `${isActive ? 'border-primary' : ''}` : 'border-card-foreground/40'}`}
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
};
