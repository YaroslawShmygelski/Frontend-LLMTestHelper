import { FiClock, FiCpu } from 'react-icons/fi';
import type { TestRun } from '../types/apiTypes';

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

export const TestRunItem = ({ run }: { run: TestRun }) => (
  <div className="rounded-xl border border-card-foreground/10 bg-card-foreground/5 p-3 flex flex-col gap-2 text-xs">
    <div className="flex items-center justify-between gap-2">
      <span className="text-muted-foreground font-medium">
        Run #{run.run_id}
      </span>
      {run.llm_model && (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/10 text-primary ring-1 ring-primary/20 font-semibold">
          <FiCpu className="w-3 h-3" />
          {run.llm_model}
        </span>
      )}
    </div>

    <div className="flex items-center gap-1.5 text-muted-foreground">
      <FiClock className="w-3 h-3 shrink-0" />
      <span>{formatDate(run.submitted_date)}</span>
    </div>
  </div>
);
