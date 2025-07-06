
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const ThreatSharing = () => {
  const [reportUrl, setReportUrl] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reportUrl.trim()) return;

    setIsSubmitting(true);
    
    // Simulate submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast({
      title: "✅ Threat Reported Successfully",
      description: "Thank you for contributing to global cybersecurity!",
    });

    setReportUrl("");
    setDescription("");
    setIsSubmitting(false);
  };

  const recentReports = [
    { url: "fake-crypto-wallet.site", reporter: "SecurityExpert23", time: "2 mins ago", status: "Verified" },
    { url: "phishing-bank-login.tk", reporter: "CyberGuard", time: "5 mins ago", status: "Under Review" },
    { url: "malware-download.click", reporter: "ThreatHunter", time: "8 mins ago", status: "Verified" },
    { url: "scam-lottery-winner.online", reporter: "SafetyFirst", time: "12 mins ago", status: "Verified" }
  ];

  return (
    <div className="space-y-6">
      {/* Report Threat Form */}
      <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
        <h3 className="text-2xl font-semibold text-white mb-6 flex items-center space-x-2">
          <svg className="w-6 h-6 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
          <span>Report Suspicious URL</span>
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-white/80 text-sm font-medium mb-2">
              Suspicious URL *
            </label>
            <Input
              type="text"
              value={reportUrl}
              onChange={(e) => setReportUrl(e.target.value)}
              placeholder="Enter the suspicious URL you want to report"
              className="bg-white/10 border-white/30 text-white placeholder-white/50 focus:border-orange-400"
              required
            />
          </div>

          <div>
            <label className="block text-white/80 text-sm font-medium mb-2">
              Description (Optional)
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe what makes this URL suspicious (e.g., phishing attempt, malware, etc.)"
              className="w-full h-24 px-3 py-2 bg-white/10 border border-white/30 rounded-md text-white placeholder-white/50 focus:border-orange-400 focus:outline-none resize-none"
            />
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white"
          >
            {isSubmitting ? (
              <span className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Submitting Report...</span>
              </span>
            ) : (
              "Report Threat"
            )}
          </Button>
        </form>
      </div>

      {/* Community Stats */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 text-center">
          <div className="text-3xl font-bold text-green-400 mb-2">2,847</div>
          <div className="text-white/70">Threats Reported Today</div>
        </div>
        
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 text-center">
          <div className="text-3xl font-bold text-blue-400 mb-2">18,432</div>
          <div className="text-white/70">Active Community Members</div>
        </div>
        
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 text-center">
          <div className="text-3xl font-bold text-purple-400 mb-2">94.7%</div>
          <div className="text-white/70">Verification Accuracy</div>
        </div>
      </div>

      {/* Recent Community Reports */}
      <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
        <h3 className="text-xl font-semibold text-white mb-4 flex items-center space-x-2">
          <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <span>Recent Community Reports</span>
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
        </h3>

        <div className="space-y-3">
          {recentReports.map((report, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-black/20 rounded-lg">
              <div className="flex-1">
                <div className="text-white font-mono text-sm">{report.url}</div>
                <div className="text-white/60 text-xs">Reported by {report.reporter} • {report.time}</div>
              </div>
              <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                report.status === "Verified" 
                  ? "bg-green-500/20 text-green-400 border border-green-400/30"
                  : "bg-yellow-500/20 text-yellow-400 border border-yellow-400/30"
              }`}>
                {report.status}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Guidelines */}
      <div className="bg-blue-500/10 rounded-xl p-6 border border-blue-400/30">
        <h4 className="text-blue-400 font-semibold mb-3">Community Guidelines</h4>
        <ul className="text-white/80 text-sm space-y-2">
          <li>• Only report URLs you genuinely believe are malicious or suspicious</li>
          <li>• Provide detailed descriptions to help our verification team</li>
          <li>• Do not report legitimate websites due to personal disputes</li>
          <li>• All reports are reviewed by our AI systems and security experts</li>
          <li>• False reports may result in reduced community standing</li>
        </ul>
      </div>
    </div>
  );
};

export default ThreatSharing;
