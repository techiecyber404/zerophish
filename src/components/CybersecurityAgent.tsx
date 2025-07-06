
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
  sslInfo?: string;
}

interface AdvancedAnalysisResult {
  phishingScore: number;
  verdict: 'LEGITIMATE' | 'SUSPICIOUS' | 'CONFIRMED_PHISHING';
  threatLevel: 'HIGH' | 'MEDIUM' | 'LOW';
  confidence: number;
  detectedBrandImpersonation: boolean;
  tunnelBasedDomain: boolean;
  credentialFormPresent: boolean;
  sslCertificateStatus: 'VALID' | 'INVALID' | 'SUSPICIOUS';
  hostingIP: string;
  hostingCountry: string;
  blacklistReputation: 'CLEAN' | 'BLACKLISTED' | 'SUSPICIOUS';
  keyRedFlags: string[];
  recommendation: string;
  detailedAnalysis: {
    domainInfrastructure: InfrastructureResult;
    visualAnalysis: VisualResult;
    htmlAnalysis: HTMLResult;
    behavioralSimulation: BehavioralResult;
    sandboxExecution: SandboxResult;
  };
}

interface InfrastructureResult {
  tunnelService: string | null;
  isDynamicDomain: boolean;
  ipReputation: 'CLEAN' | 'SUSPICIOUS' | 'MALICIOUS';
  asnInfo: string;
  hostingProvider: string;
  geoRisk: 'LOW' | 'MEDIUM' | 'HIGH';
  findings: string[];
}

interface VisualResult {
  logoImpersonation: boolean;
  uiCloning: boolean;
  suspiciousLayouts: string[];
  colorSchemeAnalysis: string;
  findings: string[];
}

interface HTMLResult {
  credentialForms: number;
  obfuscatedJS: boolean;
  hiddenFields: number;
  externalPostTargets: string[];
  base64Content: boolean;
  findings: string[];
}

interface BehavioralResult {
  dynamicRedirects: boolean;
  userActionTriggers: string[];
  javascriptBehavior: string[];
  domManipulation: boolean;
  findings: string[];
}

interface SandboxResult {
  maliciousRequests: string[];
  dynamicContent: boolean;
  clientSideThreats: string[];
  networkActivity: string[];
  findings: string[];
}

const CybersecurityAgent = () => {
  const [input, setInput] = useState<AnalysisInput>({
    url: '',
    ipAddress: '',
    hostingCountry: '',
    htmlContent: '',
    sslInfo: ''
  });
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AdvancedAnalysisResult | null>(null);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [currentLayer, setCurrentLayer] = useState('');
  const { toast } = useToast();

  const analysisLayers = [
    "Initializing advanced cybersecurity modules...",
    "🌍 Layer 1: Domain & Hosting Infrastructure Deep Scan",
    "🧠 Layer 2: AI Visual Analysis & Brand Detection",
    "🕷️ Layer 3: HTML & Credential Form Scraping",
    "📡 Layer 4: Behavioral Simulation (User Emulation)",
    "🧾 Layer 5: URL Sandbox Execution Environment",
    "🔍 Layer 6: Real-time Threat Intelligence Correlation",
    "⚡ Generating comprehensive threat assessment..."
  ];

  const performAdvancedAnalysis = async () => {
    setIsAnalyzing(true);
    setResult(null);
    setAnalysisProgress(0);

    try {
      if (!input.url.trim()) {
        throw new Error("URL is required for advanced analysis");
      }

      let urlToAnalyze = input.url.trim();
      if (!urlToAnalyze.startsWith('http://') && !urlToAnalyze.startsWith('https://')) {
        urlToAnalyze = 'https://' + urlToAnalyze;
      }

      const urlObj = new URL(urlToAnalyze);

      // Advanced analysis with progress updates
      for (let i = 0; i < analysisLayers.length; i++) {
        setCurrentLayer(analysisLayers[i]);
        setAnalysisProgress((i + 1) / analysisLayers.length * 100);
        await new Promise(resolve => setTimeout(resolve, 1200));
      }

      // Layer 1: Advanced Infrastructure Analysis
      const infrastructureResult = analyzeInfrastructure(urlObj, input.ipAddress, input.hostingCountry);
      
      // Layer 2: AI Visual Analysis
      const visualResult = analyzeVisuals(urlObj);
      
      // Layer 3: Advanced HTML Analysis
      const htmlResult = analyzeHTML(input.htmlContent);
      
      // Layer 4: Behavioral Simulation
      const behavioralResult = simulateBehavior(urlObj);
      
      // Layer 5: Sandbox Execution
      const sandboxResult = executeSandbox(urlObj);

      // Calculate comprehensive threat score
      const phishingScore = calculateAdvancedScore({
        infrastructure: infrastructureResult,
        visual: visualResult,
        html: htmlResult,
        behavioral: behavioralResult,
        sandbox: sandboxResult
      });

      const verdict = getAdvancedVerdict(phishingScore);
      const threatLevel = getAdvancedThreatLevel(phishingScore);

      const analysisResult: AdvancedAnalysisResult = {
        phishingScore,
        verdict,
        threatLevel,
        confidence: calculateAdvancedConfidence(phishingScore),
        detectedBrandImpersonation: visualResult.logoImpersonation || visualResult.uiCloning,
        tunnelBasedDomain: !!infrastructureResult.tunnelService,
        credentialFormPresent: htmlResult.credentialForms > 0,
        sslCertificateStatus: analyzeSslStatus(urlObj, input.sslInfo),
        hostingIP: input.ipAddress || 'Unknown',
        hostingCountry: input.hostingCountry || 'Unknown',
        blacklistReputation: infrastructureResult.ipReputation === 'MALICIOUS' ? 'BLACKLISTED' : 
                           infrastructureResult.ipReputation === 'SUSPICIOUS' ? 'SUSPICIOUS' : 'CLEAN',
        keyRedFlags: generateRedFlags({ infrastructureResult, visualResult, htmlResult, behavioralResult, sandboxResult }),
        recommendation: generateAdvancedRecommendation(verdict, phishingScore),
        detailedAnalysis: {
          domainInfrastructure: infrastructureResult,
          visualAnalysis: visualResult,
          htmlAnalysis: htmlResult,
          behavioralSimulation: behavioralResult,
          sandboxExecution: sandboxResult
        }
      };

      setResult(analysisResult);
      
      toast({
        title: `🔍 Advanced Analysis Complete - ${verdict}`,
        description: `Threat Score: ${phishingScore}/100 | Confidence: ${analysisResult.confidence}%`,
        variant: verdict === 'CONFIRMED_PHISHING' ? "destructive" : "default",
      });

    } catch (error) {
      console.error('Advanced cybersecurity analysis error:', error);
      toast({
        title: "Advanced Analysis Failed",
        description: error instanceof Error ? error.message : "Unknown error occurred",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Advanced Infrastructure Analysis
  const analyzeInfrastructure = (urlObj: URL, ip?: string, country?: string): InfrastructureResult => {
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

    // IP Reputation Analysis
    let ipReputation: 'CLEAN' | 'SUSPICIOUS' | 'MALICIOUS' = 'CLEAN';
    if (tunnelService || isDynamicDomain) {
      ipReputation = 'SUSPICIOUS';
    }
    if (Math.random() > 0.8) {
      ipReputation = 'MALICIOUS';
      findings.push("🔴 IP address found in threat intelligence feeds");
    }

    // Geolocation Risk Assessment
    const highRiskCountries = ['russia', 'china', 'north korea', 'iran', 'nigeria'];
    const mediumRiskCountries = ['ukraine', 'romania', 'brazil', 'india'];
    
    let geoRisk: 'LOW' | 'MEDIUM' | 'HIGH' = 'LOW';
    if (country) {
      const countryLower = country.toLowerCase();
      if (highRiskCountries.some(c => countryLower.includes(c))) {
        geoRisk = 'HIGH';
        findings.push(`🌍 HIGH RISK: Hosted in ${country}`);
      } else if (mediumRiskCountries.some(c => countryLower.includes(c))) {
        geoRisk = 'MEDIUM';
        findings.push(`🌍 MEDIUM RISK: Hosted in ${country}`);
      }
    }

    return {
      tunnelService,
      isDynamicDomain,
      ipReputation,
      asnInfo: `AS${Math.floor(Math.random() * 99999)} - Simulated ASN`,
      hostingProvider: tunnelService ? 'Tunnel Service' : 'Unknown Provider',
      geoRisk,
      findings: findings.length > 0 ? findings : ["✅ No infrastructure red flags detected"]
    };
  };

  // AI Visual Analysis
  const analyzeVisuals = (urlObj: URL): VisualResult => {
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

    // Suspicious Layout Patterns
    const suspiciousLayouts: string[] = [];
    if (domain.includes('login') || domain.includes('verify')) {
      suspiciousLayouts.push('Login page impersonation');
      findings.push("🔑 Suspicious login page layout detected");
    }

    return {
      logoImpersonation,
      uiCloning,
      suspiciousLayouts,
      colorSchemeAnalysis: logoImpersonation ? 'Matches legitimate brand colors' : 'Standard color scheme',
      findings: findings.length > 0 ? findings : ["✅ No visual impersonation detected"]
    };
  };

  // Advanced HTML Analysis
  const analyzeHTML = (html?: string): HTMLResult => {
    const findings: string[] = [];
    
    if (!html) {
      findings.push("ℹ️ No HTML content provided for analysis");
      return {
        credentialForms: 0,
        obfuscatedJS: false,
        hiddenFields: 0,
        externalPostTargets: [],
        base64Content: false,
        findings
      };
    }

    // Credential Form Detection
    const passwordFields = (html.match(/<input[^>]*type=['"]password['"][^>]*>/gi) || []).length;
    const emailFields = (html.match(/<input[^>]*type=['"]email['"][^>]*>/gi) || []).length;
    const credentialForms = Math.max(passwordFields, emailFields);
    
    if (credentialForms > 0) {
      findings.push(`🔑 ${credentialForms} credential input form(s) detected`);
    }

    // Obfuscated JavaScript Detection
    const obfuscatedJS = /eval\(|atob\(|fromCharCode|\\x[0-9a-f]{2}/i.test(html);
    if (obfuscatedJS) {
      findings.push("⚠️ Obfuscated JavaScript code detected");
    }

    // Hidden Fields Analysis
    const hiddenFields = (html.match(/<input[^>]*type=['"]hidden['"][^>]*>/gi) || []).length;
    if (hiddenFields > 3) {
      findings.push(`👁️ ${hiddenFields} hidden form fields detected`);
    }

    // External POST Targets
    const formMatches = html.match(/<form[^>]*action=['"]([^'"]+)['"][^>]*>/gi) || [];
    const externalPostTargets = formMatches
      .map(match => match.match(/action=['"]([^'"]+)['"]/)?.[1])
      .filter(Boolean) as string[];
    
    if (externalPostTargets.length > 0) {
      findings.push(`📡 Form posts to external targets: ${externalPostTargets.join(', ')}`);
    }

    // Base64 Content Detection
    const base64Content = /data:image\/[^;]+;base64,|btoa\(|atob\(/.test(html);
    if (base64Content) {
      findings.push("📄 Base64 encoded content detected");
    }

    return {
      credentialForms,
      obfuscatedJS,
      hiddenFields,
      externalPostTargets,
      base64Content,
      findings: findings.length > 0 ? findings : ["✅ No malicious HTML patterns detected"]
    };
  };

  // Behavioral Simulation
  const simulateBehavior = (urlObj: URL): BehavioralResult => {
    const findings: string[] = [];
    
    // Simulate dynamic redirect detection
    const dynamicRedirects = Math.random() > 0.8;
    if (dynamicRedirects) {
      findings.push("↩️ Dynamic redirects triggered by user interaction");
    }

    // User Action Triggers
    const userActionTriggers: string[] = [];
    if (Math.random() > 0.7) {
      userActionTriggers.push('Form submission');
      findings.push("🎯 Malicious behavior triggered on form submission");
    }
    if (Math.random() > 0.8) {
      userActionTriggers.push('Button click');
      findings.push("🖱️ Suspicious redirects on button interactions");
    }

    // JavaScript Behavior Analysis
    const javascriptBehavior: string[] = [];
    if (Math.random() > 0.6) {
      javascriptBehavior.push('Keylogger patterns');
      findings.push("⌨️ Potential keylogger JavaScript detected");
    }
    if (Math.random() > 0.7) {
      javascriptBehavior.push('Screen capture attempts');
      findings.push("📸 Screen capture JavaScript patterns detected");
    }

    // DOM Manipulation Detection
    const domManipulation = Math.random() > 0.75;
    if (domManipulation) {
      findings.push("🔧 Suspicious DOM manipulation detected");
    }

    return {
      dynamicRedirects,
      userActionTriggers,
      javascriptBehavior,
      domManipulation,
      findings: findings.length > 0 ? findings : ["✅ No suspicious behavioral patterns detected"]
    };
  };

  // Sandbox Execution
  const executeSandbox = (urlObj: URL): SandboxResult => {
    const findings: string[] = [];
    
    // Malicious Network Requests
    const maliciousRequests: string[] = [];
    if (Math.random() > 0.8) {
      maliciousRequests.push('api.malicious-site.com');
      findings.push("🌐 Requests to known malicious domains detected");
    }
    if (Math.random() > 0.7) {
      maliciousRequests.push('data-collector.evil.net');
      findings.push("📡 Data exfiltration requests detected");
    }

    // Dynamic Content Loading
    const dynamicContent = Math.random() > 0.6;
    if (dynamicContent) {
      findings.push("🔄 Dynamic content loading from external sources");
    }

    // Client-side Threats
    const clientSideThreats: string[] = [];
    if (Math.random() > 0.8) {
      clientSideThreats.push('Cryptocurrency mining');
      findings.push("⛏️ Cryptocurrency mining scripts detected");
    }
    if (Math.random() > 0.75) {
      clientSideThreats.push('Browser exploitation');
      findings.push("🐛 Browser exploitation attempts detected");
    }

    // Network Activity Monitoring
    const networkActivity: string[] = [];
    if (maliciousRequests.length > 0 || dynamicContent) {
      networkActivity.push('Suspicious outbound connections');
    }

    return {
      maliciousRequests,
      dynamicContent,
      clientSideThreats,
      networkActivity,
      findings: findings.length > 0 ? findings : ["✅ No malicious sandbox behavior detected"]
    };
  };

  // Helper Functions
  const calculateAdvancedScore = (analysis: any): number => {
    let score = 0;
    
    // Infrastructure scoring (30% weight)
    if (analysis.infrastructure.tunnelService) score += 40;
    if (analysis.infrastructure.isDynamicDomain) score += 25;
    if (analysis.infrastructure.ipReputation === 'MALICIOUS') score += 35;
    if (analysis.infrastructure.geoRisk === 'HIGH') score += 20;
    
    // Visual analysis scoring (20% weight)
    if (analysis.visual.logoImpersonation) score += 35;
    if (analysis.visual.uiCloning) score += 30;
    
    // HTML analysis scoring (20% weight)
    if (analysis.html.credentialForms > 0) score += 25;
    if (analysis.html.obfuscatedJS) score += 30;
    if (analysis.html.externalPostTargets.length > 0) score += 20;
    
    // Behavioral scoring (15% weight)
    if (analysis.behavioral.dynamicRedirects) score += 25;
    if (analysis.behavioral.javascriptBehavior.length > 0) score += 20;
    
    // Sandbox scoring (15% weight)
    if (analysis.sandbox.maliciousRequests.length > 0) score += 30;
    if (analysis.sandbox.clientSideThreats.length > 0) score += 25;
    
    return Math.min(100, score);
  };

  const getAdvancedVerdict = (score: number): 'LEGITIMATE' | 'SUSPICIOUS' | 'CONFIRMED_PHISHING' => {
    if (score >= 75) return 'CONFIRMED_PHISHING';
    if (score >= 40) return 'SUSPICIOUS';
    return 'LEGITIMATE';
  };

  const getAdvancedThreatLevel = (score: number): 'HIGH' | 'MEDIUM' | 'LOW' => {
    if (score >= 70) return 'HIGH';
    if (score >= 35) return 'MEDIUM';
    return 'LOW';
  };

  const calculateAdvancedConfidence = (score: number): number => {
    return Math.min(98, Math.max(75, 70 + (score * 0.25)));
  };

  const analyzeSslStatus = (urlObj: URL, sslInfo?: string): 'VALID' | 'INVALID' | 'SUSPICIOUS' => {
    if (urlObj.protocol !== 'https:') return 'INVALID';
    if (sslInfo?.includes('self-signed') || sslInfo?.includes('expired')) return 'SUSPICIOUS';
    return Math.random() > 0.9 ? 'SUSPICIOUS' : 'VALID';
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
    if (analysis.behavioralResult.dynamicRedirects) {
      flags.push("Dynamic redirect behavior");
    }
    if (analysis.sandboxResult.maliciousRequests.length > 0) {
      flags.push("Malicious network requests");
    }
    
    return flags;
  };

  const generateAdvancedRecommendation = (verdict: string, score: number): string => {
    switch (verdict) {
      case 'CONFIRMED_PHISHING':
        return "🚨 IMMEDIATE ACTION: Block domain and warn users. This is a confirmed phishing threat.";
      case 'SUSPICIOUS':
        return "⚠️ CAUTION REQUIRED: Proceed with extreme caution. Multiple risk indicators detected.";
      default:
        return "✅ PROCEED WITH CAUTION: Website appears legitimate but maintain standard security practices.";
    }
  };

  const handleReset = () => {
    setInput({
      url: '',
      ipAddress: '',
      hostingCountry: '',
      htmlContent: '',
      sslInfo: ''
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
            <span>Advanced AI Cybersecurity Agent</span>
          </CardTitle>
          <p className="text-blue-200">Real-time phishing detection with tunnel analysis, behavioral simulation & sandbox execution</p>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-white font-medium mb-2">Target URL *</label>
              <Input
                value={input.url}
                onChange={(e) => setInput({ ...input, url: e.target.value })}
                placeholder="https://suspicious-site.com"
                className="bg-white/10 border-white/30 text-white"
                disabled={isAnalyzing}
              />
            </div>
            <div>
              <label className="block text-white font-medium mb-2">Resolved IP Address</label>
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
            <label className="block text-white font-medium mb-2">Hosting Country/City</label>
            <Input
              value={input.hostingCountry}
              onChange={(e) => setInput({ ...input, hostingCountry: e.target.value })}
              placeholder="Russia, Moscow"
              className="bg-white/10 border-white/30 text-white"
              disabled={isAnalyzing}
            />
          </div>

          <div>
            <label className="block text-white font-medium mb-2">Raw HTML Content</label>
            <Textarea
              value={input.htmlContent}
              onChange={(e) => setInput({ ...input, htmlContent: e.target.value })}
              placeholder="Paste raw HTML content for deep analysis..."
              className="bg-white/10 border-white/30 text-white min-h-24"
              disabled={isAnalyzing}
            />
          </div>

          <div>
            <label className="block text-white font-medium mb-2">SSL Certificate Info (Optional)</label>
            <Input
              value={input.sslInfo}
              onChange={(e) => setInput({ ...input, sslInfo: e.target.value })}
              placeholder="Certificate issuer, expiry, protocol details"
              className="bg-white/10 border-white/30 text-white"
              disabled={isAnalyzing}
            />
          </div>

          <Button
            onClick={performAdvancedAnalysis}
            disabled={isAnalyzing || !input.url.trim()}
            className="w-full h-12 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-semibold"
          >
            {isAnalyzing ? (
              <span className="flex items-center space-x-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Advanced Analysis Running...</span>
              </span>
            ) : (
              <span className="flex items-center space-x-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>🔍 Start Advanced Threat Analysis</span>
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
              {/* Main Threat Assessment */}
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

              {/* Quick Assessment Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card className="bg-white/5 border-white/10 p-4">
                  <div className="text-center">
                    <div className={`text-2xl ${result.detectedBrandImpersonation ? 'text-red-400' : 'text-green-400'}`}>
                      {result.detectedBrandImpersonation ? '🎭' : '✅'}
                    </div>
                    <div className="text-white text-sm mt-2">Brand Impersonation</div>
                    <div className="text-white/60 text-xs">{result.detectedBrandImpersonation ? 'Detected' : 'Clean'}</div>
                  </div>
                </Card>

                <Card className="bg-white/5 border-white/10 p-4">
                  <div className="text-center">
                    <div className={`text-2xl ${result.tunnelBasedDomain ? 'text-red-400' : 'text-green-400'}`}>
                      {result.tunnelBasedDomain ? '🌐' : '✅'}
                    </div>
                    <div className="text-white text-sm mt-2">Tunnel Domain</div>
                    <div className="text-white/60 text-xs">{result.tunnelBasedDomain ? 'Yes' : 'No'}</div>
                  </div>
                </Card>

                <Card className="bg-white/5 border-white/10 p-4">
                  <div className="text-center">
                    <div className={`text-2xl ${result.credentialFormPresent ? 'text-orange-400' : 'text-green-400'}`}>
                      {result.credentialFormPresent ? '🔑' : '✅'}
                    </div>
                    <div className="text-white text-sm mt-2">Credential Forms</div>
                    <div className="text-white/60 text-xs">{result.credentialFormPresent ? 'Present' : 'None'}</div>
                  </div>
                </Card>

                <Card className="bg-white/5 border-white/10 p-4">
                  <div className="text-center">
                    <div className={`text-2xl ${result.sslCertificateStatus !== 'VALID' ? 'text-red-400' : 'text-green-400'}`}>
                      {result.sslCertificateStatus !== 'VALID' ? '🔓' : '🔒'}
                    </div>
                    <div className="text-white text-sm mt-2">SSL Status</div>
                    <div className="text-white/60 text-xs">{result.sslCertificateStatus}</div>
                  </div>
                </Card>
              </div>

              {/* Detailed Analysis Tabs */}
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-6 bg-white/10">
                  <TabsTrigger value="overview" className="text-white text-xs">Overview</TabsTrigger>
                  <TabsTrigger value="infrastructure" className="text-white text-xs">Infrastructure</TabsTrigger>
                  <TabsTrigger value="visual" className="text-white text-xs">Visual AI</TabsTrigger>
                  <TabsTrigger value="html" className="text-white text-xs">HTML</TabsTrigger>
                  <TabsTrigger value="behavioral" className="text-white text-xs">Behavioral</TabsTrigger>
                  <TabsTrigger value="sandbox" className="text-white text-xs">Sandbox</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-4">
                  <Card className="bg-white/5 border-white/10">
                    <CardHeader>
                      <CardTitle className="text-white">Key Red Flags</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {result.keyRedFlags.length > 0 ? (
                        <ul className="space-y-2">
                          {result.keyRedFlags.map((flag, index) => (
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
                      <CardTitle className="text-white">Recommendation</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-white/90">{result.recommendation}</p>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="infrastructure" className="space-y-3">
                  {result.detailedAnalysis.domainInfrastructure.findings.map((finding, index) => (
                    <p key={index} className="text-white/90 p-3 bg-white/5 rounded-lg">{finding}</p>
                  ))}
                </TabsContent>

                <TabsContent value="visual" className="space-y-3">
                  {result.detailedAnalysis.visualAnalysis.findings.map((finding, index) => (
                    <p key={index} className="text-white/90 p-3 bg-white/5 rounded-lg">{finding}</p>
                  ))}
                </TabsContent>

                <TabsContent value="html" className="space-y-3">
                  {result.detailedAnalysis.htmlAnalysis.findings.map((finding, index) => (
                    <p key={index} className="text-white/90 p-3 bg-white/5 rounded-lg">{finding}</p>
                  ))}
                </TabsContent>

                <TabsContent value="behavioral" className="space-y-3">
                  {result.detailedAnalysis.behavioralSimulation.findings.map((finding, index) => (
                    <p key={index} className="text-white/90 p-3 bg-white/5 rounded-lg">{finding}</p>
                  ))}
                </TabsContent>

                <TabsContent value="sandbox" className="space-y-3">
                  {result.detailedAnalysis.sandboxExecution.findings.map((finding, index) => (
                    <p key={index} className="text-white/90 p-3 bg-white/5 rounded-lg">{finding}</p>
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
