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
  created_at: string;
  updated_at: string;
}

export interface GetUserTestsResponse {
  offset: number;
  limit: number;
  tests: UserTest[];
}
