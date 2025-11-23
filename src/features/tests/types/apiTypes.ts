export interface UploadTestRequest {
  test_url: string;
}
export interface UploadTestResponse {
  testId: number;
}

export interface GetTestToSubmitResponse {
  test_id: number;
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
