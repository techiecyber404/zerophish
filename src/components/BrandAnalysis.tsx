
interface BrandAnalysisProps {
  brandAnalysis: {
    suspectedBrand: string | null;
    logoSimilarity: number;
    brandImpersonation: boolean;
  };
}

const BrandAnalysis = ({ brandAnalysis }: BrandAnalysisProps) => {
  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
      <h3 className="text-xl font-semibold text-white mb-4 flex items-center space-x-2">
        <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
        </svg>
        <span>Brand Impersonation Analysis</span>
      </h3>

      <div className="space-y-4">
        {brandAnalysis.brandImpersonation ? (
          <>
            <div className="p-4 bg-red-500/20 border border-red-400 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                <span className="text-red-400 font-semibold">Brand Impersonation Detected</span>
              </div>
              <p className="text-white/80 text-sm">
                This site appears to be impersonating <strong className="text-red-300">{brandAnalysis.suspectedBrand}</strong>
              </p>
            </div>

            <div className="p-4 bg-black/20 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white/80">Visual Similarity</span>
                <span className="text-red-400 font-bold">{brandAnalysis.logoSimilarity}%</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-2">
                <div 
                  className="h-full bg-red-500 rounded-full"
                  style={{ width: `${brandAnalysis.logoSimilarity}%` }}
                ></div>
              </div>
              <p className="text-white/60 text-xs mt-2">
                High similarity to legitimate {brandAnalysis.suspectedBrand} branding
              </p>
            </div>
          </>
        ) : (
          <div className="p-4 bg-green-500/20 border border-green-400 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-green-400 font-semibold">No Brand Impersonation</span>
            </div>
            <p className="text-white/80 text-sm">
              No evidence of brand impersonation detected
            </p>
          </div>
        )}

        <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-400/30">
          <div className="flex items-center space-x-2 mb-2">
            <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-blue-400 font-semibold">AI Visual Analysis</span>
          </div>
          <p className="text-white/80 text-sm">
            Our AI model analyzed visual elements, logos, color schemes, and layout patterns 
            to detect potential brand impersonation attempts using computer vision techniques.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BrandAnalysis;
