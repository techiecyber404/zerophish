
import { AnalysisResult } from "./PhishingDetector";

interface FeatureAnalysisProps {
  result: AnalysisResult;
}

const FeatureAnalysis = ({ result }: FeatureAnalysisProps) => {
  const features = [
    {
      name: "Domain Security",
      status: !result.features.suspiciousDomain && !result.features.hasIPAddress,
      description: result.features.hasIPAddress 
        ? "Uses IP address instead of domain name (HIGH RISK)"
        : result.features.suspiciousDomain 
          ? "Domain appears suspicious or uses URL shortener"
          : "Domain appears legitimate"
    },
    {
      name: "HTTPS Protocol",
      status: result.features.usesHTTPS,
      description: result.features.usesHTTPS 
        ? "Secure HTTPS connection detected"
        : "Not using secure HTTPS protocol"
    },
    {
      name: "Top-Level Domain",
      status: !result.features.suspiciousTLD,
      description: result.features.suspiciousTLD
        ? "Uses suspicious TLD often associated with scams"
        : "Uses standard top-level domain"
    },
    {
      name: "Domain Mimicking",
      status: !result.features.mimicsKnownSites,
      description: result.features.mimicsKnownSites
        ? "May be impersonating a legitimate site"
        : "No domain impersonation detected"
    },
    {
      name: "URL Length",
      status: result.features.urlLength <= 100,
      description: `URL length: ${result.features.urlLength} characters ${
        result.features.urlLength > 150 ? "(very long - suspicious)" : 
        result.features.urlLength > 100 ? "(long)" : "(normal)"
      }`
    },
    {
      name: "Suspicious Keywords",
      status: !result.features.containsSuspiciousKeywords,
      description: result.features.containsSuspiciousKeywords
        ? "Contains multiple suspicious keywords"
        : "No suspicious keyword patterns detected"
    },
    {
      name: "Redirect Analysis", 
      status: !result.features.hasRedirect,
      description: result.features.hasRedirect
        ? "Contains redirect mechanisms"
        : "No redirect patterns detected"
    },
    {
      name: "Subdomain Structure",
      status: !result.features.hasSubdomains || (!result.features.suspiciousDomain && !result.features.mimicsKnownSites),
      description: result.features.hasSubdomains
        ? "Multiple subdomains detected"
        : "Clean domain structure"
    }
  ];

  const passedChecks = features.filter(f => f.status).length;
  const totalChecks = features.length;

  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
      <h3 className="text-xl font-semibold text-white mb-6 flex items-center space-x-2">
        <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
        <span>Enhanced Security Analysis</span>
      </h3>

      <div className="grid md:grid-cols-2 gap-4">
        {features.map((feature, index) => (
          <div key={index} className="flex items-start space-x-3 p-4 bg-black/20 rounded-lg">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
              feature.status ? 'bg-green-500/20' : 'bg-red-500/20'
            }`}>
              {feature.status ? (
                <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg className="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </div>
            <div className="flex-1">
              <h4 className={`font-semibold ${
                feature.status ? 'text-green-400' : 'text-red-400'
              }`}>
                {feature.name}
              </h4>
              <p className="text-white/70 text-sm mt-1">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-blue-500/10 rounded-lg border border-blue-400/30">
        <div className="flex items-center space-x-2 mb-2">
          <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-blue-400 font-semibold">Enhanced Analysis Summary</span>
        </div>
        <p className="text-white/80 text-sm">
          Our enhanced AI model analyzed {totalChecks} comprehensive security indicators. 
          {passedChecks} features passed security checks, while {totalChecks - passedChecks} raised potential concerns. 
          The analysis includes advanced phishing detection techniques like typosquatting detection, 
          suspicious keyword analysis, and domain reputation checking.
        </p>
      </div>
    </div>
  );
};

export default FeatureAnalysis;
