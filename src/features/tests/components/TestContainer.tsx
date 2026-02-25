import { useState } from 'react';
import { useGetTestToSubmitQuery } from '../api/testApi';
import { TestList } from './TestList';
import type { ApiErrorResponse } from '@/types/types';
import { Loader } from '@/components/Loader';
import { ErrorState } from '@/components/ErrorState';

export const TestContainer = ({ testId }: { testId: number }) => {
  const [retryCount, setRetryCount] = useState(0);

  const { data, isLoading, isError, error, refetch } =
    useGetTestToSubmitQuery(testId);

  const handleRetry = () => {
    setRetryCount((prev) => prev + 1);
    refetch();
  };

  const handleHardReload = () => {
    window.location.reload();
  };

  if (isLoading) {
    return <Loader fullScreen text="Loading Test Configuration..." />;
  }

  if (isError || !data) {
    const errorMsg =
      (error as ApiErrorResponse)?.data?.message || 'Connection failed.';

    if (retryCount >= 3) {
      return (
        <ErrorState
          title="Looks like we have a problem"
          message="We tried to connect several times but failed. Please check your internet connection or try refreshing the page completely."
          onRetry={handleHardReload}
        />
      );
    }

    return (
      <ErrorState
        title="Failed to load test"
        message={errorMsg}
        onRetry={handleRetry}
      />
    );
  }

  return (
    <TestList
      key={testId}
      testStructure={data.test_structure}
      testId={testId}
      title={data.title}
      isSubmitted={data.isSubmitted}
    />
  );
};
