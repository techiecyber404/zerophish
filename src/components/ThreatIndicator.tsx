
import { AnalysisResult } from "./PhishingDetector";

interface ThreatIndicatorProps {
  result: AnalysisResult;
}

const ThreatIndicator = ({ result }: ThreatIndicatorProps) => {
  const getThreatLevel = (score: number) => {
    if (score >= 70) return { level: 'HIGH', color: 'red', bgColor: 'bg-red-500/20', borderColor: 'border-red-400' };
    if (score >= 50) return { level: 'MEDIUM', color: 'orange', bgColor: 'bg-orange-500/20', borderColor: 'border-orange-400' };
    if (score >= 30) return { level: 'LOW', color: 'yellow', bgColor: 'bg-yellow-500/20', borderColor: 'border-yellow-400' };
    return { level: 'SAFE', color: 'green', bgColor: 'bg-green-500/20', borderColor: 'border-green-400' };
  };

  const threat = getThreatLevel(result.riskScore);

  return (
    <div className={`${threat.bgColor} ${threat.borderColor} border-2 rounded-xl p-6`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${threat.bgColor}`}>
            {result.isPhishing ? (
              <svg className={`w-6 h-6 text-${threat.color}-400`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            ) : (
              <svg className={`w-6 h-6 text-${threat.color}-400`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )}
          </div>
          <div>
            <h3 className={`text-xl font-bold text-${threat.color}-400`}>
              {result.isPhishing ? 'PHISHING DETECTED' : 'URL APPEARS SAFE'}
            </h3>
            <p className="text-white/80">Threat Level: {threat.level}</p>
          </div>
        </div>
        
        <div className="text-right">
          <div className={`text-3xl font-bold text-${threat.color}-400`}>
            {result.riskScore}%
          </div>
          <p className="text-white/60 text-sm">Risk Score</p>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-white/80">Confidence Level</span>
          <span className={`text-${threat.color}-400 font-semibold`}>
            {result.confidence.toFixed(1)}%
          </span>
        </div>
        
        <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
          <div
            className={`h-full bg-gradient-to-r from-${threat.color}-500 to-${threat.color}-400 rounded-full transition-all duration-1000 ease-out`}
            style={{ width: `${result.confidence}%` }}
          ></div>
        </div>
      </div>

      <div className="mt-4 p-4 bg-black/20 rounded-lg">
        <p className="text-white/90 text-sm">
          <span className="font-semibold">URL:</span> {result.url}
        </p>
      </div>

      {result.recommendations.length > 0 && (
        <div className="mt-4">
          <h4 className="text-white font-semibold mb-2">Security Recommendations:</h4>
          <ul className="space-y-1">
            {result.recommendations.map((recommendation, index) => (
              <li key={index} className="text-white/80 text-sm flex items-start space-x-2">
                <span className="text-blue-400 mt-0.5">•</span>
                <span>{recommendation}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ThreatIndicator;
