import { useNavigate } from 'react-router';
import { FiFileText, FiCalendar, FiExternalLink } from 'react-icons/fi';
import { TestRunsDropdown } from './TestRunsDropdown';
import type { UserTest } from '../types/apiTypes';

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

const getTypeLabel = (type: string) => {
  const labels: Record<string, string> = { google_document: 'Google Form' };
  return labels[type] ?? type.replace(/_/g, ' ');
};

export const TestCard = ({ test }: { test: UserTest }) => {
  const navigate = useNavigate();

  const stopPropagation = (e: React.MouseEvent) => e.stopPropagation();

  return (
    <div
      onClick={() => navigate(`/test/${test.test_id}`)}
      className="group relative bg-card border border-card-foreground/10 rounded-2xl p-6 shadow-sm hover:shadow-xl hover:border-primary/30 transition-all duration-300 hover:-translate-y-1 cursor-pointer"
    >
      {/* Top accent line on hover */}
      <div className="absolute top-0 left-2 right-2 h-[3px] bg-linear-to-r from-primary to-focus rounded-b-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      {/* Badge */}
      <div className="flex mb-4 justify-between">
        <a
          href={test.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors duration-200 font-medium"
          title="Open Google Form"
        >
          <FiExternalLink className="w-3.5 h-3.5" />
          Open Google Form
        </a>
        <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full bg-primary/10 text-primary ring-1 ring-primary/20">
          <FiFileText className="w-3 h-3" />
          {getTypeLabel(test.type)}
        </span>
      </div>

      {/* Title */}
      <h3 className="text-lg font-bold text-card-foreground mb-4 leading-snug line-clamp-2 group-hover:text-primary transition-colors duration-200">
        {test.title}
      </h3>

      {/* Date */}
      <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-4">
        <FiCalendar className="w-3.5 h-3.5" />
        {formatDate(test.created_at)}
      </div>

      {/* Footer: Google Form link + Runs dropdown */}
      <div
        className="flex items-center justify-between gap-3 pt-4 border-t border-card-foreground/10"
        onClick={stopPropagation}
      >
        {test.is_submitted && (
          <TestRunsDropdown
            testId={test.test_id}
            onStopPropagation={stopPropagation}
          />
        )}
      </div>
    </div>
  );
};
