import { useState, type FormEvent } from 'react';
import { FiLink, FiUpload, FiCheckCircle } from 'react-icons/fi';
import { ErrorAlert } from '@/components/ErrorAlert';
import { CustomButton } from '@/components/CustomButton';
import { useUploadTestMutation } from '../api/testApi';
import type { UploadTestRequest } from '../types/testTypes';

interface ApiErrorResponse {
  data?: {
    message?: string;
  };
  status?: number;
}

export const TestUploadForm = () => {
  const [testLink, setTestLink] = useState<string>('');
  const [validationError, setValidationError] = useState<string | null>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [uploadTest, { isLoading, error: apiError }] = useUploadTestMutation();

  const getErrorMessage = () => {
    if (validationError) return validationError;

    if (apiError) {
      const err = apiError as ApiErrorResponse;

      if (err.data && err.data.message) {
        return err.data.message;
      }
      return 'Failed to upload test. Server error.';
    }
    return null;
  };

  const isValidGoogleForm = (url: string) => {
    const pattern = /^(https?:\/\/)?(docs\.google\.com\/forms|forms\.gle)/;
    return pattern.test(url);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!testLink.trim()) {
      setValidationError('Unable to proceed. Please paste a link first.');
      return;
    }

    if (!isValidGoogleForm(testLink)) {
      setValidationError('Invalid URL. Please use a valid Google Form link.');
      return;
    }

    setValidationError(null);

    try {
      const payload: UploadTestRequest = { test_url: testLink };
      const response = await uploadTest(payload).unwrap();

      console.log('Uploaded ID:', response);
      setTestLink('');
      alert('Test uploaded successfully!');
    } catch (err) {
      console.error('Upload failed:', err);
    }
  };

  return (
    <>
      <ErrorAlert
        message={getErrorMessage()}
        onClose={() => setValidationError(null)}
      />

      <div className="w-full px-4 py-6 sm:py-10 flex justify-center items-center min-h-[60vh]">
        <div className="w-full max-w-3xl bg-card rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-12 border border-card-foreground/10 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1.5 sm:h-2 bg-linear-to-r from-transparent via-card-foreground/20 to-transparent opacity-50" />

          <div className="flex flex-col items-center relative z-10">
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-card-foreground mb-3 sm:mb-4 text-center tracking-tight leading-tight">
              Paste Your Google Form Link
            </h1>

            <p className="text-card-foreground/80 mb-6 sm:mb-10 text-center text-sm sm:text-lg max-w-xl leading-relaxed">
              Insert your test link below and our service will process it
              automatically.
            </p>

            <form
              onSubmit={handleSubmit}
              noValidate
              className="w-full max-w-xl flex flex-col gap-4 sm:gap-6"
            >
              <div className="relative group">
                <div
                  className={`absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none transition-colors duration-300 
                ${isFocused ? 'text-card-foreground' : 'text-card-foreground/50'}`}
                >
                  <FiLink className="text-xl sm:text-2xl" />
                </div>

                <input
                  type="url"
                  value={testLink}
                  onChange={(e) => {
                    setTestLink(e.target.value);
                    if (validationError) setValidationError(null);
                  }}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  placeholder="https://docs.google.com/forms/..."
                  className={`w-full h-12 sm:h-16 pl-11 sm:pl-14 pr-4 rounded-xl sm:rounded-2xl border-2 bg-card text-card-foreground 
                  placeholder:text-card-foreground/40 text-base sm:text-xl shadow-sm transition-all duration-300 outline-none
                  ${
                    validationError
                      ? 'border-red-500/50 ring-4 ring-red-500/10'
                      : 'border-card-foreground/20 focus:border-card-foreground focus:ring-4 focus:ring-card-foreground/10'
                  }`}
                />
              </div>

              <CustomButton
                type="submit"
                isLoading={isLoading}
                icon={<FiUpload />}
                loadingText="Processing..."
              >
                Upload Test
              </CustomButton>
            </form>

            <div className="mt-6 sm:mt-8 flex items-center gap-2 text-xs sm:text-sm text-card-foreground/60 font-medium">
              <FiCheckCircle />
              <span>Secure & Private</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
