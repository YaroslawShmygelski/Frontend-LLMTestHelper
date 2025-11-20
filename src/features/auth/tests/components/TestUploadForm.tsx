import { useState } from 'react';

export const TestUploadForm = () => {
  const [testLink, setTestLink] = useState<string>('');

  return (
    <div className="mx-4 sm:mx-8 lg:mx-auto max-w-5xl p-6 sm:p-12 bg-card rounded-xl shadow-2xl flex flex-col items-center">
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-card-foreground mb-4 sm:mb-6 text-center">
        Paste Your Google Form Link
      </h1>

      <p className="text-card-foreground mb-4 sm:mb-6 text-center text-sm sm:text-base lg:text-lg max-w-xl sm:max-w-2xl">
        Insert your test link below and our service will process it
        automatically.
      </p>

      <div className="w-full max-w-xl sm:max-w-3xl mb-4 sm:mb-6">
        <input
          type="text"
          value={testLink}
          onChange={(e) => setTestLink(e.target.value)}
          placeholder="Paste your link here"
          className="w-full h-8 sm:h-8 lg:h-12 p-2 sm:p-6 text-sm sm:text-base lg:text-lg rounded-xl border-2 border-card-foreground bg-card text-card-foreground placeholder:text-card-foreground placeholder:text-center focus:outline-none focus:ring-4 focus:ring-card-foreground transition-all duration-300 shadow-sm hover:shadow-md"
        />
      </div>

      <button
        type="submit"
        className="w-full max-w-xl sm:max-w-3xl py-3 sm:py-4 lg:py-5 px-4 sm:px-6 rounded-xl font-semibold text-sm sm:text-base lg:text-lg text-white btn-gradient shadow-lg hover:shadow-2xl transition-all duration-300"
      >
        Upload Your Test
      </button>
    </div>
  );
};
