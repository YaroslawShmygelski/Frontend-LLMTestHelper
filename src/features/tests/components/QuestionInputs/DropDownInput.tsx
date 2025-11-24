import { FiChevronDown } from 'react-icons/fi';
import type { AnswerState } from '../../types/testTypes';
import { checkIsActive, useChangeMode } from '../../utils/functions';

export const DropdownInput = ({
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
    <div className="relative">
      <select
        value={state.value}
        disabled={disabled || !isActive}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full p-4 pr-10 rounded-xl border-2 border-card-foreground/10 
          text-card-foreground appearance-none cursor-pointer focus:border-primary focus:outline-none transition-all
          ${isActive ? 'bg-background' : ''}`}
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
};
