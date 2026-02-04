import { useStatusAlert } from '@/hooks/useStatusAlert';
import { useUploadDocumentMutation } from '../api/testApi';
import { FiFileText, FiTrash, FiUpload } from 'react-icons/fi';
import { CustomButton } from '@/components/CustomButton';
import { useState } from 'react';
import { StatusAlert } from '@/components/StatusAlert';

interface DocumentUploadProps {
  testId: number;
}

export const DocumentUpload = ({ testId }: DocumentUploadProps) => {
  const [uploadDocument, { isLoading: isDocLoading, error: docError }] =
    useUploadDocumentMutation();
  const alert = useStatusAlert(docError);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      e.target.value = '';
      const validTypes = ['application/pdf', 'text/plain'];
      const maxSize = 5 * 1024 * 1024;

      if (!validTypes.includes(file.type)) {
        alert.showError('Invalid file type. Please upload PDF or TXT.');
        return;
      }
      if (file.size > maxSize) {
        alert.showError('File is too large. Max 5MB.');
        return;
      }
      setSelectedFile(file);
    }
  };

  const handleUploadDocument = async () => {
    if (!selectedFile) return;
    try {
      const formData = new FormData();
      formData.append('test_id', testId.toString());
      formData.append('document', selectedFile);
      await uploadDocument(formData).unwrap();
      alert.showSuccess('Document uploaded successfully!');
    } catch (e) {
      console.error('Doc Upload Failed', e);
    }
  };

  const handleDeleteDocument = () => {
    setSelectedFile(null);
  };
  return (
    <>
      <StatusAlert
        {...alert.props}
        action={
          alert.isSuccess
            ? {
                label: 'Continue',
                onClick: () => alert.handleSuccessAction(`/test/1`),
              }
            : undefined
        }
      />
      <div className="bg-card border border-card-foreground/10 rounded-xl p-6  hover:border-card-foreground/20 flex flex-col md:flex-row items-center justify-between gap-4">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <div className="flex items-center gap-2 text-card-foreground">
            <FiFileText /> Context Document
          </div>
          <span className="text-sm font-normal text-card-foreground/60 w-max">
            (Optional)
          </span>
        </h2>
        <div className="flex items-center gap-4 w-full md:w-auto">
          {!selectedFile ? (
            <div className="flex-col items-center sm:flex-row sm:items-center gap-2">
              <div className="relative group flex flex-col items-center">
                <CustomButton
                  icon={<FiUpload />}
                  onClick={() => document.getElementById('doc-upload')?.click()}
                  className="w-auto! h-10! px-4! text-sm"
                >
                  Select Document
                </CustomButton>
                <input
                  id="doc-upload"
                  type="file"
                  accept=".pdf,.txt"
                  className="hidden"
                  onChange={handleFileChange}
                />
                <p className="absolute top-full mt-1 left-1/2 -translate-x-1/2 w-max text-xs text-card-foreground/50 hidden sm:block text-center">
                  PDF or TXT (Max 5MB)
                </p>
              </div>
              <p className="text-xs text-card-foreground/50 sm:hidden">
                PDF or TXT (Max 5MB)
              </p>
            </div>
          ) : (
            <div className="flex items-center gap-4 bg-card-foreground/5 p-2 px-3 rounded-lg border border-card-foreground/10 w-full md:w-auto">
              <div className="flex items-center gap-2 min-w-0 max-w-[150px] sm:max-w-[200px]">
                <div className="bg-primary/10 p-1.5 rounded-full text-primary shrink-0">
                  <FiFileText />
                </div>
                <span className="truncate font-medium text-sm text-foreground">
                  {selectedFile.name}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <CustomButton
                  onClick={handleUploadDocument}
                  isLoading={isDocLoading}
                  className="!w-auto !h-8 !px-4 text-xs"
                >
                  Upload
                </CustomButton>
                <button
                  onClick={handleDeleteDocument}
                  className="p-1.5 text-red-500 hover:bg-red-500/10 rounded-full transition-colors"
                  title="Remove file"
                >
                  <FiTrash />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
