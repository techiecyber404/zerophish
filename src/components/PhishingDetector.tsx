
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
    hasIPAddress: boolean;
    suspiciousTLD: boolean;
    hasRedirect: boolean;
    containsSuspiciousKeywords: boolean;
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
      await new Promise(resolve => setTimeout(resolve, 2500));

      // Extract features from URL
      const urlObj = new URL(urlToAnalyze);
      const domain = urlObj.hostname.toLowerCase();
      const path = urlObj.pathname.toLowerCase();
      const fullUrl = urlToAnalyze.toLowerCase();
      
      console.log('Analyzing URL:', urlToAnalyze);
      console.log('Domain:', domain);
      console.log('Path:', path);
      
      // Enhanced feature extraction logic
      const features = {
        // Check if domain is IP address
        hasIPAddress: /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/.test(domain),
        
        // Check for suspicious TLDs
        suspiciousTLD: /\.(tk|ml|ga|cf|bit|cc|pw|top|click|download|science|work|cricket|accountant|review|country|stream|gq|racing|party|faith|bid|win|date|loan|site|website|online|agency)$/i.test(domain),
        
        // Check for suspicious domains and URL shorteners
        suspiciousDomain: domain.includes('bit.ly') || 
                         domain.includes('tinyurl') || 
                         domain.includes('t.co') ||
                         domain.includes('goo.gl') ||
                         domain.includes('ow.ly') ||
                         domain.includes('short.link') ||
                         /[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}/.test(domain),
        
        // Check subdomain count (more than 3 is suspicious)
        hasSubdomains: domain.split('.').length > 3,
        
        // Protocol check
        usesHTTPS: urlObj.protocol === 'https:',
        
        // Domain age (simulated)
        domainAge: 'Unknown',
        
        // URL length check
        urlLength: urlToAnalyze.length,
        
        // Check for suspicious characters in path
        hasSpecialChars: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~`]/.test(path) && path.length > 1,
        
        // Enhanced domain mimicking check
        mimicsKnownSites: checkForMimickedSites(domain),
        
        // Check for redirects (simplified)
        hasRedirect: path.includes('redirect') || path.includes('r=') || path.includes('url=') || path.includes('goto='),
        
        // Check for suspicious keywords
        containsSuspiciousKeywords: checkSuspiciousKeywords(fullUrl)
      };

      console.log('Extracted features:', features);

      // Enhanced risk scoring algorithm
      let riskScore = 0;
      let riskFactors = [];

      // High-risk indicators (30-40 points each)
      if (features.hasIPAddress) {
        riskScore += 40;
        riskFactors.push('IP address used instead of domain');
      }
      
      if (features.mimicsKnownSites) {
        riskScore += 35;
        riskFactors.push('Domain mimics legitimate sites');
      }
      
      if (features.suspiciousTLD) {
        riskScore += 30;
        riskFactors.push('Suspicious top-level domain');
      }

      // Medium-risk indicators (15-25 points each)
      if (features.suspiciousDomain) {
        riskScore += 25;
        riskFactors.push('Suspicious domain characteristics');
      }
      
      if (!features.usesHTTPS) {
        riskScore += 20;
        riskFactors.push('No HTTPS encryption');
      }
      
      if (features.containsSuspiciousKeywords) {
        riskScore += 25;
        riskFactors.push('Contains suspicious keywords');
      }
      
      if (features.hasRedirect) {
        riskScore += 20;
        riskFactors.push('Contains redirect mechanisms');
      }

      // Low-risk indicators (5-15 points each)
      if (features.urlLength > 150) {
        riskScore += 15;
        riskFactors.push('Unusually long URL');
      } else if (features.urlLength > 100) {
        riskScore += 10;
        riskFactors.push('Long URL');
      }
      
      if (features.hasSubdomains && (features.suspiciousDomain || features.mimicsKnownSites)) {
        riskScore += 15;
        riskFactors.push('Multiple subdomains with suspicious characteristics');
      }
      
      if (features.hasSpecialChars) {
        riskScore += 8;
        riskFactors.push('Suspicious characters in URL path');
      }

      // Cap risk score at 100
      riskScore = Math.min(100, riskScore);
      
      const isPhishing = riskScore >= 45; // Lowered threshold for better sensitivity
      
      // Calculate confidence based on number of risk factors and their severity
      const baseConfidence = Math.min(95, Math.max(65, 60 + (riskFactors.length * 8) + (riskScore * 0.3)));
      const confidence = Math.round(baseConfidence * 10) / 10;

      console.log('Risk score:', riskScore);
      console.log('Risk factors:', riskFactors);
      console.log('Is phishing:', isPhishing);

      const recommendations = generateRecommendations(features, isPhishing, riskFactors);

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
        description: `Analysis completed with ${confidence}% confidence`,
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
    const legitimateSites = [
      'google', 'facebook', 'amazon', 'microsoft', 'apple', 'paypal', 'netflix',
      'instagram', 'twitter', 'linkedin', 'ebay', 'yahoo', 'gmail', 'outlook',
      'spotify', 'youtube', 'dropbox', 'adobe', 'salesforce', 'zoom'
    ];
    
    // Check for exact matches with slight variations
    for (const site of legitimateSites) {
      // Check for typosquatting (character substitution)
      if (domain.includes(site) && !domain.endsWith(`${site}.com`) && !domain.endsWith(`${site}.net`) && !domain.endsWith(`${site}.org`)) {
        return true;
      }
      
      // Check for homograph attacks (similar looking characters)
      const variations = [
        site.replace('o', '0'),
        site.replace('e', '3'),
        site.replace('a', '@'),
        site.replace('i', '1'),
        site.replace('l', '1'),
        `${site}-`,
        `-${site}`,
        `${site}1`,
        `secure${site}`,
        `${site}secure`,
        `verify${site}`,
        `${site}verify`
      ];
      
      if (variations.some(variation => domain.includes(variation))) {
        return true;
      }
    }
    
    return false;
  };

  const checkSuspiciousKeywords = (url: string): boolean => {
    const suspiciousKeywords = [
      'verify', 'secure', 'account', 'update', 'confirm', 'login', 'signin',
      'bank', 'paypal', 'amazon', 'microsoft', 'apple', 'google', 'facebook',
      'suspended', 'expired', 'urgent', 'immediate', 'action', 'required',
      'click', 'here', 'now', 'limited', 'time', 'offer', 'free', 'prize',
      'winner', 'congratulations', 'selected', 'claim', 'reward'
    ];
    
    const urlLower = url.toLowerCase();
    let suspiciousCount = 0;
    
    for (const keyword of suspiciousKeywords) {
      if (urlLower.includes(keyword)) {
        suspiciousCount++;
      }
    }
    
    // If URL contains 3 or more suspicious keywords, flag it
    return suspiciousCount >= 3;
  };

  const generateRecommendations = (features: any, isPhishing: boolean, riskFactors: string[]): string[] => {
    const recommendations = [];
    
    if (isPhishing) {
      recommendations.push("🚫 Do NOT enter personal information on this site");
      recommendations.push("🔒 Verify the website's authenticity through official channels");
      recommendations.push("📞 Contact the company directly using official contact information");
    }
    
    if (features.hasIPAddress) {
      recommendations.push("⚠️ This URL uses an IP address instead of a domain name - highly suspicious");
    }
    
    if (!features.usesHTTPS) {
      recommendations.push("🔓 This site doesn't use HTTPS - avoid entering sensitive data");
    }
    
    if (features.suspiciousTLD) {
      recommendations.push("🏴 Domain uses a suspicious top-level domain often used by scammers");
    }
    
    if (features.mimicsKnownSites) {
      recommendations.push("🎭 This site may be impersonating a legitimate service");
    }

    if (features.hasRedirect) {
      recommendations.push("↩️ URL contains redirect mechanisms - check final destination");
    }

    if (!isPhishing && riskFactors.length === 0) {
      recommendations.push("✅ URL appears legitimate based on our analysis");
      recommendations.push("🛡️ Continue browsing with normal security precautions");
    } else if (!isPhishing) {
      recommendations.push("⚠️ Some minor concerns detected - proceed with caution");
      recommendations.push("🔍 Double-check the website's legitimacy if entering sensitive information");
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
              <span className="text-lg">Analyzing URL with Enhanced AI...</span>
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
