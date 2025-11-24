import { useEffect } from 'react';
import type { AnswerMode, AnswerState } from '../types/testTypes';

export const checkIsActive = (stateMode: AnswerMode): boolean => {
  return stateMode === 'user';
};

export const useChangeMode = <T>(
  state: AnswerState,
  onChange: (val: T) => void
) => {
  useEffect(() => {
    if (state.mode !== 'user' && state.value.length > 0) {
      const emptyValue = Array.isArray(state.value) ? [] : '';

      onChange(emptyValue as unknown as T);
    }
  }, [state.value, state.mode, onChange]);
};
