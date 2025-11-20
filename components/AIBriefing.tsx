import React, { useState } from 'react';
import { X, Sparkles, FileText, RefreshCw } from 'lucide-react';
import { generateSituationReport } from '../services/geminiService';
import { Alert, LogisticAsset, RegionData } from '../types';
import ReactMarkdown from 'react-markdown';

interface AIBriefingProps {
  isOpen: boolean;
  onClose: () => void;
  data: {
    alerts: Alert[];
    assets: LogisticAsset[];
    regions: RegionData[];
  };
}

export const AIBriefing: React.FC<AIBriefingProps> = ({ isOpen, onClose, data }) => {
  const [report, setReport] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    const result = await generateSituationReport(data.alerts, data.assets, data.regions);
    setReport(result);
    setLoading(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="w-full max-w-2xl bg-slate-900 border border-brand-accent/30 rounded-lg shadow-2xl flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-slate-900 rounded-t-lg">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-brand-accent/10 rounded-md border border-brand-accent/20">
              <Sparkles size={20} className="text-brand-accent" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white font-mono">AION-CORE INTELLIGENCE</h2>
              <p className="text-xs text-slate-400">Automated Situation Analysis & Briefing</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
          {!report && !loading && (
            <div className="flex flex-col items-center justify-center h-64 text-center space-y-4">
              <FileText size={48} className="text-slate-700" />
              <div className="space-y-2">
                <p className="text-slate-300 font-medium">Ready to generate briefing.</p>
                <p className="text-sm text-slate-500 max-w-sm">
                  AION-CORE will analyze current alerts, logistics data, and regional risk scores to provide a strategic summary.
                </p>
              </div>
              <button 
                onClick={handleGenerate}
                className="px-6 py-2 bg-brand-blue hover:bg-blue-600 text-white rounded font-medium transition-colors flex items-center space-x-2"
              >
                <Sparkles size={16} />
                <span>Generate Report</span>
              </button>
            </div>
          )}

          {loading && (
            <div className="flex flex-col items-center justify-center h-64 space-y-4">
              <RefreshCw size={32} className="text-brand-accent animate-spin" />
              <p className="text-brand-accent font-mono text-sm animate-pulse">ANALYZING DATA STREAMS...</p>
            </div>
          )}

          {report && !loading && (
            <div className="prose prose-invert prose-sm max-w-none">
              <ReactMarkdown>{report}</ReactMarkdown>
            </div>
          )}
        </div>

        {/* Footer */}
        {report && (
          <div className="p-4 border-t border-slate-800 bg-slate-850 flex justify-end rounded-b-lg">
            <button 
              onClick={handleGenerate}
              className="text-sm text-slate-400 hover:text-white flex items-center space-x-2"
            >
              <RefreshCw size={14} />
              <span>Regenerate</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
