import { TestList } from '@/features/tests/components/TestList';
import { useParams } from 'react-router';

export const TestOverview = () => {
  const { id } = useParams<{ id: string }>();
  const numericId = Number(id);
  if (!id || isNaN(numericId)) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500 font-bold">
        Invalid Test ID
      </div>
    );
  }

  return (
    <>
      <TestList testId={numericId} />
    </>
  );
};
