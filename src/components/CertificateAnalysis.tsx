
interface CertificateAnalysisProps {
  certificate: {
    isValid: boolean;
    issuer: string;
    expiryDate: string;
    trustScore: number;
  };
}

const CertificateAnalysis = ({ certificate }: CertificateAnalysisProps) => {
  const getTrustColor = (score: number) => {
    if (score >= 80) return "text-green-400 bg-green-500/20";
    if (score >= 60) return "text-yellow-400 bg-yellow-500/20";
    return "text-red-400 bg-red-500/20";
  };

  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
      <h3 className="text-xl font-semibold text-white mb-4 flex items-center space-x-2">
        <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
        <span>SSL Certificate Analysis</span>
      </h3>

      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-black/20 rounded-lg">
          <span className="text-white/80">Certificate Status</span>
          <div className="flex items-center space-x-2">
            {certificate.isValid ? (
              <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            )}
            <span className={certificate.isValid ? "text-green-400" : "text-red-400"}>
              {certificate.isValid ? "Valid" : "Invalid"}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between p-4 bg-black/20 rounded-lg">
          <span className="text-white/80">Certificate Issuer</span>
          <span className="text-white">{certificate.issuer}</span>
        </div>

        <div className="flex items-center justify-between p-4 bg-black/20 rounded-lg">
          <span className="text-white/80">Expiry Date</span>
          <span className="text-white">{certificate.expiryDate}</span>
        </div>

        <div className="p-4 bg-black/20 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-white/80">Trust Score</span>
            <span className={`font-bold ${getTrustColor(certificate.trustScore).split(' ')[0]}`}>
              {certificate.trustScore}/100
            </span>
          </div>
          <div className="w-full bg-white/10 rounded-full h-2">
            <div 
              className={`h-full rounded-full ${getTrustColor(certificate.trustScore).split(' ')[1]}`}
              style={{ width: `${certificate.trustScore}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificateAnalysis;
