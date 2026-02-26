import type { AnswerMode } from './testTypes';

export interface UploadTestRequest {
  test_url: string;
  title: string;
}
export interface UploadTestResponse {
  testId: number;
}

export interface UploadDocumentResponse {
  status: string;
  filename: string;
}

export interface GetTestToSubmitResponse {
  test_id: number;
  title: string;
  is_submitted: boolean;
  test_structure: {
    questions: [
      {
        id: number;
        question: string;
        type: {
          type_id: number;
          description: string;
        };
        required: boolean;
        options: string[];
        answer_mode: string;
      },
    ];
  };
  uploaded_date: Date;
}

export interface SubmitTestRequest {
  testId: number;
  payload: {
    quantity: number | '';
    answers: {
      question_id: number;
      answer_mode: AnswerMode;
      answer: string | string[] | null;
    }[];
  };
}

export interface UserTest {
  test_id: number;
  type: string;
  title: string;
  url: string;
  is_submitted: boolean;
  created_at: string;
  updated_at: string;
}

export interface GetUserTestsResponse {
  offset: number;
  limit: number;
  tests: UserTest[];
}

export interface TestRun {
  run_id: number;
  test_id: number;
  user_id: number;
  job_id: string;
  submitted_date: string;
  llm_model: string | null;
}

export interface GetTestRunsResponse {
  test_runs: TestRun[];
}

export interface TestRunQuestion {
  id: number;
  question: string;
  type: {
    type_id: number;
    description: string;
  };
  required: boolean;
  options: string[] | null;
  answer_mode: AnswerMode;
  user_answer: string | string[] | null;
  llm_answer: string | string[] | null;
  random_answer: string | string[] | null;
}

export interface TestRunDetailResponse {
  test_id: number;
  run_id: number;
  run_content: {
    questions: TestRunQuestion[];
  };
  llm_model: string | null;
  submitted_date: string;
}
