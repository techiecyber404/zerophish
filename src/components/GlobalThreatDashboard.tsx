
import { useState, useEffect } from "react";

interface ThreatData {
  country: string;
  threats: number;
  riskLevel: "low" | "medium" | "high";
}

const GlobalThreatDashboard = () => {
  const [threatData, setThreatData] = useState<ThreatData[]>([]);
  const [globalStats, setGlobalStats] = useState({
    totalThreats: 0,
    blockedToday: 0,
    activeCampaigns: 0,
    protectedUsers: 0
  });

  useEffect(() => {
    // Simulate real-time threat data
    const mockData: ThreatData[] = [
      { country: "United States", threats: 1247, riskLevel: "high" },
      { country: "China", threats: 892, riskLevel: "high" },
      { country: "Russia", threats: 634, riskLevel: "medium" },
      { country: "Brazil", threats: 445, riskLevel: "medium" },
      { country: "India", threats: 321, riskLevel: "medium" },
      { country: "Germany", threats: 198, riskLevel: "low" },
      { country: "United Kingdom", threats: 156, riskLevel: "low" },
      { country: "France", threats: 134, riskLevel: "low" }
    ];

    setThreatData(mockData);
    setGlobalStats({
      totalThreats: 4027,
      blockedToday: 1582,
      activeCampaigns: 23,
      protectedUsers: 89324
    });

    // Simulate real-time updates
    const interval = setInterval(() => {
      setGlobalStats(prev => ({
        ...prev,
        totalThreats: prev.totalThreats + Math.floor(Math.random() * 5),
        blockedToday: prev.blockedToday + Math.floor(Math.random() * 3),
        protectedUsers: prev.protectedUsers + Math.floor(Math.random() * 10)
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getRiskColor = (level: string) => {
    switch (level) {
      case "high": return "text-red-400 bg-red-500/20 border-red-400";
      case "medium": return "text-orange-400 bg-orange-500/20 border-orange-400";
      case "low": return "text-green-400 bg-green-500/20 border-green-400";
      default: return "text-blue-400 bg-blue-500/20 border-blue-400";
    }
  };

  return (
    <div className="space-y-6">
      {/* Global Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
          <div className="text-2xl font-bold text-blue-400">{globalStats.totalThreats.toLocaleString()}</div>
          <div className="text-white/70 text-sm">Total Threats Detected</div>
          <div className="text-green-400 text-xs mt-1">↗ Live</div>
        </div>
        
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
          <div className="text-2xl font-bold text-green-400">{globalStats.blockedToday.toLocaleString()}</div>
          <div className="text-white/70 text-sm">Blocked Today</div>
          <div className="text-green-400 text-xs mt-1">↗ +{Math.floor(Math.random() * 20) + 5}%</div>
        </div>
        
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
          <div className="text-2xl font-bold text-orange-400">{globalStats.activeCampaigns}</div>
          <div className="text-white/70 text-sm">Active Campaigns</div>
          <div className="text-red-400 text-xs mt-1">⚠ High Alert</div>
        </div>
        
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
          <div className="text-2xl font-bold text-cyan-400">{globalStats.protectedUsers.toLocaleString()}</div>
          <div className="text-white/70 text-sm">Protected Users</div>
          <div className="text-green-400 text-xs mt-1">↗ Growing</div>
        </div>
      </div>

      {/* Threat Map Simulation */}
      <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
        <h3 className="text-xl font-semibold text-white mb-6 flex items-center space-x-2">
          <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          <span>Global Threat Intelligence</span>
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
        </h3>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <h4 className="text-white font-semibold">Top Threat Origins</h4>
            {threatData.map((data, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-black/20 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${getRiskColor(data.riskLevel).split(' ')[2]}`}></div>
                  <span className="text-white">{data.country}</span>
                </div>
                <div className="text-right">
                  <div className="text-white font-semibold">{data.threats}</div>
                  <div className={`text-xs px-2 py-1 rounded ${getRiskColor(data.riskLevel)}`}>
                    {data.riskLevel.toUpperCase()}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <h4 className="text-white font-semibold">Live Threat Feed</h4>
            <div className="bg-black/30 rounded-lg p-4 h-64 overflow-y-auto">
              <div className="space-y-2 text-sm">
                <div className="text-red-400">🚨 New phishing campaign detected targeting banking sector</div>
                <div className="text-orange-400">⚠️ Suspicious domain registered: secure-paypal-verify.tk</div>
                <div className="text-yellow-400">🔍 Brand impersonation attempt: amazom.net</div>
                <div className="text-red-400">🚨 Malware distribution site blocked: download-office.click</div>
                <div className="text-green-400">✅ Threat neutralized: fake-netflix-login.site</div>
                <div className="text-orange-400">⚠️ New SSL certificate fraud detected</div>
                <div className="text-red-400">🚨 Mass credential harvesting campaign active</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Detections */}
      <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
        <h3 className="text-xl font-semibold text-white mb-4">Recent High-Risk Detections</h3>
        <div className="space-y-3">
          {[
            { url: "secure-account-verify.tk", risk: 95, brand: "PayPal" },
            { url: "microsoft-security-alert.click", risk: 88, brand: "Microsoft" },
            { url: "amazon-prize-winner.site", risk: 82, brand: "Amazon" },
            { url: "google-account-suspended.online", risk: 79, brand: "Google" }
          ].map((detection, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-black/20 rounded-lg">
              <div className="flex-1">
                <div className="text-white font-mono text-sm">{detection.url}</div>
                <div className="text-blue-300 text-xs">Impersonating: {detection.brand}</div>
              </div>
              <div className="text-right">
                <div className="text-red-400 font-bold">{detection.risk}%</div>
                <div className="text-white/60 text-xs">Risk Score</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GlobalThreatDashboard;
