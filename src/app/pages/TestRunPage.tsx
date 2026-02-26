import { useParams } from 'react-router';
import { useGetTestRunDetailQuery } from '@/features/tests/api/testApi';
import { Loader } from '@/components/Loader';
import { ErrorState } from '@/components/ErrorState';
import { RunQuestionCard } from '@/features/tests/components/RunQuestionCard';
import { FiCalendar, FiCpu, FiHash, FiClipboard } from 'react-icons/fi';

const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });

export const TestRunPage = () => {
    const { runId } = useParams<{ runId: string }>();
    const numericId = Number(runId);

    if (!runId || isNaN(numericId)) {
        return (
            <div className="min-h-screen flex items-center justify-center text-red-500 font-bold">
                Invalid Run ID
            </div>
        );
    }

    const { data, isLoading, isError, refetch } =
        useGetTestRunDetailQuery(numericId);

    if (isLoading) {
        return <Loader fullScreen text="Loading test run..." />;
    }

    if (isError || !data) {
        return (
            <ErrorState
                title="Failed to load test run"
                message="We couldn't retrieve this test run. Please try again."
                onRetry={refetch}
            />
        );
    }

    return (
        <div className="min-h-screen bg-background py-12 px-4 flex justify-center">
            <div className="w-full max-w-4xl space-y-8">
                {/* Header */}
                <div className="border-b border-card-foreground/10 pb-6">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="p-2.5 bg-linear-to-tr from-primary to-focus rounded-xl text-primary-foreground shadow-lg shadow-primary/25">
                            <FiClipboard className="w-6 h-6" />
                        </div>
                        <h1 className="text-3xl sm:text-4xl font-black text-card-foreground">
                            Test Run #{data.run_id}
                        </h1>
                    </div>

                    {/* Meta info */}
                    <div className="ml-[52px] flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                        <span className="inline-flex items-center gap-1.5">
                            <FiHash className="w-4 h-4" />
                            Test #{data.test_id}
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                            <FiCalendar className="w-4 h-4" />
                            {formatDate(data.submitted_date)}
                        </span>
                        {data.llm_model && (
                            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-primary/10 text-primary ring-1 ring-primary/20 font-semibold text-xs">
                                <FiCpu className="w-3.5 h-3.5" />
                                {data.llm_model}
                            </span>
                        )}
                    </div>
                </div>

                {/* Questions */}
                <div className="flex flex-col gap-6">
                    {data.run_content.questions.map((q) => (
                        <RunQuestionCard key={q.id} question={q} />
                    ))}
                </div>
            </div>
        </div>
    );
};
