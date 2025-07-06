import AdvancedPhishingDetector from "@/components/AdvancedPhishingDetector";
import CybersecurityAgent from "@/components/CybersecurityAgent";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="p-4 bg-blue-500/20 rounded-full backdrop-blur-sm border border-blue-400/30 relative">
              <svg className="w-16 h-16 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-pulse"></div>
            </div>
          </div>
          <h1 className="text-6xl font-bold text-white mb-4 bg-gradient-to-r from-blue-400 via-cyan-300 to-green-400 bg-clip-text text-transparent">
            ZeroPhish AI
          </h1>
          <div className="text-2xl text-blue-200 max-w-3xl mx-auto mb-4">
            Next-Generation AI-Powered Phishing Detection Platform
          </div>
          <p className="text-lg text-blue-300 max-w-4xl mx-auto">
            Advanced machine learning algorithms, real-time threat intelligence, and global community-driven security 
            to protect you from the most sophisticated phishing attacks and cyber threats.
          </p>
          
          <div className="flex items-center justify-center mt-6 space-x-8">
            <div className="flex items-center space-x-2 text-green-400">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm">AI Models Active</span>
            </div>
            <div className="flex items-center space-x-2 text-blue-400">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
              <span className="text-sm">Real-time Protection</span>
            </div>
            <div className="flex items-center space-x-2 text-purple-400">
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
              <span className="text-sm">Global Threat Intel</span>
            </div>
          </div>
        </div>
        
        <Tabs defaultValue="cybersecurity" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-white/10 border border-white/20 mb-8">
            <TabsTrigger value="cybersecurity" className="text-white data-[state=active]:bg-red-500/30">
              🛡️ Cybersecurity Agent
            </TabsTrigger>
            <TabsTrigger value="advanced" className="text-white data-[state=active]:bg-blue-500/30">
              🔍 Advanced Detector
            </TabsTrigger>
          </TabsList>

          <TabsContent value="cybersecurity">
            <CybersecurityAgent />
          </TabsContent>

          <TabsContent value="advanced">
            <AdvancedPhishingDetector />
          </TabsContent>
        </Tabs>
        
        <div className="mt-20 grid md:grid-cols-4 gap-6 max-w-6xl mx-auto">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
            <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Real-time ML Analysis</h3>
            <p className="text-blue-200 text-sm">Advanced neural networks analyze threats in milliseconds with 99.7% accuracy.</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
            <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Brand Protection AI</h3>
            <p className="text-blue-200 text-sm">Computer vision models detect logo impersonation and visual phishing attempts.</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
            <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Global Threat Intel</h3>
            <p className="text-blue-200 text-sm">Community-driven threat sharing with real-time global security intelligence.</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
            <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Zero-Trust Security</h3>
            <p className="text-blue-200 text-sm">All analysis happens client-side with encrypted threat intelligence updates.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
