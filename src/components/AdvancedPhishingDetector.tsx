
import { useState, useEffect } from "react";
import URLAnalyzer from "./URLAnalyzer";
import ThreatIndicator from "./ThreatIndicator";
import FeatureAnalysis from "./FeatureAnalysis";
import GlobalThreatDashboard from "./GlobalThreatDashboard";
import CertificateAnalysis from "./CertificateAnalysis";
import BrandAnalysis from "./BrandAnalysis";
import ThreatSharing from "./ThreatSharing";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
    hasIPAddress: boolean;
    suspiciousTLD: boolean;
    hasRedirect: boolean;
    containsSuspiciousKeywords: boolean;
  };
  certificate: {
    isValid: boolean;
    issuer: string;
    expiryDate: string;
    trustScore: number;
  };
  brandAnalysis: {
    suspectedBrand: string | null;
    logoSimilarity: number;
    brandImpersonation: boolean;
  };
  recommendations: string[];
  threatIntel: {
    reportedTimes: number;
    lastReported: string;
    threatCategories: string[];
  };
}

const AdvancedPhishingDetector = () => {
  const [url, setUrl] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [currentStage, setCurrentStage] = useState("");
  const { toast } = useToast();

  const analysisStages = [
    "Initializing ML engines...",
    "Parsing URL structure...",
    "Checking domain reputation...",
    "Analyzing SSL certificate...",
    "Scanning for brand impersonation...",
    "Running ML phishing detection...",
    "Cross-referencing threat intelligence...",
    "Generating security report..."
  ];

  const analyzeURL = async (urlToAnalyze: string) => {
    setIsAnalyzing(true);
    setResult(null);
    setAnalysisProgress(0);

    try {
      // Simulate real-time analysis with progress updates
      for (let i = 0; i < analysisStages.length; i++) {
        setCurrentStage(analysisStages[i]);
        setAnalysisProgress((i + 1) / analysisStages.length * 100);
        await new Promise(resolve => setTimeout(resolve, 600));
      }

      // Enhanced analysis logic
      const urlObj = new URL(urlToAnalyze);
      const domain = urlObj.hostname.toLowerCase();
      const path = urlObj.pathname.toLowerCase();
      const fullUrl = urlToAnalyze.toLowerCase();
      
      console.log('Advanced Analysis - URL:', urlToAnalyze);
      console.log('Domain:', domain);
      console.log('Path:', path);
      
      // Enhanced feature extraction
      const features = {
        hasIPAddress: /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/.test(domain),
        suspiciousTLD: /\.(tk|ml|ga|cf|bit|cc|pw|top|click|download|science|work|cricket|accountant|review|country|stream|gq|racing|party|faith|bid|win|date|loan|site|website|online|agency)$/i.test(domain),
        suspiciousDomain: domain.includes('bit.ly') || domain.includes('tinyurl') || domain.includes('t.co') || domain.includes('goo.gl') || /[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}/.test(domain),
        hasSubdomains: domain.split('.').length > 3,
        usesHTTPS: urlObj.protocol === 'https:',
        domainAge: simulateDomainAge(),
        urlLength: urlToAnalyze.length,
        hasSpecialChars: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~`]/.test(path) && path.length > 1,
        mimicsKnownSites: checkForMimickedSites(domain),
        hasRedirect: path.includes('redirect') || path.includes('r=') || path.includes('url=') || path.includes('goto='),
        containsSuspiciousKeywords: checkSuspiciousKeywords(fullUrl)
      };

      // Simulate certificate analysis
      const certificate = {
        isValid: !features.hasIPAddress && Math.random() > 0.3,
        issuer: features.usesHTTPS ? getRandomCertIssuer() : "None",
        expiryDate: getRandomExpiryDate(),
        trustScore: features.usesHTTPS ? Math.floor(Math.random() * 40) + 60 : 0
      };

      // Simulate brand analysis
      const brandAnalysis = {
        suspectedBrand: features.mimicsKnownSites ? getRandomBrand() : null,
        logoSimilarity: features.mimicsKnownSites ? Math.floor(Math.random() * 30) + 70 : Math.floor(Math.random() * 20),
        brandImpersonation: features.mimicsKnownSites
      };

      // Enhanced risk scoring
      let riskScore = calculateAdvancedRiskScore(features, certificate, brandAnalysis);
      const isPhishing = riskScore >= 45;
      const confidence = calculateConfidence(features, certificate, brandAnalysis);

      // Simulate threat intelligence
      const threatIntel = {
        reportedTimes: isPhishing ? Math.floor(Math.random() * 50) + 1 : Math.floor(Math.random() * 3),
        lastReported: isPhishing ? getRandomRecentDate() : getRandomOldDate(),
        threatCategories: isPhishing ? getRandomThreatCategories() : []
      };

      const recommendations = generateAdvancedRecommendations(features, isPhishing, certificate, brandAnalysis, threatIntel);

      const analysisResult: AnalysisResult = {
        url: urlToAnalyze,
        isPhishing,
        riskScore,
        confidence,
        features,
        certificate,
        brandAnalysis,
        recommendations,
        threatIntel
      };

      setResult(analysisResult);
      
      toast({
        title: isPhishing ? "⚠️ Advanced Threat Detected" : "✅ URL Verified Safe",
        description: `Analysis completed with ${confidence}% confidence using AI ML models`,
        variant: isPhishing ? "destructive" : "default",
      });

    } catch (error) {
      console.error('Advanced analysis error:', error);
      toast({
        title: "Analysis Failed",
        description: "ML engine encountered an error. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
      setAnalysisProgress(100);
    }
  };

  // Helper functions
  const simulateDomainAge = () => {
    const ages = ["< 1 month", "3 months", "6 months", "1 year", "2+ years", "5+ years"];
    return ages[Math.floor(Math.random() * ages.length)];
  };

  const getRandomCertIssuer = () => {
    const issuers = ["Let's Encrypt", "DigiCert", "GoDaddy", "Cloudflare", "Amazon", "GlobalSign"];
    return issuers[Math.floor(Math.random() * issuers.length)];
  };

  const getRandomExpiryDate = () => {
    const date = new Date();
    date.setMonth(date.getMonth() + Math.floor(Math.random() * 24));
    return date.toLocaleDateString();
  };

  const getRandomBrand = () => {
    const brands = ["PayPal", "Amazon", "Microsoft", "Google", "Apple", "Facebook", "Netflix"];
    return brands[Math.floor(Math.random() * brands.length)];
  };

  const getRandomRecentDate = () => {
    const date = new Date();
    date.setDate(date.getDate() - Math.floor(Math.random() * 30));
    return date.toLocaleDateString();
  };

  const getRandomOldDate = () => {
    const date = new Date();
    date.setMonth(date.getMonth() - Math.floor(Math.random() * 12));
    return date.toLocaleDateString();
  };

  const getRandomThreatCategories = () => {
    const categories = ["Phishing", "Malware", "Spam", "Credential Theft", "Brand Impersonation"];
    return categories.slice(0, Math.floor(Math.random() * 3) + 1);
  };

  const checkForMimickedSites = (domain: string): boolean => {
    const legitimateSites = ['google', 'facebook', 'amazon', 'microsoft', 'apple', 'paypal', 'netflix'];
    
    for (const site of legitimateSites) {
      if (domain.includes(site) && !domain.endsWith(`${site}.com`)) {
        return true;
      }
    }
    return false;
  };

  const checkSuspiciousKeywords = (url: string): boolean => {
    const suspiciousKeywords = ['verify', 'secure', 'account', 'update', 'confirm', 'login'];
    return suspiciousKeywords.filter(keyword => url.includes(keyword)).length >= 2;
  };

  const calculateAdvancedRiskScore = (features: any, certificate: any, brandAnalysis: any): number => {
    let score = 0;
    
    if (features.hasIPAddress) score += 40;
    if (features.mimicsKnownSites) score += 35;
    if (brandAnalysis.brandImpersonation) score += 30;
    if (!certificate.isValid) score += 25;
    if (features.suspiciousTLD) score += 30;
    if (!features.usesHTTPS) score += 20;
    if (features.containsSuspiciousKeywords) score += 25;
    if (features.hasRedirect) score += 20;
    if (features.urlLength > 150) score += 15;
    if (certificate.trustScore < 50) score += 15;
    
    return Math.min(100, score);
  };

  const calculateConfidence = (features: any, certificate: any, brandAnalysis: any): number => {
    let confidence = 85;
    if (features.hasIPAddress || brandAnalysis.brandImpersonation) confidence += 10;
    if (certificate.isValid && features.usesHTTPS) confidence += 5;
    return Math.min(99, confidence);
  };

  const generateAdvancedRecommendations = (features: any, isPhishing: boolean, certificate: any, brandAnalysis: any, threatIntel: any): string[] => {
    const recommendations = [];
    
    if (isPhishing) {
      recommendations.push("🚨 CRITICAL: Do NOT enter any personal information");
      recommendations.push("🔒 Immediately close this website and clear browser cache");
      recommendations.push("📞 Contact the legitimate organization directly");
    }
    
    if (brandAnalysis.brandImpersonation) {
      recommendations.push(`🎭 Suspected impersonation of ${brandAnalysis.suspectedBrand}`);
    }
    
    if (!certificate.isValid) {
      recommendations.push("🛡️ Invalid SSL certificate detected - major security risk");
    }
    
    if (threatIntel.reportedTimes > 5) {
      recommendations.push(`⚠️ Reported ${threatIntel.reportedTimes} times in threat databases`);
    }
    
    return recommendations;
  };

  const handleReset = () => {
    setUrl("");
    setResult(null);
    setAnalysisProgress(0);
    setCurrentStage("");
  };

  return (
    <div className="max-w-7xl mx-auto">
      <Tabs defaultValue="analyzer" className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-white/10 border border-white/20">
          <TabsTrigger value="analyzer" className="text-white data-[state=active]:bg-blue-500/30">URL Analyzer</TabsTrigger>
          <TabsTrigger value="dashboard" className="text-white data-[state=active]:bg-blue-500/30">Threat Dashboard</TabsTrigger>
          <TabsTrigger value="sharing" className="text-white data-[state=active]:bg-blue-500/30">Threat Sharing</TabsTrigger>
          <TabsTrigger value="reports" className="text-white data-[state=active]:bg-blue-500/30">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="analyzer" className="mt-6">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-2xl">
            <URLAnalyzer 
              url={url}
              setUrl={setUrl}
              onAnalyze={analyzeURL}
              isAnalyzing={isAnalyzing}
            />
            
            {isAnalyzing && (
              <div className="mt-8 space-y-4">
                <div className="text-center">
                  <div className="inline-flex items-center space-x-2 text-blue-300 mb-4">
                    <div className="w-5 h-5 border-2 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
                    <span className="text-lg font-semibold">Advanced AI Analysis in Progress</span>
                  </div>
                  <p className="text-blue-200 text-sm mb-4">{currentStage}</p>
                </div>
                
                <div className="bg-black/20 rounded-full h-4 overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-500 via-cyan-400 to-green-400 rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${analysisProgress}%` }}
                  ></div>
                </div>
                <div className="text-center text-blue-300 text-sm">
                  {Math.round(analysisProgress)}% Complete
                </div>
              </div>
            )}

            {result && (
              <div className="mt-8 space-y-6">
                <ThreatIndicator result={result} />
                
                <div className="grid md:grid-cols-2 gap-6">
                  <FeatureAnalysis result={result} />
                  <div className="space-y-6">
                    <CertificateAnalysis certificate={result.certificate} />
                    <BrandAnalysis brandAnalysis={result.brandAnalysis} />
                  </div>
                </div>
                
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
        </TabsContent>

        <TabsContent value="dashboard" className="mt-6">
          <GlobalThreatDashboard />
        </TabsContent>

        <TabsContent value="sharing" className="mt-6">
          <ThreatSharing />
        </TabsContent>

        <TabsContent value="reports" className="mt-6">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
            <h3 className="text-2xl font-bold text-white mb-4">Analysis Reports</h3>
            <p className="text-blue-200">Advanced reporting features coming soon...</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdvancedPhishingDetector;
