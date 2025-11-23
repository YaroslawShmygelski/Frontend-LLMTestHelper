import { answerModes, type AnswerMode } from '../types/testTypes';

interface TestModeSwitcherProps {
  currentMode: AnswerMode;
  onChange: (mode: AnswerMode) => void;
  disabled?: boolean;
}

export const QuestionAnswerSwitcher = ({
  currentMode,
  onChange,
  disabled,
}: TestModeSwitcherProps) => {
  if (disabled) {
    const active = answerModes.find((m) => m.answer_mode === currentMode);
    if (!active) {
      return null;
    }
    return (
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary/10 border border-primary/20">
        <active.icon className="text-primary" />
        <span className="text-sm font-bold text-primary uppercase tracking-wide">
          {active.label} Mode
        </span>
      </div>
    );
  }

  return (
    <div className="flex bg-muted/50 p-1 rounded-xl border border-border/50 w-full sm:w-auto">
      {answerModes.map((mode) => {
        const isActive = currentMode === mode.answer_mode;
        return (
          <button
            key={mode.answer_mode}
            onClick={() => onChange(mode.answer_mode)}
            className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
            ${
              isActive
                ? 'bg-card text-primary shadow-sm ring-1 ring-border'
                : 'text-muted-foreground hover:text-foreground hover:bg-card/50'
            }`}
          >
            <mode.icon className={isActive ? 'text-primary' : 'opacity-70'} />
            <span>{mode.label}</span>
          </button>
        );
      })}
    </div>
  );
};
