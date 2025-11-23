import { useEffect, useState } from 'react';
import { QuestionCard } from './QuestionCard';
import { CustomButton } from '@/components/CustomButton';
import { type AnswerState } from '../types/testTypes';
import { FiAlertCircle, FiSave } from 'react-icons/fi';
import { useGetTestToSubmitQuery } from '../api/testApi';
import { BiLoaderAlt } from 'react-icons/bi';

interface TestListProps {
  testId: number;
}

export const TestList = ({ testId }: TestListProps) => {
  const isReadOnly = false;
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

  const handleStateChange = (qId: number, newState: AnswerState) => {
    setAnswersState((prev) => ({ ...prev, [qId]: newState }));
  };

  const handleSaveConfig = () => {
    const payload = Object.entries(answersState).map(([qId, state]) => ({
      question_id: Number(qId),
      mode: state.mode,
      answer: state.mode === 'user' ? state.value : null,
    }));

    console.log('Saving Configuration:', payload);
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
            {(error as any)?.data?.message ||
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
