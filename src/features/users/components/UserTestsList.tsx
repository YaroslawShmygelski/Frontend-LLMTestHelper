import { useGetUserTestsQuery } from '@/features/tests/api/testApi';
import { Loader } from '@/components/Loader';
import { ErrorState } from '@/components/ErrorState';
import type { UserTest } from '@/features/tests/types/apiTypes';
import {
  FiFileText,
  FiExternalLink,
  FiCalendar,
  FiClipboard,
  FiInbox,
} from 'react-icons/fi';

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

const getTypeLabel = (type: string) => {
  const labels: Record<string, string> = {
    google_document: 'Google Form',
  };
  return labels[type] ?? type.replace(/_/g, ' ');
};

const TestCard = ({ test }: { test: UserTest }) => (
  <div className="group relative bg-card border border-card-foreground/10 rounded-2xl p-6 shadow-sm hover:shadow-xl hover:border-primary/30 transition-all duration-300 hover:-translate-y-1">
    <div className="flex items-start justify-between gap-3 mb-4">
      <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full bg-primary/10 text-primary ring-1 ring-primary/20">
        <FiFileText className="w-3 h-3" />
        {getTypeLabel(test.type)}
      </span>

      <a
        href={test.url}
        target="_blank"
        rel="noopener noreferrer"
        className="relative z-10 p-2 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-200"
        title="Open test"
      >
        <FiExternalLink className="w-4 h-4" />
      </a>
    </div>

    <h3 className="text-lg font-bold text-card-foreground mb-4 leading-snug line-clamp-2 group-hover:text-primary transition-colors duration-200">
      {test.title}
    </h3>

    <div className="flex items-center gap-4 text-xs text-muted-foreground">
      <span className="inline-flex items-center gap-1.5">
        <FiCalendar className="w-3.5 h-3.5" />
        {formatDate(test.created_at)}
      </span>
    </div>

    <a
      href={test.url}
      target="_blank"
      rel="noopener noreferrer"
      className="absolute inset-0 rounded-2xl z-0"
      aria-label={`Open ${test.title}`}
    />
  </div>
);

const EmptyState = () => (
  <div className="flex flex-col items-center justify-center py-24 text-center">
    <div className="p-6 rounded-full bg-primary/10 ring-1 ring-primary/20 mb-6">
      <FiInbox className="w-10 h-10 text-primary" />
    </div>
    <h2 className="text-2xl font-bold text-card-foreground mb-2">
      No tests yet
    </h2>
    <p className="text-muted-foreground max-w-md leading-relaxed">
      You haven't created any tests. Upload a Google Form or document to get
      started!
    </p>
  </div>
);

export const UserTestsList = () => {
  const { data, isLoading, isError, refetch } = useGetUserTestsQuery();

  if (isLoading) {
    return <Loader fullScreen text="Loading your tests..." />;
  }

  if (isError) {
    return (
      <ErrorState
        title="Failed to load tests"
        message="We couldn't retrieve your tests. Please try again."
        onRetry={refetch}
      />
    );
  }

  const tests = data?.tests ?? [];

  return (
    <>
      {/* Header */}
      <div className="max-w-6xl mx-auto px-6 pt-16 pb-10">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2.5 bg-linear-to-tr from-primary to-focus rounded-xl text-primary-foreground shadow-lg shadow-primary/25">
            <FiClipboard className="w-6 h-6" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-foreground">
            My Tests
          </h1>
        </div>
        <p className="text-muted-foreground text-base sm:text-lg ml-[52px]">
          All the tests you've created, in one place.
        </p>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 pb-20">
        {tests.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {tests.map((test) => (
              <TestCard key={test.test_id} test={test} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};
