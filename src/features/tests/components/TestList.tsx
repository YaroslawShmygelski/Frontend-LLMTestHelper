import { useEffect, useState } from 'react';
import { QuestionCard } from './QuestionCard';
import { CustomButton } from '@/components/CustomButton';
import { type AnswerState } from '../types/testTypes';
import { FiAlertCircle, FiCopy, FiMinus, FiPlus, FiSave } from 'react-icons/fi';
import { useGetTestToSubmitQuery } from '../api/testApi';
import { BiLoaderAlt } from 'react-icons/bi';
import type { ApiErrorResponse } from '@/types/types';
import { TEST_MAX_RUNS } from '@/utils/constants';

interface TestListProps {
  testId: number;
}

export const TestList = ({ testId }: TestListProps) => {
  const isReadOnly = false;
  const [quantity, setQuantity] = useState<number | ''>(1);
  const [answersState, setAnswersState] = useState<Record<number, AnswerState>>(
    {}
  );

  const { data, isLoading, isError, error } = useGetTestToSubmitQuery(testId);
  useEffect(() => {
    if (data) {
      const initial: Record<number, AnswerState> = {};

      data.test_structure.questions.forEach((q) => {
        const initialValue = q.type.type_id === 4 ? [] : '';

        initial[q.id] = {
          mode: 'user',
          value: initialValue,
        };
      });

      setAnswersState(initial);
    }
  }, [data]);

  const incrementQty = () => {
    setQuantity((prev) =>
      typeof prev === 'number' ? Math.min(prev + 1, TEST_MAX_RUNS) : 1
    );
  };

  const decrementQty = () => {
    setQuantity((prev) =>
      typeof prev === 'number' ? Math.max(prev - 1, 1) : 1
    );
  };

  const handleStateChange = (qId: number, newState: AnswerState) => {
    setAnswersState((prev) => ({ ...prev, [qId]: newState }));
  };

  const handleQtyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val === '') {
      setQuantity('');
      return;
    }
    const num = parseInt(val);
    if (!isNaN(num)) {
      if (num <= TEST_MAX_RUNS) setQuantity(num);
    }
  };

  const handleQtyBlur = () => {
    if (quantity === '' || quantity < 1) {
      setQuantity(1);
    }
  };

  const handleSaveConfig = () => {
    const answersPayload = Object.entries(answersState).map(([qId, state]) => ({
      question_id: Number(qId),
      mode: state.mode,
      answer: state.mode === 'user' ? state.value : null,
    }));

    const finalPayload = {
      test_id: testId,
      quantity: quantity,
      answers: answersPayload,
    };

    console.log('Saving Configuration:', finalPayload);
    alert(
      'Settings saved. API will process questions based on selected modes.'
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-background">
        <BiLoaderAlt className="text-5xl text-primary animate-spin" />
        <p className="text-muted-foreground font-medium animate-pulse">
          Loading Test Configuration...
        </p>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-background">
        <div className="text-center space-y-4 max-w-md">
          <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
            <FiAlertCircle className="text-3xl text-red-500" />
          </div>
          <h2 className="text-2xl font-bold text-foreground">
            Failed to load test
          </h2>
          <p className="text-muted-foreground">
            {(error as ApiErrorResponse)?.data?.message ||
              'Something went wrong while fetching the test data.'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12 px-4 flex justify-center">
      <div className="w-full max-w-4xl space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-card-foreground/10 pb-6">
          <div>
            <h1 className="text-3xl sm:text-4xl font-black text-card-foreground">
              {isReadOnly ? 'Test History' : 'Configure Test Answers'}
            </h1>
            <p className="text-card-foreground/60 mt-2 text-lg">
              {isReadOnly
                ? `Viewing results for Test #${testId}`
                : 'Choose how each question should be answered: by You, AI, or Randomly.'}
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-4 bg-card rounded-xl px-4 py-2 border border-card-foreground/5 w-full sm:w-auto justify-between shadow-sm">
            <div className="flex items-center gap-2 text-card-foreground/70 font-medium whitespace-nowrap">
              <FiCopy />
              <span>Test Runs:</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={decrementQty}
                disabled={quantity === 1}
                className="w-8 h-8 flex items-center justify-center rounded-lg bg-card border border-card-foreground/10 hover:bg-muted transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-card-foreground active:scale-95"
              >
                <FiMinus size={14} />
              </button>

              <div className="relative w-12 h-8">
                <input
                  type="number"
                  value={quantity}
                  onChange={handleQtyChange}
                  onBlur={handleQtyBlur}
                  className="w-full h-full text-center bg-background rounded-xl font-bold text-lg text-foreground outline-none border-none p-0 
                      [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
              </div>

              <button
                onClick={incrementQty}
                disabled={quantity === 100}
                className="w-8 h-8 flex items-center justify-center rounded-lg bg-card border border-card-foreground/10 hover:bg-muted transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-card-foreground active:scale-95"
              >
                <FiPlus size={14} />
              </button>
            </div>
          </div>

          {data.test_structure.questions.map((q) => {
            const fallbackValue = q.type.type_id === 4 ? [] : '';

            const currentState = answersState[q.id] || {
              mode: 'user',
              value: fallbackValue,
            };

            return (
              <QuestionCard
                key={q.id}
                data={q}
                state={currentState}
                onStateChange={(newState) => handleStateChange(q.id, newState)}
                isReadOnly={isReadOnly}
              />
            );
          })}
        </div>
        {!isReadOnly && (
          <div className="sticky bottom-6 z-20">
            <div className="bg-card/80 backdrop-blur-lg border border-card-foreground/10 p-4 rounded-2xl shadow-2xl flex justify-between items-center gap-4">
              <div className="text-sm text-card-foreground/60 font-medium pl-2 hidden sm:block">
                Ready to process?
              </div>
              <div className="w-full sm:w-48">
                <CustomButton onClick={handleSaveConfig} icon={<FiSave />}>
                  Save Config
                </CustomButton>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
