import { FiUser, FiCpu, FiShuffle } from 'react-icons/fi';
import type { TestRunQuestion } from '../types/apiTypes';
import type { AnswerMode } from '../types/testTypes';

const modeConfig: Record<AnswerMode, { label: string; icon: typeof FiUser; className: string }> = {
    user: {
        label: 'Manual',
        icon: FiUser,
        className: 'bg-primary/10 text-primary ring-primary/20',
    },
    llm: {
        label: 'AI Auto',
        icon: FiCpu,
        className: 'bg-green-500/10 text-green-600 ring-green-500/20',
    },
    random: {
        label: 'Random',
        icon: FiShuffle,
        className: 'bg-orange-500/10 text-orange-600 ring-orange-500/20',
    },
};

const getAnswer = (q: TestRunQuestion): string | string[] | null => {
    if (q.answer_mode === 'user') return q.user_answer;
    if (q.answer_mode === 'llm') return q.llm_answer;
    if (q.answer_mode === 'random') return q.random_answer;
    return null;
};

const AnswerDisplay = ({ answer }: { answer: string | string[] | null }) => {
    if (answer === null || answer === undefined) {
        return (
            <p className="text-sm text-muted-foreground italic">No answer provided</p>
        );
    }

    if (Array.isArray(answer)) {
        return (
            <ul className="flex flex-col gap-1.5">
                {answer.map((item, i) => (
                    <li
                        key={i}
                        className="inline-flex items-center gap-2 text-sm text-card-foreground"
                    >
                        <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                        {item}
                    </li>
                ))}
            </ul>
        );
    }

    return <p className="text-sm text-card-foreground leading-relaxed">{answer}</p>;
};

export const RunQuestionCard = ({ question }: { question: TestRunQuestion }) => {
    const mode = modeConfig[question.answer_mode] ?? modeConfig.user;
    const ModeIcon = mode.icon;
    const answer = getAnswer(question);

    return (
        <div className="w-full bg-card p-6 rounded-2xl shadow-lg border border-card-foreground/5">
            {/* Header: type + mode badge */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-4">
                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <span className="text-xs font-bold text-card-foreground/40 uppercase tracking-wider bg-card-foreground/5 px-2 py-0.5 rounded">
                            {question.type.description}
                        </span>
                        {question.required && (
                            <span className="text-xs font-bold text-red-500 uppercase tracking-wider bg-red-500/10 px-2 py-0.5 rounded">
                                Required
                            </span>
                        )}
                    </div>
                    <h3 className="text-xl font-bold text-card-foreground leading-snug">
                        {question.question}
                    </h3>
                </div>

                {/* Mode badge */}
                <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-full ring-1 shrink-0 ${mode.className}`}
                >
                    <ModeIcon className="w-3.5 h-3.5" />
                    {mode.label}
                </span>
            </div>

            {/* Answer */}
            <div className="mt-4 pt-4 border-t border-card-foreground/10">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                    Answer
                </p>
                <AnswerDisplay answer={answer} />
            </div>
        </div>
    );
};
