import { useNavigate } from 'react-router';
import { FiClock, FiCpu, FiChevronRight } from 'react-icons/fi';
import type { TestRun } from '../types/apiTypes';

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

export const TestRunItem = ({ run }: { run: TestRun }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/test-run/${run.run_id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="rounded-xl border border-card-foreground/10 bg-card-foreground/5 p-3 flex items-center justify-between gap-3 text-xs cursor-pointer hover:border-primary/30 hover:bg-primary/5 transition-all duration-200"
    >
      <div className="flex flex-col gap-1.5 min-w-0">
        <span className="text-card-foreground font-semibold">
          Run #{run.run_id}
        </span>
        <span className="inline-flex items-center gap-1 text-muted-foreground">
          <FiClock className="w-3 h-3 shrink-0" />
          {formatDate(run.submitted_date)}
        </span>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        {run.llm_model && (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/10 text-primary ring-1 ring-primary/20 font-semibold">
            <FiCpu className="w-3 h-3" />
            {run.llm_model}
          </span>
        )}
        <FiChevronRight className="w-4 h-4 text-muted-foreground" />
      </div>
    </div>
  );
};
