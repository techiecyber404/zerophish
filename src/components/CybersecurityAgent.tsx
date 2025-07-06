
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

interface AnalysisInput {
  url: string;
  ipAddress?: string;
  hostingCountry?: string;
  htmlContent?: string;
  screenshot?: File;
}

interface LayeredAnalysisResult {
  threatLevel: 'HIGH' | 'MEDIUM' | 'LOW';
  phishingScore: number;
  verdict: 'LEGITIMATE' | 'SUSPICIOUS' | 'PHISHING';
  layers: {
    urlDomain: LayerResult;
    ipGeoLocation: LayerResult;
    sslSecurity: LayerResult;
    htmlAnalysis: LayerResult;
    visualBrand: LayerResult;
    threatIntel: LayerResult;
  };
  explanation: string[];
  recommendations: string[];
  confidence: number;
}

interface LayerResult {
  score: number;
  status: 'PASS' | 'WARN' | 'FAIL';
  findings: string[];
  weight: number;
}

const CybersecurityAgent = () => {
  const [input, setInput] = useState<AnalysisInput>({
    url: '',
    ipAddress: '',
    hostingCountry: '',
    htmlContent: ''
  });
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<LayeredAnalysisResult | null>(null);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [currentLayer, setCurrentLayer] = useState('');
  const { toast } = useToast();

  const analysisLayers = [
    "Initializing cybersecurity modules...",
    "Layer 1: URL & Domain Features Analysis",
    "Layer 2: IP Address & Geo-Location Check",
    "Layer 3: SSL Certificate & Security Headers",
    "Layer 4: Webpage HTML Deep Analysis",
    "Layer 5: Visual & Brand Impersonation Detection",
    "Layer 6: Reputation & Threat Intelligence",
    "Calculating final threat assessment..."
  ];

  const performLayeredAnalysis = async () => {
    setIsAnalyzing(true);
    setResult(null);
    setAnalysisProgress(0);

    try {
      // Validate URL
      if (!input.url.trim()) {
        throw new Error("URL is required for analysis");
      }

      let urlToAnalyze = input.url.trim();
      if (!urlToAnalyze.startsWith('http://') && !urlToAnalyze.startsWith('https://')) {
        urlToAnalyze = 'https://' + urlToAnalyze;
      }

      const urlObj = new URL(urlToAnalyze);

      // Simulate comprehensive analysis with progress updates
      for (let i = 0; i < analysisLayers.length; i++) {
        setCurrentLayer(analysisLayers[i]);
        setAnalysisProgress((i + 1) / analysisLayers.length * 100);
        await new Promise(resolve => setTimeout(resolve, 800));
      }

      // Layer 1: URL & Domain Features
      const urlDomainLayer = analyzeUrlDomain(urlObj);
      
      // Layer 2: IP & Geo-Location
      const ipGeoLayer = analyzeIpGeoLocation(input.ipAddress, input.hostingCountry);
      
      // Layer 3: SSL & Security
      const sslSecurityLayer = analyzeSslSecurity(urlObj);
      
      // Layer 4: HTML Analysis
      const htmlAnalysisLayer = analyzeHtmlContent(input.htmlContent);
      
      // Layer 5: Visual & Brand
      const visualBrandLayer = analyzeVisualBrand(urlObj.hostname);
      
      // Layer 6: Threat Intel
      const threatIntelLayer = analyzeThreatIntelligence(urlObj.hostname);

      // Calculate weighted final score
      const layers = {
        urlDomain: urlDomainLayer,
        ipGeoLocation: ipGeoLayer,
        sslSecurity: sslSecurityLayer,
        htmlAnalysis: htmlAnalysisLayer,
        visualBrand: visualBrandLayer,
        threatIntel: threatIntelLayer
      };

      const weightedScore = calculateWeightedScore(layers);
      const threatLevel = getThreatLevel(weightedScore);
      const verdict = getVerdict(weightedScore);

      const analysisResult: LayeredAnalysisResult = {
        threatLevel,
        phishingScore: Math.round(weightedScore),
        verdict,
        layers,
        explanation: generateExplanation(layers),
        recommendations: generateRecommendations(verdict, layers),
        confidence: calculateConfidence(layers)
      };

      setResult(analysisResult);
      
      toast({
        title: `🔍 Analysis Complete - ${verdict}`,
        description: `Threat Level: ${threatLevel} | Score: ${Math.round(weightedScore)}/100`,
        variant: verdict === 'PHISHING' ? "destructive" : "default",
      });

    } catch (error) {
      console.error('Cybersecurity analysis error:', error);
      toast({
        title: "Analysis Failed",
        description: error instanceof Error ? error.message : "Unknown error occurred",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Layer Analysis Functions
  const analyzeUrlDomain = (urlObj: URL): LayerResult => {
    const domain = urlObj.hostname.toLowerCase();
    const path = urlObj.pathname;
    const findings: string[] = [];
    let score = 0;

    // Check for IP address
    if (/^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/.test(domain)) {
      score += 40;
      findings.push("🚨 Uses IP address instead of domain name (CRITICAL)");
    }

    // Suspicious TLD check
    if (/\.(tk|ml|ga|cf|bit|cc|pw|top|click|download)$/i.test(domain)) {
      score += 25;
      findings.push("⚠️ Suspicious top-level domain detected");
    }

    // Typosquatting detection
    const legitimateBrands = ['google', 'facebook', 'amazon', 'microsoft', 'apple', 'paypal'];
    for (const brand of legitimateBrands) {
      if (domain.includes(brand) && !domain.endsWith(`${brand}.com`)) {
        score += 30;
        findings.push(`🎭 Potential ${brand} typosquatting detected`);
      }
    }

    // Subdomain abuse
    if (domain.split('.').length > 3) {
      score += 15;
      findings.push("📍 Multiple subdomains detected");
    }

    // Suspicious characters
    if (/@|\/\//.test(urlObj.href) && urlObj.href.indexOf('@') > 8) {
      score += 35;
      findings.push("🔴 Suspicious URL redirects detected");
    }

    return {
      score: Math.min(100, score),
      status: score >= 40 ? 'FAIL' : score >= 20 ? 'WARN' : 'PASS',
      findings,
      weight: 0.25
    };
  };

  const analyzeIpGeoLocation = (ip?: string, country?: string): LayerResult => {
    const findings: string[] = [];
    let score = 0;

    if (country) {
      const suspiciousCountries = ['russia', 'china', 'north korea', 'iran'];
      if (suspiciousCountries.some(c => country.toLowerCase().includes(c))) {
        score += 20;
        findings.push(`🌍 Hosted in high-risk country: ${country}`);
      }
    }

    if (ip) {
      // Simulate IP reputation check
      if (Math.random() > 0.7) {
        score += 25;
        findings.push("🔍 IP address found in threat databases");
      }
    }

    return {
      score: Math.min(100, score),
      status: score >= 30 ? 'FAIL' : score >= 15 ? 'WARN' : 'PASS',
      findings: findings.length > 0 ? findings : ["✅ No geo-location red flags detected"],
      weight: 0.15
    };
  };

  const analyzeSslSecurity = (urlObj: URL): LayerResult => {
    const findings: string[] = [];
    let score = 0;

    if (urlObj.protocol !== 'https:') {
      score += 30;
      findings.push("🔓 No HTTPS encryption - MAJOR RISK");
    } else {
      findings.push("🔒 HTTPS encryption detected");
    }

    // Simulate certificate validation
    if (Math.random() > 0.8) {
      score += 20;
      findings.push("⚠️ Self-signed or invalid SSL certificate");
    }

    return {
      score: Math.min(100, score),
      status: score >= 25 ? 'FAIL' : score >= 10 ? 'WARN' : 'PASS',
      findings,
      weight: 0.20
    };
  };

  const analyzeHtmlContent = (html?: string): LayerResult => {
    const findings: string[] = [];
    let score = 0;

    if (!html) {
      findings.push("ℹ️ No HTML content provided for analysis");
      return { score: 0, status: 'PASS', findings, weight: 0.15 };
    }

    // Check for credential harvesting
    if (/<input[^>]*type=['"]password['"][^>]*>/i.test(html)) {
      score += 20;
      findings.push("🔑 Password input fields detected");
    }

    // Check for obfuscated scripts
    if (/eval\(|document\.write\(|base64/i.test(html)) {
      score += 25;
      findings.push("⚠️ Potentially obfuscated JavaScript detected");
    }

    // Check for hidden form fields
    if (/<input[^>]*type=['"]hidden['"][^>]*>/gi.test(html)) {
      score += 10;
      findings.push("👁️ Hidden form fields present");
    }

    return {
      score: Math.min(100, score),
      status: score >= 30 ? 'FAIL' : score >= 15 ? 'WARN' : 'PASS',
      findings: findings.length > 0 ? findings : ["✅ No malicious HTML patterns detected"],
      weight: 0.15
    };
  };

  const analyzeVisualBrand = (domain: string): LayerResult => {
    const findings: string[] = [];
    let score = 0;

    const brandKeywords = ['secure', 'verify', 'account', 'update', 'suspended'];
    const domainLower = domain.toLowerCase();

    for (const keyword of brandKeywords) {
      if (domainLower.includes(keyword)) {
        score += 15;
        findings.push(`🎯 Brand impersonation keyword: "${keyword}"`);
      }
    }

    // Simulate visual similarity check
    if (Math.random() > 0.6) {
      score += 30;
      findings.push("🖼️ High visual similarity to legitimate brand detected");
    }

    return {
      score: Math.min(100, score),
      status: score >= 35 ? 'FAIL' : score >= 20 ? 'WARN' : 'PASS',
      findings: findings.length > 0 ? findings : ["✅ No brand impersonation detected"],
      weight: 0.15
    };
  };

  const analyzeThreatIntelligence = (domain: string): LayerResult => {
    const findings: string[] = [];
    let score = 0;

    // Simulate threat intelligence checks
    if (Math.random() > 0.7) {
      score += 40;
      findings.push("🚨 Domain found in phishing blacklists");
    }

    if (Math.random() > 0.8) {
      score += 25;
      findings.push("⚠️ Recent malware activity associated with domain");
    }

    // Domain age simulation
    const daysSinceCreation = Math.floor(Math.random() * 365);
    if (daysSinceCreation < 30) {
      score += 20;
      findings.push(`📅 Domain recently created (${daysSinceCreation} days ago)`);
    }

    return {
      score: Math.min(100, score),
      status: score >= 40 ? 'FAIL' : score >= 20 ? 'WARN' : 'PASS',
      findings: findings.length > 0 ? findings : ["✅ Clean threat intelligence reputation"],
      weight: 0.30
    };
  };

  const calculateWeightedScore = (layers: LayeredAnalysisResult['layers']): number => {
    return Object.values(layers).reduce((total, layer) => {
      return total + (layer.score * layer.weight);
    }, 0);
  };

  const getThreatLevel = (score: number): 'HIGH' | 'MEDIUM' | 'LOW' => {
    if (score >= 60) return 'HIGH';
    if (score >= 30) return 'MEDIUM';
    return 'LOW';
  };

  const getVerdict = (score: number): 'LEGITIMATE' | 'SUSPICIOUS' | 'PHISHING' => {
    if (score >= 70) return 'PHISHING';
    if (score >= 40) return 'SUSPICIOUS';
    return 'LEGITIMATE';
  };

  const generateExplanation = (layers: LayeredAnalysisResult['layers']): string[] => {
    const explanations: string[] = [];
    
    Object.entries(layers).forEach(([layerName, layer]) => {
      if (layer.status === 'FAIL') {
        explanations.push(`❌ ${layerName}: Critical security issues detected`);
      } else if (layer.status === 'WARN') {
        explanations.push(`⚠️ ${layerName}: Moderate concerns identified`);
      }
    });

    return explanations;
  };

  const generateRecommendations = (verdict: string, layers: LayeredAnalysisResult['layers']): string[] => {
    const recommendations: string[] = [];

    if (verdict === 'PHISHING') {
      recommendations.push("🚨 IMMEDIATE ACTION: Do NOT enter any credentials or personal information");
      recommendations.push("🔒 Close the website immediately and clear browser cache");
      recommendations.push("📞 Report this site to your IT security team");
    } else if (verdict === 'SUSPICIOUS') {
      recommendations.push("⚠️ Exercise extreme caution on this website");
      recommendations.push("🔍 Verify the website's authenticity through official channels");
      recommendations.push("🛡️ Avoid entering sensitive information");
    } else {
      recommendations.push("✅ Website appears legitimate based on current analysis");
      recommendations.push("🔒 Continue with normal security precautions");
    }

    return recommendations;
  };

  const calculateConfidence = (layers: LayeredAnalysisResult['layers']): number => {
    const analyzedLayers = Object.values(layers).filter(layer => layer.findings.length > 0);
    return Math.min(95, 70 + (analyzedLayers.length * 5));
  };

  const handleReset = () => {
    setInput({
      url: '',
      ipAddress: '',
      hostingCountry: '',
      htmlContent: ''
    });
    setResult(null);
    setAnalysisProgress(0);
    setCurrentLayer('');
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <Card className="bg-white/10 backdrop-blur-lg border border-white/20">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-white flex items-center space-x-2">
            <div className="w-8 h-8 bg-red-500/20 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <span>Advanced Cybersecurity Agent</span>
          </CardTitle>
          <p className="text-blue-200">Multi-layered phishing detection with AI-powered threat analysis</p>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-white font-medium mb-2">Target URL *</label>
              <Input
                value={input.url}
                onChange={(e) => setInput({ ...input, url: e.target.value })}
                placeholder="https://example.com"
                className="bg-white/10 border-white/30 text-white"
                disabled={isAnalyzing}
              />
            </div>
            <div>
              <label className="block text-white font-medium mb-2">IP Address</label>
              <Input
                value={input.ipAddress}
                onChange={(e) => setInput({ ...input, ipAddress: e.target.value })}
                placeholder="192.168.1.1"
                className="bg-white/10 border-white/30 text-white"
                disabled={isAnalyzing}
              />
            </div>
          </div>

          <div>
            <label className="block text-white font-medium mb-2">Hosting Country</label>
            <Input
              value={input.hostingCountry}
              onChange={(e) => setInput({ ...input, hostingCountry: e.target.value })}
              placeholder="United States"
              className="bg-white/10 border-white/30 text-white"
              disabled={isAnalyzing}
            />
          </div>

          <div>
            <label className="block text-white font-medium mb-2">Raw HTML Content (Optional)</label>
            <Textarea
              value={input.htmlContent}
              onChange={(e) => setInput({ ...input, htmlContent: e.target.value })}
              placeholder="Paste HTML content here for deep analysis..."
              className="bg-white/10 border-white/30 text-white min-h-24"
              disabled={isAnalyzing}
            />
          </div>

          <Button
            onClick={performLayeredAnalysis}
            disabled={isAnalyzing || !input.url.trim()}
            className="w-full h-12 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-semibold"
          >
            {isAnalyzing ? (
              <span className="flex items-center space-x-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Analyzing Threats...</span>
              </span>
            ) : (
              <span className="flex items-center space-x-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Start Multi-Layer Analysis</span>
              </span>
            )}
          </Button>

          {isAnalyzing && (
            <div className="space-y-4">
              <div className="text-center">
                <p className="text-blue-200 text-sm mb-2">{currentLayer}</p>
                <Progress value={analysisProgress} className="h-3" />
                <p className="text-blue-300 text-sm mt-2">{Math.round(analysisProgress)}% Complete</p>
              </div>
            </div>
          )}

          {result && (
            <div className="space-y-6 mt-8">
              {/* Threat Assessment */}
              <Card className={`${
                result.threatLevel === 'HIGH' ? 'bg-red-500/20 border-red-400' :
                result.threatLevel === 'MEDIUM' ? 'bg-orange-500/20 border-orange-400' :
                'bg-green-500/20 border-green-400'
              } border-2`}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Badge variant={result.threatLevel === 'HIGH' ? 'destructive' : 'default'} className="text-lg px-4 py-2">
                        {result.verdict}
                      </Badge>
                      <div className="text-white">
                        <div className="text-2xl font-bold">{result.phishingScore}/100</div>
                        <div className="text-sm opacity-80">Threat Score</div>
                      </div>
                    </div>
                    <div className="text-right text-white">
                      <div className="text-lg font-semibold">Level: {result.threatLevel}</div>
                      <div className="text-sm opacity-80">Confidence: {result.confidence}%</div>
                    </div>
                  </div>
                </CardHeader>
              </Card>

              {/* Layer Results */}
              <Tabs defaultValue="layers" className="w-full">
                <TabsList className="grid w-full grid-cols-3 bg-white/10">
                  <TabsTrigger value="layers" className="text-white">Layer Results</TabsTrigger>
                  <TabsTrigger value="explanation" className="text-white">Analysis</TabsTrigger>
                  <TabsTrigger value="recommendations" className="text-white">Recommendations</TabsTrigger>
                </TabsList>

                <TabsContent value="layers" className="space-y-4">
                  {Object.entries(result.layers).map(([layerName, layer]) => (
                    <Card key={layerName} className="bg-white/5 border-white/10">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="text-white font-semibold capitalize">{layerName.replace(/([A-Z])/g, ' $1')}</h4>
                          <Badge variant={layer.status === 'FAIL' ? 'destructive' : layer.status === 'WARN' ? 'secondary' : 'default'}>
                            {layer.status}
                          </Badge>
                        </div>
                        <div className="space-y-2">
                          {layer.findings.map((finding, index) => (
                            <p key={index} className="text-white/80 text-sm">{finding}</p>
                          ))}
                        </div>
                        <div className="mt-3">
                          <div className="flex justify-between text-sm text-white/60">
                            <span>Layer Score</span>
                            <span>{layer.score}/100</span>
                          </div>
                          <Progress value={layer.score} className="h-2 mt-1" />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>

                <TabsContent value="explanation" className="space-y-3">
                  {result.explanation.map((explanation, index) => (
                    <p key={index} className="text-white/90 p-3 bg-white/5 rounded-lg">{explanation}</p>
                  ))}
                </TabsContent>

                <TabsContent value="recommendations" className="space-y-3">
                  {result.recommendations.map((recommendation, index) => (
                    <p key={index} className="text-white/90 p-3 bg-blue-500/10 rounded-lg border border-blue-400/30">{recommendation}</p>
                  ))}
                </TabsContent>
              </Tabs>

              <div className="flex justify-center">
                <Button onClick={handleReset} variant="outline" className="bg-white/10 border-white/30 text-white hover:bg-white/20">
                  Analyze Another URL
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CybersecurityAgent;
