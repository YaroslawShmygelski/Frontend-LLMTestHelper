import { useGetUserTestsQuery } from '../api/testApi';
import { Loader } from '@/components/Loader';
import { ErrorState } from '@/components/ErrorState';
import { TestCard } from './TestCard';
import { FiClipboard, FiInbox } from 'react-icons/fi';

const EmptyState = () => (
    <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="p-6 rounded-full bg-primary/10 ring-1 ring-primary/20 mb-6">
            <FiInbox className="w-10 h-10 text-primary" />
        </div>
        <h2 className="text-2xl font-bold text-card-foreground mb-2">No tests yet</h2>
        <p className="text-muted-foreground max-w-md leading-relaxed">
            You haven't created any tests. Upload a Google Form or document to get started!
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
