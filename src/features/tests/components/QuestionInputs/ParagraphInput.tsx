import { getDisabledClass } from '../../utils/styles';

export const ParagraphInput = ({
  value,
  onChange,
  disabled,
}: {
  value: string;
  onChange: (val: string) => void;
  disabled: boolean;
}) => (
  <textarea
    value={value}
    onChange={(e) => onChange(e.target.value)}
    disabled={disabled}
    placeholder={
      disabled
        ? 'AI or Random will generate this answer'
        : 'Type your answer here...'
    }
    className={`w-full min-h-[120px] p-4 rounded-xl bg-background border-2 border-card-foreground/10 
    text-card-foreground placeholder:text-card-foreground/40 focus:border-primary focus:outline-none 
    transition-all resize-y ${getDisabledClass(disabled)}`}
  />
);
