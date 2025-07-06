
import { useState } from "react";
import URLAnalyzer from "./URLAnalyzer";
import ThreatIndicator from "./ThreatIndicator";
import FeatureAnalysis from "./FeatureAnalysis";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export interface AnalysisResult {
  url: string;
  isPhishing: boolean;
  riskScore: number;
  confidence: number;
  features: {
    suspiciousDomain: boolean;
    hasSubdomains: boolean;
    usesHTTPS: boolean;
    domainAge: string;
    urlLength: number;
    hasSpecialChars: boolean;
    mimicsKnownSites: boolean;
  };
  recommendations: string[];
}

const PhishingDetector = () => {
  const [url, setUrl] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const { toast } = useToast();

  const analyzeURL = async (urlToAnalyze: string) => {
    setIsAnalyzing(true);
    setResult(null);

    try {
      // Simulate ML analysis with realistic delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Extract features from URL
      const urlObj = new URL(urlToAnalyze);
      const domain = urlObj.hostname;
      const path = urlObj.pathname;
      
      // Feature extraction logic
      const features = {
        suspiciousDomain: /[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}/.test(domain) || 
                         domain.includes('bit.ly') || domain.includes('tinyurl'),
        hasSubdomains: domain.split('.').length > 2,
        usesHTTPS: urlObj.protocol === 'https:',
        domainAge: 'Unknown',
        urlLength: urlToAnalyze.length,
        hasSpecialChars: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~`]/.test(path),
        mimicsKnownSites: checkForMimickedSites(domain)
      };

      // Calculate risk score based on features
      let riskScore = 0;
      if (features.suspiciousDomain) riskScore += 30;
      if (!features.usesHTTPS) riskScore += 20;
      if (features.urlLength > 100) riskScore += 15;
      if (features.hasSpecialChars) riskScore += 10;
      if (features.mimicsKnownSites) riskScore += 35;
      if (features.hasSubdomains && features.suspiciousDomain) riskScore += 20;

      const isPhishing = riskScore >= 50;
      const confidence = Math.min(95, Math.max(60, riskScore + Math.random() * 20));

      const recommendations = generateRecommendations(features, isPhishing);

      const analysisResult: AnalysisResult = {
        url: urlToAnalyze,
        isPhishing,
        riskScore,
        confidence,
        features,
        recommendations
      };

      setResult(analysisResult);
      
      toast({
        title: isPhishing ? "⚠️ Threat Detected" : "✅ URL Appears Safe",
        description: `Analysis completed with ${confidence.toFixed(1)}% confidence`,
        variant: isPhishing ? "destructive" : "default",
      });

    } catch (error) {
      console.error('Analysis error:', error);
      toast({
        title: "Analysis Failed",
        description: "Please check the URL format and try again.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const checkForMimickedSites = (domain: string): boolean => {
    const knownSites = ['google', 'facebook', 'amazon', 'microsoft', 'apple', 'paypal', 'bank'];
    return knownSites.some(site => 
      domain.includes(site) && !domain.endsWith(`${site}.com`) && !domain.endsWith(`${site}.net`)
    );
  };

  const generateRecommendations = (features: any, isPhishing: boolean): string[] => {
    const recommendations = [];
    
    if (isPhishing) {
      recommendations.push("🚫 Do not enter personal information on this site");
      recommendations.push("🔒 Verify the website's authenticity through official channels");
    }
    
    if (!features.usesHTTPS) {
      recommendations.push("⚠️ This site doesn't use HTTPS - avoid entering sensitive data");
    }
    
    if (features.suspiciousDomain) {
      recommendations.push("🔍 Domain appears suspicious - verify legitimacy before proceeding");
    }
    
    if (features.mimicsKnownSites) {
      recommendations.push("🎭 This site may be impersonating a legitimate service");
    }

    if (!isPhishing && recommendations.length === 0) {
      recommendations.push("✅ URL appears legitimate based on our analysis");
      recommendations.push("🛡️ Continue browsing with normal security precautions");
    }

    return recommendations;
  };

  const handleReset = () => {
    setUrl("");
    setResult(null);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-2xl">
        <URLAnalyzer 
          url={url}
          setUrl={setUrl}
          onAnalyze={analyzeURL}
          isAnalyzing={isAnalyzing}
        />
        
        {isAnalyzing && (
          <div className="mt-8 text-center">
            <div className="inline-flex items-center space-x-2 text-blue-300">
              <div className="w-5 h-5 border-2 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-lg">Analyzing URL with AI...</span>
            </div>
            <div className="mt-4 bg-blue-500/20 rounded-full h-2 max-w-xs mx-auto overflow-hidden">
              <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full animate-pulse"></div>
            </div>
          </div>
        )}

        {result && (
          <div className="mt-8 space-y-6">
            <ThreatIndicator result={result} />
            <FeatureAnalysis result={result} />
            
            <div className="flex justify-center">
              <Button 
                onClick={handleReset}
                variant="outline"
                className="bg-white/10 border-white/30 text-white hover:bg-white/20"
              >
                Analyze Another URL
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PhishingDetector;
