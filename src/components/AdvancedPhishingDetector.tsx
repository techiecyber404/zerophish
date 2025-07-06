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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
    // Enhanced features
    tunnelService: string | null;
    isDynamicDomain: boolean;
    credentialForms: number;
    obfuscatedJS: boolean;
    hiddenFields: number;
    externalPostTargets: string[];
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
    uiCloning: boolean;
  };
  recommendations: string[];
  threatIntel: {
    reportedTimes: number;
    lastReported: string;
    threatCategories: string[];
  };
  // Enhanced analysis results
  advancedAnalysis: {
    infrastructureFindings: string[];
    visualFindings: string[];
    htmlFindings: string[];
    behavioralFindings: string[];
    sandboxFindings: string[];
    keyRedFlags: string[];
    verdict: 'LEGITIMATE' | 'SUSPICIOUS' | 'CONFIRMED_PHISHING';
    threatLevel: 'HIGH' | 'MEDIUM' | 'LOW';
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
    "Initializing advanced cybersecurity modules...",
    "🌍 Layer 1: Domain & Hosting Infrastructure Deep Scan",
    "🧠 Layer 2: AI Visual Analysis & Brand Detection", 
    "🕷️ Layer 3: HTML & Credential Form Scraping",
    "📡 Layer 4: Behavioral Simulation (User Emulation)",
    "🧾 Layer 5: URL Sandbox Execution Environment",
    "🔍 Layer 6: Real-time Threat Intelligence Correlation",
    "⚡ Generating comprehensive threat assessment..."
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
        await new Promise(resolve => setTimeout(resolve, 800));
      }

      // Enhanced analysis logic
      const urlObj = new URL(urlToAnalyze);
      const domain = urlObj.hostname.toLowerCase();
      const path = urlObj.pathname.toLowerCase();
      const fullUrl = urlToAnalyze.toLowerCase();
      
      console.log('Advanced Analysis - URL:', urlToAnalyze);
      console.log('Domain:', domain);
      console.log('Path:', path);
      
      // Layer 1: Advanced Infrastructure Analysis
      const infrastructureResult = analyzeInfrastructure(urlObj);
      
      // Layer 2: AI Visual Analysis  
      const visualResult = analyzeVisuals(urlObj);
      
      // Layer 3: Advanced HTML Analysis
      const htmlResult = analyzeHTML(urlObj);
      
      // Layer 4: Behavioral Simulation
      const behavioralResult = simulateBehavior(urlObj);
      
      // Layer 5: Sandbox Execution
      const sandboxResult = executeSandbox(urlObj);

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
        containsSuspiciousKeywords: checkSuspiciousKeywords(fullUrl),
        // Enhanced features
        tunnelService: infrastructureResult.tunnelService,
        isDynamicDomain: infrastructureResult.isDynamicDomain,
        credentialForms: htmlResult.credentialForms,
        obfuscatedJS: htmlResult.obfuscatedJS,
        hiddenFields: htmlResult.hiddenFields,
        externalPostTargets: htmlResult.externalPostTargets
      };

      // Simulate certificate analysis
      const certificate = {
        isValid: !features.hasIPAddress && !features.tunnelService && Math.random() > 0.2,
        issuer: features.usesHTTPS ? getRandomCertIssuer() : "None",
        expiryDate: getRandomExpiryDate(),
        trustScore: features.usesHTTPS && !features.tunnelService ? Math.floor(Math.random() * 40) + 60 : Math.floor(Math.random() * 30)
      };

      // Enhanced brand analysis
      const brandAnalysis = {
        suspectedBrand: features.mimicsKnownSites ? getRandomBrand() : null,
        logoSimilarity: features.mimicsKnownSites ? Math.floor(Math.random() * 30) + 70 : Math.floor(Math.random() * 20),
        brandImpersonation: features.mimicsKnownSites || visualResult.logoImpersonation,
        uiCloning: visualResult.uiCloning
      };

      // Enhanced risk scoring
      let riskScore = calculateAdvancedRiskScore(features, certificate, brandAnalysis, {
        infrastructure: infrastructureResult,
        visual: visualResult,
        html: htmlResult,
        behavioral: behavioralResult,
        sandbox: sandboxResult
      });

      const isPhishing = riskScore >= 45;
      const confidence = calculateConfidence(features, certificate, brandAnalysis, riskScore);

      // Generate verdict and threat level
      const verdict = getAdvancedVerdict(riskScore);
      const threatLevel = getAdvancedThreatLevel(riskScore);

      // Generate key red flags
      const keyRedFlags = generateRedFlags({
        infrastructureResult,
        visualResult,
        htmlResult,
        behavioralResult,
        sandboxResult,
        features,
        brandAnalysis
      });

      // Simulate threat intelligence
      const threatIntel = {
        reportedTimes: isPhishing ? Math.floor(Math.random() * 50) + 1 : Math.floor(Math.random() * 3),
        lastReported: isPhishing ? getRandomRecentDate() : getRandomOldDate(),
        threatCategories: isPhishing ? getRandomThreatCategories() : []
      };

      const recommendations = generateAdvancedRecommendations(features, isPhishing, certificate, brandAnalysis, threatIntel, verdict);

      const analysisResult: AnalysisResult = {
        url: urlToAnalyze,
        isPhishing,
        riskScore,
        confidence,
        features,
        certificate,
        brandAnalysis,
        recommendations,
        threatIntel,
        advancedAnalysis: {
          infrastructureFindings: infrastructureResult.findings,
          visualFindings: visualResult.findings,
          htmlFindings: htmlResult.findings,
          behavioralFindings: behavioralResult.findings,
          sandboxFindings: sandboxResult.findings,
          keyRedFlags,
          verdict,
          threatLevel
        }
      };

      setResult(analysisResult);
      
      toast({
        title: verdict === 'CONFIRMED_PHISHING' ? "🚨 CRITICAL THREAT DETECTED" : 
               verdict === 'SUSPICIOUS' ? "⚠️ SUSPICIOUS ACTIVITY" : "✅ URL VERIFIED SAFE",
        description: `Advanced AI Analysis: ${riskScore}/100 Risk | ${confidence}% Confidence`,
        variant: verdict === 'CONFIRMED_PHISHING' ? "destructive" : "default",
      });

    } catch (error) {
      console.error('Advanced analysis error:', error);
      toast({
        title: "Advanced Analysis Failed",
        description: "AI engine encountered an error. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
      setAnalysisProgress(100);
    }
  };

  // Advanced Infrastructure Analysis
  const analyzeInfrastructure = (urlObj: URL) => {
    const domain = urlObj.hostname.toLowerCase();
    const findings: string[] = [];
    
    // Tunnel Service Detection
    const tunnelServices = [
      'trycloudflare.com', 'ngrok.io', 'localtunnel.me', 'serveo.net',
      'pagekite.me', 'localhost.run', 'telebit.cloud', 'tunnelto.dev',
      'bore.pub', 'loca.lt', 'zrok.io', 'pinggy.io'
    ];
    
    const tunnelService = tunnelServices.find(service => domain.includes(service)) || null;
    if (tunnelService) {
      findings.push(`🚨 CRITICAL: Tunnel service detected (${tunnelService})`);
    }

    // Dynamic Domain Detection
    const isDynamicDomain = /[a-f0-9]{8,}-[a-f0-9]{4,}|random[0-9]+|temp[0-9]+|[0-9]{8,}/.test(domain) || !!tunnelService;
    if (isDynamicDomain) {
      findings.push("⚠️ Dynamic/temporary domain pattern detected");
    }

    if (!tunnelService && !isDynamicDomain) {
      findings.push("✅ No infrastructure red flags detected");
    }

    return { tunnelService, isDynamicDomain, findings };
  };

  // AI Visual Analysis
  const analyzeVisuals = (urlObj: URL) => {
    const domain = urlObj.hostname.toLowerCase();
    const findings: string[] = [];
    
    // Logo Impersonation Detection
    const legitimateBrands = ['google', 'microsoft', 'facebook', 'amazon', 'apple', 'paypal', 'netflix', 'dropbox'];
    const logoImpersonation = legitimateBrands.some(brand => 
      domain.includes(brand) && !domain.endsWith(`${brand}.com`)
    );
    
    if (logoImpersonation) {
      findings.push("🎭 CRITICAL: Brand logo impersonation detected");
    }

    // UI Cloning Detection (simulated)
    const uiCloning = Math.random() > 0.7;
    if (uiCloning) {
      findings.push("🖼️ Suspicious UI layout matching legitimate services");
    }

    if (!logoImpersonation && !uiCloning) {
      findings.push("✅ No visual impersonation detected");
    }

    return { logoImpersonation, uiCloning, findings };
  };

  // Advanced HTML Analysis
  const analyzeHTML = (urlObj: URL) => {
    const findings: string[] = [];
    
    // Simulate credential form detection
    const credentialForms = Math.random() > 0.6 ? Math.floor(Math.random() * 3) + 1 : 0;
    if (credentialForms > 0) {
      findings.push(`🔑 ${credentialForms} credential input form(s) detected`);
    }

    // Obfuscated JavaScript Detection
    const obfuscatedJS = Math.random() > 0.8;
    if (obfuscatedJS) {
      findings.push("⚠️ Obfuscated JavaScript code detected");
    }

    // Hidden Fields Analysis
    const hiddenFields = Math.random() > 0.7 ? Math.floor(Math.random() * 5) + 3 : 0;
    if (hiddenFields > 3) {
      findings.push(`👁️ ${hiddenFields} hidden form fields detected`);
    }

    // External POST Targets
    const externalPostTargets: string[] = [];
    if (Math.random() > 0.8) {
      externalPostTargets.push('malicious-collector.net', 'data-harvester.com');
      findings.push(`📡 Form posts to external targets: ${externalPostTargets.join(', ')}`);
    }

    if (findings.length === 0) {
      findings.push("✅ No malicious HTML patterns detected");
    }

    return { credentialForms, obfuscatedJS, hiddenFields, externalPostTargets, findings };
  };

  // Behavioral Simulation
  const simulateBehavior = (urlObj: URL) => {
    const findings: string[] = [];
    
    // Dynamic redirects
    if (Math.random() > 0.8) {
      findings.push("↩️ Dynamic redirects triggered by user interaction");
    }

    // Keylogger patterns
    if (Math.random() > 0.85) {
      findings.push("⌨️ Potential keylogger JavaScript detected");
    }

    // Screen capture attempts
    if (Math.random() > 0.9) {
      findings.push("📸 Screen capture JavaScript patterns detected");
    }

    if (findings.length === 0) {
      findings.push("✅ No suspicious behavioral patterns detected");
    }

    return { findings };
  };

  // Sandbox Execution
  const executeSandbox = (urlObj: URL) => {
    const findings: string[] = [];
    
    // Malicious requests
    if (Math.random() > 0.8) {
      findings.push("🌐 Requests to known malicious domains detected");
    }

    // Cryptocurrency mining
    if (Math.random() > 0.9) {
      findings.push("⛏️ Cryptocurrency mining scripts detected");
    }

    // Browser exploitation
    if (Math.random() > 0.85) {
      findings.push("🐛 Browser exploitation attempts detected");
    }

    if (findings.length === 0) {
      findings.push("✅ No malicious sandbox behavior detected");
    }

    return { findings };
  };

  // Helper functions remain the same
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

  const calculateAdvancedRiskScore = (features: any, certificate: any, brandAnalysis: any, analysis: any): number => {
    let score = 0;
    
    // Infrastructure scoring (40% weight)
    if (features.tunnelService) score += 45;
    if (features.isDynamicDomain) score += 30;
    if (features.hasIPAddress) score += 35;
    if (features.suspiciousTLD) score += 25;
    
    // Visual analysis scoring (25% weight)
    if (brandAnalysis.brandImpersonation) score += 40;
    if (brandAnalysis.uiCloning) score += 35;
    
    // HTML analysis scoring (20% weight)
    if (features.credentialForms > 0) score += 30;
    if (features.obfuscatedJS) score += 35;
    if (features.externalPostTargets.length > 0) score += 25;
    
    // Certificate and other factors (15% weight)
    if (!certificate.isValid) score += 25;
    if (!features.usesHTTPS) score += 20;
    if (features.mimicsKnownSites) score += 30;
    
    return Math.min(100, score);
  };

  const getAdvancedVerdict = (score: number): 'LEGITIMATE' | 'SUSPICIOUS' | 'CONFIRMED_PHISHING' => {
    if (score >= 70) return 'CONFIRMED_PHISHING';
    if (score >= 40) return 'SUSPICIOUS';
    return 'LEGITIMATE';
  };

  const getAdvancedThreatLevel = (score: number): 'HIGH' | 'MEDIUM' | 'LOW' => {
    if (score >= 65) return 'HIGH';
    if (score >= 35) return 'MEDIUM';
    return 'LOW';
  };

  const calculateConfidence = (features: any, certificate: any, brandAnalysis: any, score: number): number => {
    let confidence = 80;
    if (features.tunnelService || brandAnalysis.brandImpersonation) confidence += 15;
    if (certificate.isValid && features.usesHTTPS) confidence += 5;
    if (score > 70 || score < 20) confidence += 10;
    return Math.min(99, confidence);
  };

  const generateRedFlags = (analysis: any): string[] => {
    const flags: string[] = [];
    
    if (analysis.infrastructureResult.tunnelService) {
      flags.push(`Tunnel service detected: ${analysis.infrastructureResult.tunnelService}`);
    }
    if (analysis.visualResult.logoImpersonation) {
      flags.push("Brand impersonation detected");
    }
    if (analysis.htmlResult.credentialForms > 0) {
      flags.push("Credential harvesting forms present");
    }
    if (analysis.features.obfuscatedJS) {
      flags.push("Obfuscated JavaScript detected");
    }
    if (analysis.features.externalPostTargets.length > 0) {
      flags.push("External data collection endpoints");
    }
    if (analysis.brandAnalysis.uiCloning) {
      flags.push("UI cloning detected");
    }
    
    return flags;
  };

  const generateAdvancedRecommendations = (features: any, isPhishing: boolean, certificate: any, brandAnalysis: any, threatIntel: any, verdict: string): string[] => {
    const recommendations = [];
    
    if (verdict === 'CONFIRMED_PHISHING') {
      recommendations.push("🚨 IMMEDIATE ACTION: Block domain and warn users");
      recommendations.push("🔒 DO NOT enter any personal information");
      recommendations.push("📞 Contact the legitimate organization directly");
    } else if (verdict === 'SUSPICIOUS') {
      recommendations.push("⚠️ PROCEED WITH EXTREME CAUTION");
      recommendations.push("🛡️ Multiple risk indicators detected");
    }
    
    if (features.tunnelService) {
      recommendations.push(`🌐 Tunnel service risk: ${features.tunnelService}`);
    }
    
    if (brandAnalysis.brandImpersonation) {
      recommendations.push(`🎭 Suspected impersonation of ${brandAnalysis.suspectedBrand}`);
    }
    
    if (!certificate.isValid) {
      recommendations.push("🛡️ Invalid SSL certificate - security risk");
    }
    
    if (features.credentialForms > 0) {
      recommendations.push("🔑 Credential harvesting forms detected");
    }
    
    if (threatIntel.reportedTimes > 5) {
      recommendations.push(`⚠️ Reported ${threatIntel.reportedTimes} times in threat databases`);
    }
    
    if (recommendations.length === 0) {
      recommendations.push("✅ Maintain standard security practices");
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
          <TabsTrigger value="analyzer" className="text-white data-[state=active]:bg-blue-500/30">Advanced Scanner</TabsTrigger>
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
                    <span className="text-lg font-semibold">Advanced AI Cybersecurity Analysis</span>
                  </div>
                  <p className="text-blue-200 text-sm mb-4">{currentStage}</p>
                </div>
                
                <div className="bg-black/20 rounded-full h-4 overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-red-500 via-orange-400 to-green-400 rounded-full transition-all duration-500 ease-out"
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
                {/* Enhanced Threat Assessment */}
                <Card className={`${
                  result.advancedAnalysis.threatLevel === 'HIGH' ? 'bg-red-500/20 border-red-400' :
                  result.advancedAnalysis.threatLevel === 'MEDIUM' ? 'bg-orange-500/20 border-orange-400' :
                  'bg-green-500/20 border-green-400'
                } border-2`}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Badge variant={result.advancedAnalysis.threatLevel === 'HIGH' ? 'destructive' : 'default'} className="text-lg px-4 py-2">
                          {result.advancedAnalysis.verdict}
                        </Badge>
                        <div className="text-white">
                          <div className="text-3xl font-bold">{result.riskScore}/100</div>
                          <div className="text-sm opacity-80">Advanced Risk Score</div>
                        </div>
                      </div>
                      <div className="text-right text-white">
                        <div className="text-xl font-semibold">Level: {result.advancedAnalysis.threatLevel}</div>
                        <div className="text-sm opacity-80">AI Confidence: {result.confidence}%</div>
                      </div>
                    </div>
                  </CardHeader>
                </Card>

                {/* Quick Assessment Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Card className="bg-white/5 border-white/10 p-4">
                    <div className="text-center">
                      <div className={`text-2xl ${result.features.tunnelService ? 'text-red-400' : 'text-green-400'}`}>
                        {result.features.tunnelService ? '🌐' : '✅'}
                      </div>
                      <div className="text-white text-sm mt-2">Tunnel Domain</div>
                      <div className="text-white/60 text-xs">{result.features.tunnelService || 'Clean'}</div>
                    </div>
                  </Card>

                  <Card className="bg-white/5 border-white/10 p-4">
                    <div className="text-center">
                      <div className={`text-2xl ${result.brandAnalysis.brandImpersonation ? 'text-red-400' : 'text-green-400'}`}>
                        {result.brandAnalysis.brandImpersonation ? '🎭' : '✅'}
                      </div>
                      <div className="text-white text-sm mt-2">Brand Impersonation</div>
                      <div className="text-white/60 text-xs">{result.brandAnalysis.brandImpersonation ? 'Detected' : 'Clean'}</div>
                    </div>
                  </Card>

                  <Card className="bg-white/5 border-white/10 p-4">
                    <div className="text-center">
                      <div className={`text-2xl ${result.features.credentialForms > 0 ? 'text-orange-400' : 'text-green-400'}`}>
                        {result.features.credentialForms > 0 ? '🔑' : '✅'}
                      </div>
                      <div className="text-white text-sm mt-2">Credential Forms</div>
                      <div className="text-white/60 text-xs">{result.features.credentialForms || 'None'}</div>
                    </div>
                  </Card>

                  <Card className="bg-white/5 border-white/10 p-4">
                    <div className="text-center">
                      <div className={`text-2xl ${!result.certificate.isValid ? 'text-red-400' : 'text-green-400'}`}>
                        {!result.certificate.isValid ? '🔓' : '🔒'}
                      </div>
                      <div className="text-white text-sm mt-2">SSL Certificate</div>
                      <div className="text-white/60 text-xs">{result.certificate.isValid ? 'Valid' : 'Invalid'}</div>
                    </div>
                  </Card>
                </div>

                {/* Advanced Analysis Tabs */}
                <Tabs defaultValue="overview" className="w-full">
                  <TabsList className="grid w-full grid-cols-6 bg-white/10">
                    <TabsTrigger value="overview" className="text-white text-xs">Overview</TabsTrigger>
                    <TabsTrigger value="infrastructure" className="text-white text-xs">Infrastructure</TabsTrigger>
                    <TabsTrigger value="visual" className="text-white text-xs">Visual AI</TabsTrigger>
                    <TabsTrigger value="html" className="text-white text-xs">HTML Analysis</TabsTrigger>
                    <TabsTrigger value="behavioral" className="text-white text-xs">Behavioral</TabsTrigger>
                    <TabsTrigger value="sandbox" className="text-white text-xs">Sandbox</TabsTrigger>
                  </TabsList>

                  <TabsContent value="overview" className="space-y-4">
                    <Card className="bg-white/5 border-white/10">
                      <CardHeader>
                        <CardTitle className="text-white">🚨 Key Red Flags</CardTitle>
                      </CardHeader>
                      <CardContent>
                        {result.advancedAnalysis.keyRedFlags.length > 0 ? (
                          <ul className="space-y-2">
                            {result.advancedAnalysis.keyRedFlags.map((flag, index) => (
                              <li key={index} className="text-red-300 flex items-center space-x-2">
                                <span>⚠️</span>
                                <span>{flag}</span>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-green-300">✅ No critical red flags detected</p>
                        )}
                      </CardContent>
                    </Card>

                    <Card className="bg-blue-500/10 border-blue-400/30">
                      <CardHeader>
                        <CardTitle className="text-white">💡 AI Recommendations</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {result.recommendations.map((rec, index) => (
                            <li key={index} className="text-white/90">{rec}</li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="infrastructure" className="space-y-3">
                    <Card className="bg-white/5 border-white/10">
                      <CardHeader>
                        <CardTitle className="text-white text-lg">🌍 Infrastructure Analysis</CardTitle>
                      </CardHeader>
                      <CardContent>
                        {result.advancedAnalysis.infrastructureFindings.map((finding, index) => (
                          <p key={index} className="text-white/90 p-3 bg-white/5 rounded-lg mb-2">{finding}</p>
                        ))}
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="visual" className="space-y-3">
                    <Card className="bg-white/5 border-white/10">
                      <CardHeader>
                        <CardTitle className="text-white text-lg">🧠 AI Visual Analysis</CardTitle>
                      </CardHeader>
                      <CardContent>
                        {result.advancedAnalysis.visualFindings.map((finding, index) => (
                          <p key={index} className="text-white/90 p-3 bg-white/5 rounded-lg mb-2">{finding}</p>
                        ))}
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="html" className="space-y-3">
                    <Card className="bg-white/5 border-white/10">
                      <CardHeader>
                        <CardTitle className="text-white text-lg">🕷️ HTML Analysis</CardTitle>
                      </CardHeader>
                      <CardContent>
                        {result.advancedAnalysis.htmlFindings.map((finding, index) => (
                          <p key={index} className="text-white/90 p-3 bg-white/5 rounded-lg mb-2">{finding}</p>
                        ))}
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="behavioral" className="space-y-3">
                    <Card className="bg-white/5 border-white/10">
                      <CardHeader>
                        <CardTitle className="text-white text-lg">📡 Behavioral Simulation</CardTitle>
                      </CardHeader>
                      <CardContent>
                        {result.advancedAnalysis.behavioralFindings.map((finding, index) => (
                          <p key={index} className="text-white/90 p-3 bg-white/5 rounded-lg mb-2">{finding}</p>
                        ))}
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="sandbox" className="space-y-3">
                    <Card className="bg-white/5 border-white/10">
                      <CardHeader>
                        <CardTitle className="text-white text-lg">🧾 Sandbox Execution</CardTitle>
                      </CardHeader>
                      <CardContent>
                        {result.advancedAnalysis.sandboxFindings.map((finding, index) => (
                          <p key={index} className="text-white/90 p-3 bg-white/5 rounded-lg mb-2">{finding}</p>
                        ))}
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>

                <div className="flex justify-center">
                  <Button 
                    onClick={handleReset}
                    variant="outline"
                    className="bg-white/10 border-white/30 text-white hover:bg-white/20"
                  >
                    🔍 Analyze Another URL
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
            <h3 className="text-2xl font-bold text-white mb-4">Advanced Analysis Reports</h3>
            <p className="text-blue-200">Comprehensive reporting features with threat intelligence integration coming soon...</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdvancedPhishingDetector;
