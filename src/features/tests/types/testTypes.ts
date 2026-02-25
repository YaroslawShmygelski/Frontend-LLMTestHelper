import type { ElementType } from 'react';
import { FiCpu, FiShuffle, FiUser } from 'react-icons/fi';

export interface QuestionType {
  type_id: number;
  description: string;
}

export interface Question {
  id: number;
  question: string;
  type: QuestionType;
  required: boolean;
  options: string[] | null;
  answer_mode: string | null;
}

export interface TestStructure {
  questions: Question[];
}

export interface FullTestResponse {
  test_id: number;
  title: string;
  isSubmitted: boolean;
  test_structure: TestStructure;
  uploaded_date: string;
}

export type AnswerMode = 'llm' | 'random' | 'user';

export interface AnswerState {
  mode: AnswerMode;
  value: string | string[];
}

export const answerModes: {
  answer_mode: AnswerMode;
  label: string;
  icon: ElementType;
}[] = [
  { answer_mode: 'user', label: 'Manual', icon: FiUser },
  { answer_mode: 'llm', label: 'AI Auto', icon: FiCpu },
  { answer_mode: 'random', label: 'Random', icon: FiShuffle },
];
