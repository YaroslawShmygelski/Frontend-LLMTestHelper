import { useState } from 'react';
import { FiList, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { useGetTestRunsQuery } from '../api/testApi';
import { TestRunItem } from './TestRunItem';

export const TestRunsDropdown = ({
  testId,
  onStopPropagation,
}: {
  testId: number;
  onStopPropagation: (e: React.MouseEvent) => void;
}) => {
  const [open, setOpen] = useState(false);

  const { data, isLoading, isError } = useGetTestRunsQuery(testId, {
    skip: !open,
  });

  const handleToggle = (e: React.MouseEvent) => {
    onStopPropagation(e);
    setOpen((prev) => !prev);
  };

  return (
    <div onClick={onStopPropagation} className="w-full">
      <button
        onClick={handleToggle}
        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors duration-200 text-xs font-semibold"
      >
        <FiList className="w-3.5 h-3.5" />
        Runs
        {open ? (
          <FiChevronUp className="w-3 h-3" />
        ) : (
          <FiChevronDown className="w-3 h-3" />
        )}
      </button>

      {open && (
        <div className="mt-3 pt-3 border-t w-full border-card-foreground/10 flex flex-col gap-2">
          {isLoading && (
            <p className="text-xs text-muted-foreground">Loading runs…</p>
          )}
          {isError && (
            <p className="text-xs text-error">Failed to load runs.</p>
          )}
          {data && data.test_runs.length === 0 && (
            <p className="text-xs text-muted-foreground">No runs yet.</p>
          )}
          {data?.test_runs.map((run) => (
            <TestRunItem key={run.run_id} run={run} />
          ))}
        </div>
      )}
    </div>
  );
};
