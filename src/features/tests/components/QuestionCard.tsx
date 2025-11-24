import { ParagraphInput } from './QuestionInputs/ParagraphInput';
import { MultupleChoiceInput } from './QuestionInputs/MultipleChoiceInput';
import { DropdownInput } from './QuestionInputs/DropDownInput';
import { CheckboxInput } from './QuestionInputs/CheckboxInput';
import type { AnswerMode, AnswerState, Question } from '../types/testTypes';
import { QuestionAnswerSwitcher } from './QuestionAnswerSwitcher';

interface QuestionCardProps {
  data: Question;
  state: AnswerState;
  onStateChange: (newState: AnswerState) => void;
  isReadOnly?: boolean;
}

export const QuestionCard = ({
  data,
  state,
  onStateChange,
  isReadOnly = true,
}: QuestionCardProps) => {
  const handleModeChange = (newMode: AnswerMode) => {
    if (isReadOnly) return;
    onStateChange({ ...state, mode: newMode });
  };

  const handleValueChange = (newValue: string | string[]) => {
    onStateChange({ ...state, value: newValue });
  };

  const isInputDisabled = isReadOnly || state.mode !== 'user';

  const renderInput = () => {
    const commonProps = {
      state: state,
      onChange: handleValueChange,
      disabled: isInputDisabled,
      options: data.options || [],
    };

    switch (data.type.type_id) {
      case 1: {
        const singleVal = Array.isArray(state.value) ? '' : state.value;
        return <ParagraphInput {...commonProps} value={singleVal || ''} />;
      }
      case 2: {
        return <DropdownInput {...commonProps} state={state} />;
      }
      case 3: {
        return <MultupleChoiceInput {...commonProps} state={state} />;
      }
      case 4: {
        return (
          <CheckboxInput
            {...commonProps}
            state={state}
            onChange={(newVal: string[]) => handleValueChange(newVal)}
          />
        );
      }

      default:
        return <p className="text-error">Unknown type</p>;
    }
  };

  return (
    <div className="w-full bg-card p-6 rounded-2xl shadow-lg border border-card-foreground/5 transition-all">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-bold text-card-foreground/40 uppercase tracking-wider bg-card-foreground/5 px-2 py-0.5 rounded">
              {data.type.description}
            </span>
            {data.required && (
              <span className="text-xs font-bold text-red-500 uppercase tracking-wider bg-red-500/10 px-2 py-0.5 rounded">
                Required
              </span>
            )}
          </div>
          <h3 className="text-xl font-bold text-card-foreground leading-snug">
            {data.question}
          </h3>
        </div>
        <div className="shrink-0">
          <QuestionAnswerSwitcher
            currentMode={state.mode}
            onChange={handleModeChange}
            disabled={isReadOnly}
          />
        </div>
      </div>
      <div className="relative">
        {renderInput()}
        {isInputDisabled && !isReadOnly && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none"></div>
        )}
      </div>
    </div>
  );
};
