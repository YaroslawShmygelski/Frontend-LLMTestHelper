import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router';

interface ApiErrorResponse {
  data?: { message?: string };
  status?: number;
}

export const useStatusAlert = (apiError: unknown) => {
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [customError, setCustomError] = useState<string | null>(null);
  const navigate = useNavigate();

  const message = (() => {
    if (successMessage) return successMessage;
    if (customError) return customError;
    if (apiError) {
      const err = apiError as ApiErrorResponse;
      return err.data?.message || 'An unexpected error occurred.';
    }
    return null;
  })();

  const type: 'success' | 'error' = successMessage ? 'success' : 'error';

  const showSuccess = useCallback((msg: string) => {
    setSuccessMessage(msg);
    setCustomError(null);
  }, []);

  const showError = useCallback((msg: string) => {
    setCustomError(msg);
    setSuccessMessage(null);
  }, []);

  const closeAlert = useCallback(() => {
    setSuccessMessage(null);
    setCustomError(null);
  }, []);

  const handleSuccessAction = (link: string) => {
    if (link) {
      navigate(link);
    }
  };

  return {
    isVisible: !!message,
    props: {
      message,
      type,
      onClose: closeAlert,
    },
    showSuccess,
    showError,
    handleSuccessAction,
    reset: closeAlert,
    isSuccess: !!successMessage,
  };
};
