import { useGetTestToSubmitQuery } from '../api/testApi';
import { TestList } from './TestList';

export const TestContainer = ({ testId }: { testId: number }) => {
  const { data, isLoading, isError } = useGetTestToSubmitQuery(testId);
  if (isLoading) return <h1>Loading...</h1>;
  if (isError || !data) return <h1>Error</h1>;

  const testStructure = data?.test_structure;

  return (
    <TestList key={testId} testStructure={testStructure} testId={testId} />
  );
};
