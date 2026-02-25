import { useState } from 'react';
import { QuestionCard } from './QuestionCard';
import { CustomButton } from '@/components/CustomButton';
import { type AnswerState, type TestStructure } from '../types/testTypes';
import { QuantityInput } from './QuantityInput';
import { FiSave } from 'react-icons/fi';
import type { SubmitTestRequest } from '../types/apiTypes';
import { StatusAlert } from '@/components/StatusAlert';
import { Loader } from '@/components/Loader';
import { useSubmitTestMutation } from '../api/testApi';
import { useStatusAlert } from '@/hooks/useStatusAlert';
import { DocumentUpload } from './DocumentUpload';

interface TestListProps {
  testId: number;
  title: string;
  isSubmitted: boolean;
  testStructure: TestStructure;
}

export const TestList = ({ testId, title, testStructure }: TestListProps) => {
  const [quantity, setQuantity] = useState<number | ''>(1);
  const isReadOnly = false;
  const [answersState, setAnswersState] = useState<Record<number, AnswerState>>(
    {}
  );

  const handleStateChange = (qId: number, newState: AnswerState) => {
    setAnswersState((prev) => ({ ...prev, [qId]: newState }));
  };
  const [submitConfig, { isLoading, error: apiError }] =
    useSubmitTestMutation();

  const alert = useStatusAlert(apiError);

  const handleSaveConfig = async () => {
    const answersPayload: SubmitTestRequest = {
      testId: testId,
      payload: {
        quantity: quantity,
        answers: Object.entries(answersState).map(([qId, config]) => ({
          question_id: Number(qId),
          answer_mode: config.mode,
          answer: config.mode === 'user' ? config.value : null,
        })),
      },
    };

    try {
      const response = await submitConfig({
        payload: answersPayload.payload,
        testId: answersPayload.testId,
      }).unwrap();
      alert.showSuccess('Test Solved successfully, you can observe it');
      console.log(response);
    } catch (e) {
      console.error('Save failed', e);
    }

    console.log('Saving Configuration:', answersPayload);
  };

  if (isLoading) {
    return <Loader fullScreen text="Loading Test Configuration..." />;
  }

  return (
    <>
      <StatusAlert
        {...alert.props}
        action={
          alert.isSuccess
            ? {
                label: 'Continue',
                onClick: () => alert.handleSuccessAction(`/test/1`),
              }
            : undefined
        }
      />
      <div className="min-h-screen bg-background py-12 px-4 flex justify-center">
        <div className="w-full max-w-4xl space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-card-foreground/10 pb-6">
            <div>
              <h1 className="text-3xl sm:text-4xl font-black text-card-foreground">
                {title}
              </h1>
              <p className="text-card-foreground/60 mt-2 text-lg">
                {isReadOnly
                  ? `Viewing results for Test #${testId}`
                  : 'Choose how each question should be answered: by You, AI, or Randomly.'}
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <DocumentUpload testId={testId} />
            <QuantityInput value={quantity} onChange={setQuantity} />
            {testStructure.questions.map((q) => {
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
                  onStateChange={(newState) =>
                    handleStateChange(q.id, newState)
                  }
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
    </>
  );
};
