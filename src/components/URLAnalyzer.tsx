
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface URLAnalyzerProps {
  url: string;
  setUrl: (url: string) => void;
  onAnalyze: (url: string) => void;
  isAnalyzing: boolean;
}

const URLAnalyzer = ({ url, setUrl, onAnalyze, isAnalyzing }: URLAnalyzerProps) => {
  const [isValidUrl, setIsValidUrl] = useState(true);

  const validateURL = (urlString: string): boolean => {
    try {
      new URL(urlString);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!url.trim()) {
      setIsValidUrl(false);
      return;
    }

    let urlToCheck = url.trim();
    if (!urlToCheck.startsWith('http://') && !urlToCheck.startsWith('https://')) {
      urlToCheck = 'https://' + urlToCheck;
    }

    if (!validateURL(urlToCheck)) {
      setIsValidUrl(false);
      return;
    }

    setIsValidUrl(true);
    onAnalyze(urlToCheck);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
    setIsValidUrl(true);
  };

  return (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-semibold text-white mb-2">Enhanced URL Threat Analysis</h2>
        <p className="text-blue-200">Enter a URL to check for phishing and security threats using advanced ML algorithms</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <Input
            type="text"
            value={url}
            onChange={handleInputChange}
            placeholder="Enter URL (e.g., https://example.com)"
            className={`w-full h-14 px-6 text-lg bg-white/10 border-2 ${
              isValidUrl ? 'border-white/30' : 'border-red-400'
            } text-white placeholder-blue-200 focus:border-blue-400 focus:bg-white/15 transition-all duration-200`}
            disabled={isAnalyzing}
          />
          <div className="absolute inset-y-0 right-4 flex items-center">
            <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
          </div>
        </div>

        {!isValidUrl && (
          <p className="text-red-400 text-sm">Please enter a valid URL</p>
        )}

        <Button
          type="submit"
          disabled={isAnalyzing}
          className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white border-0 transition-all duration-200 transform hover:scale-[1.02]"
        >
          {isAnalyzing ? (
            <span className="flex items-center space-x-2">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Analyzing...</span>
            </span>
          ) : (
            <span className="flex items-center space-x-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Analyze URL</span>
            </span>
          )}
        </Button>
      </form>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
        {[
          { url: 'https://google.com', label: 'Safe Site' },
          { url: 'https://github.com', label: 'Legitimate' },
          { url: 'http://g00gle-verify-account.tk', label: 'Suspicious' },
          { url: 'https://paypaI-secure-login.click', label: 'Phishing' }
        ].map((example, index) => (
          <button
            key={index}
            onClick={() => setUrl(example.url)}
            disabled={isAnalyzing}
            className="p-3 text-sm bg-white/5 hover:bg-white/10 border border-white/20 rounded-lg text-blue-200 hover:text-white transition-all duration-200 disabled:opacity-50"
          >
            <div className="font-medium">{example.label}</div>
            <div className="text-xs text-white/60 mt-1">Test URL</div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default URLAnalyzer;
