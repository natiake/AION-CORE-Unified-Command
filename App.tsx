import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Map, 
  MessageSquare, 
  Radio, 
  ShieldAlert, 
  Users, 
  Menu, 
  Bell, 
  Search,
  Globe,
  Anchor,
  Plane,
  Truck,
  Wifi,
  ChevronRight
} from 'lucide-react';
import { CURRENT_USER, MOCK_ALERTS, MOCK_ASSETS, REGIONAL_DATA } from './constants';
import { AlertLevel, RegionData } from './types';
import { RiskMap } from './components/RiskMap';
import { LogisticsOverviewChart, ResourceCapacityChart } from './components/Charts';
import { ChatModule } from './components/ChatModule';
import { AIBriefing } from './components/AIBriefing';

const NavItem = ({ icon: Icon, label, active, onClick }: any) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
      active 
        ? 'bg-blue-600/20 text-blue-400 border-r-2 border-blue-500' 
        : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
    }`}
  >
    <Icon size={20} />
    <span className="font-medium text-sm">{label}</span>
  </button>
);

const StatusCard = ({ title, value, change, trend, color }: any) => (
  <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl hover:border-slate-700 transition-colors">
    <h3 className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-2">{title}</h3>
    <div className="flex items-end justify-between">
      <span className="text-2xl font-mono text-white font-bold">{value}</span>
      <span className={`text-xs font-bold px-2 py-1 rounded ${
        trend === 'up' ? 'bg-emerald-500/10 text-emerald-400' : 
        trend === 'down' ? 'bg-blue-500/10 text-blue-400' :
        'bg-slate-700/50 text-slate-400'
      }`}>
        {change}
      </span>
    </div>
    <div className={`h-1 w-full mt-4 rounded-full bg-slate-800`}>
      <div className={`h-full rounded-full ${color} transition-all duration-1000`} style={{ width: '70%' }}></div>
    </div>
  </div>
);

const FeedCard = ({ label, src, status }: any) => (
  <div className="relative group overflow-hidden rounded-lg border border-slate-800 bg-black aspect-video">
    <img src={src} alt={label} className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
    <div className="absolute top-2 left-2 bg-black/60 backdrop-blur px-2 py-1 rounded flex items-center space-x-2">
      <div className={`w-2 h-2 rounded-full ${status === 'LIVE' ? 'bg-red-500 animate-pulse' : 'bg-yellow-500'}`}></div>
      <span className="text-[10px] font-mono font-bold text-white">{status}</span>
    </div>
    <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/90 to-transparent">
      <span className="text-xs font-mono text-slate-300">{label}</span>
    </div>
    {/* Grid Overlay Effect */}
    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none"></div>
  </div>
);

const App = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [showBriefing, setShowBriefing] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  
  // Simulated Live Data
  const [networkLoad, setNetworkLoad] = useState(99.9);
  const [activeIncidents, setActiveIncidents] = useState(12);
  const [regionalData, setRegionalData] = useState<RegionData[]>(REGIONAL_DATA);

  // Timer for clock
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Simulation Effects
  useEffect(() => {
    const simTimer = setInterval(() => {
      // Randomize network load slightly
      setNetworkLoad(prev => Math.min(100, Math.max(98, prev + (Math.random() - 0.5) * 0.2)));
      
      // Randomly fluctuate incidents
      if (Math.random() > 0.8) {
        setActiveIncidents(prev => Math.max(5, prev + (Math.random() > 0.5 ? 1 : -1)));
      }

      // Randomly update regional risk scores
      setRegionalData(prev => prev.map(r => {
        if (Math.random() > 0.9) {
          return { ...r, riskScore: Math.min(100, Math.max(0, r.riskScore + Math.floor((Math.random() - 0.5) * 10))) };
        }
        return r;
      }));

    }, 3000);
    return () => clearInterval(simTimer);
  }, []);

  const getAlertColor = (level: AlertLevel) => {
    switch (level) {
      case AlertLevel.CRITICAL: return 'text-red-500 border-red-500/50 bg-red-500/10';
      case AlertLevel.HIGH: return 'text-orange-500 border-orange-500/50 bg-orange-500/10';
      case AlertLevel.MEDIUM: return 'text-yellow-500 border-yellow-500/50 bg-yellow-500/10';
      default: return 'text-blue-500 border-blue-500/50 bg-blue-500/10';
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex overflow-hidden selection:bg-brand-blue/30">
      {/* Sidebar */}
      <aside className={`${isSidebarOpen ? 'w-64' : 'w-20'} bg-slate-900 border-r border-slate-800 flex flex-col transition-all duration-300 z-20 shadow-xl`}>
        <div className="h-16 flex items-center px-6 border-b border-slate-800 bg-slate-900/50">
          <ShieldAlert className="text-brand-blue mr-3 shrink-0" size={28} />
          {isSidebarOpen && (
            <div className="animate-in fade-in duration-300">
              <h1 className="font-bold text-lg tracking-tight text-white">AION-CORE</h1>
              <p className="text-[10px] text-slate-500 uppercase tracking-widest">Unified Command</p>
            </div>
          )}
        </div>

        <div className="flex-1 py-6 px-3 space-y-2 overflow-y-auto custom-scrollbar">
          <NavItem icon={LayoutDashboard} label="Overview" active={activeTab === 'overview'} onClick={() => setActiveTab('overview')} />
          <NavItem icon={Map} label="Situational Map" active={activeTab === 'map'} onClick={() => setActiveTab('map')} />
          <NavItem icon={Truck} label="Logistics" active={activeTab === 'logistics'} onClick={() => setActiveTab('logistics')} />
          <NavItem icon={MessageSquare} label="Secure Comms" active={activeTab === 'comms'} onClick={() => setActiveTab('comms')} />
          <div className="my-4 border-t border-slate-800"></div>
          <p className={`px-4 text-[10px] font-bold text-slate-600 uppercase mb-2 transition-opacity duration-300 ${!isSidebarOpen && 'opacity-0'}`}>Departments</p>
          <NavItem icon={Globe} label="Disaster Response" active={activeTab === 'disaster'} onClick={() => setActiveTab('disaster')} />
          <NavItem icon={Anchor} label="Navy / Port Ops" active={activeTab === 'navy'} onClick={() => setActiveTab('navy')} />
          <NavItem icon={Plane} label="Air Force" active={activeTab === 'air'} onClick={() => setActiveTab('air')} />
          <NavItem icon={Wifi} label="Cybersecurity" active={activeTab === 'cyber'} onClick={() => setActiveTab('cyber')} />
        </div>

        <div className="p-4 border-t border-slate-800 bg-slate-900">
          <div className="flex items-center space-x-3">
            <img src={CURRENT_USER.avatarUrl} alt="User" className="w-10 h-10 rounded-full border border-slate-600" />
            {isSidebarOpen && (
              <div className="overflow-hidden animate-in fade-in slide-in-from-left-2">
                <p className="text-sm font-medium truncate text-slate-200">{CURRENT_USER.name}</p>
                <p className="text-xs text-slate-500 truncate">{CURRENT_USER.rank}</p>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden relative bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black">
        
        {/* Header */}
        <header className="h-16 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 flex items-center justify-between px-6 z-10">
          <div className="flex items-center space-x-4">
            <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="text-slate-400 hover:text-white transition-colors focus:outline-none">
              <Menu size={20} />
            </button>
            <div className="hidden md:flex items-center bg-slate-800/50 border border-slate-700 rounded-md px-3 py-1.5 focus-within:border-brand-blue/50 transition-colors">
              <Search size={14} className="text-slate-500 mr-2" />
              <input type="text" placeholder="Search intelligence..." className="bg-transparent border-none outline-none text-sm text-white w-48 placeholder-slate-600" />
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-mono text-slate-400">SYSTEM TIME (EAT)</p>
              <p className="text-sm font-mono font-bold text-brand-blue">{currentTime.toLocaleTimeString()}</p>
            </div>
            
            <button 
              onClick={() => setShowBriefing(true)}
              className="group flex items-center space-x-2 px-3 py-1.5 bg-brand-blue/10 border border-brand-blue/40 text-brand-blue rounded hover:bg-brand-blue/20 transition-all duration-200"
            >
              <Users size={16} className="group-hover:scale-110 transition-transform" />
              <span className="text-xs font-bold">AI BRIEFING</span>
            </button>

            <div className="relative">
              <Bell size={20} className="text-slate-400 hover:text-white cursor-pointer transition-colors" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-ping"></span>
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </div>
          </div>
        </header>

        {/* Content Scroll Area */}
        <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
          <div className="max-w-7xl mx-auto space-y-6">
            
            {/* Dashboard Overview */}
            {activeTab === 'overview' && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <StatusCard title="National Threat Level" value="LOW" change="STABLE" trend="down" color="bg-emerald-500" />
                  <StatusCard title="Active Incidents" value={activeIncidents.toString()} change="Active" trend="up" color="bg-orange-500" />
                  <StatusCard title="Logistics Efficiency" value="94%" change="+1.2%" trend="up" color="bg-blue-500" />
                  <StatusCard title="Network Integrity" value={networkLoad.toFixed(1) + "%"} change="Stable" trend="flat" color="bg-purple-500" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-auto lg:h-[500px]">
                  {/* Map Section */}
                  <div className="lg:col-span-2 bg-slate-900/50 border border-slate-800 rounded-xl p-4 flex flex-col backdrop-blur-sm">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-sm font-bold text-slate-300 flex items-center">
                        <Map size={16} className="mr-2 text-brand-accent" />
                        REGIONAL RISK ASSESSMENT
                      </h3>
                      <div className="flex space-x-2 text-[10px] font-mono">
                        <span className="flex items-center"><span className="w-2 h-2 rounded-full bg-emerald-600 mr-1"></span>SAFE</span>
                        <span className="flex items-center"><span className="w-2 h-2 rounded-full bg-amber-600 mr-1"></span>MODERATE</span>
                        <span className="flex items-center"><span className="w-2 h-2 rounded-full bg-red-600 mr-1"></span>RISK</span>
                      </div>
                    </div>
                    <div className="flex-1 relative bg-slate-950/80 rounded-lg border border-slate-800/50 overflow-hidden">
                      <RiskMap data={regionalData} />
                    </div>
                  </div>

                  {/* Alerts Feed */}
                  <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4 flex flex-col backdrop-blur-sm h-[500px] lg:h-auto">
                     <h3 className="text-sm font-bold text-slate-300 mb-4 flex items-center">
                        <Radio size={16} className="mr-2 text-red-400 animate-pulse" />
                        LIVE ALERTS
                      </h3>
                      <div className="flex-1 overflow-y-auto space-y-3 pr-2 custom-scrollbar">
                        {MOCK_ALERTS.map((alert) => (
                          <div key={alert.id} className={`p-3 rounded border group hover:scale-[1.02] transition-transform duration-200 cursor-pointer ${getAlertColor(alert.level)}`}>
                            <div className="flex justify-between items-start mb-1">
                              <span className="font-bold text-xs uppercase">{alert.department}</span>
                              <span className="text-[10px] opacity-75">{alert.timestamp}</span>
                            </div>
                            <h4 className="font-bold text-sm mb-1 group-hover:underline decoration-dotted">{alert.title}</h4>
                            <p className="text-xs opacity-90 leading-tight">{alert.description}</p>
                            <div className="mt-2 flex items-center space-x-1 text-[10px] opacity-75">
                              <Map size={10} />
                              <span>{alert.location}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                  </div>
                </div>

                {/* Live Feeds Row */}
                <div>
                  <h3 className="text-sm font-bold text-slate-300 mb-4 flex items-center">
                    <Radio size={16} className="mr-2 text-brand-safe" />
                    LIVE INFRASTRUCTURE FEEDS
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    <FeedCard label="CAM-01: BOLE INT'L" src="https://picsum.photos/id/101/400/225" status="LIVE" />
                    <FeedCard label="CAM-04: MODJO DRY PORT" src="https://picsum.photos/id/184/400/225" status="LIVE" />
                    <FeedCard label="DRONE-9: NORTH SECTOR" src="https://picsum.photos/id/234/400/225" status="RECORDING" />
                    <FeedCard label="TRAFFIC: RING ROAD" src="https://picsum.photos/id/238/400/225" status="LIVE" />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'logistics' && (
               <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
                      <h3 className="text-sm font-bold text-slate-300 mb-4">FLEET STATUS</h3>
                      <LogisticsOverviewChart assets={MOCK_ASSETS} />
                    </div>
                    <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
                      <h3 className="text-sm font-bold text-slate-300 mb-4">DEPOT CAPACITY</h3>
                      <ResourceCapacityChart assets={MOCK_ASSETS} />
                    </div>
                 </div>
                 <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
                    <table className="w-full text-sm text-left text-slate-400">
                      <thead className="text-xs text-slate-200 uppercase bg-slate-800">
                        <tr>
                          <th className="px-6 py-3">ID</th>
                          <th className="px-6 py-3">Asset Name</th>
                          <th className="px-6 py-3">Type</th>
                          <th className="px-6 py-3">Status</th>
                          <th className="px-6 py-3">Location</th>
                          <th className="px-6 py-3">Capacity</th>
                        </tr>
                      </thead>
                      <tbody>
                        {MOCK_ASSETS.map((asset, idx) => (
                          <tr key={asset.id} className={`border-b border-slate-800 hover:bg-slate-800/50 transition-colors ${idx % 2 === 0 ? 'bg-slate-900' : 'bg-slate-850'}`}>
                            <td className="px-6 py-4 font-mono">{asset.id}</td>
                            <td className="px-6 py-4 font-medium text-white">{asset.name}</td>
                            <td className="px-6 py-4">{asset.type}</td>
                            <td className="px-6 py-4">
                              <span className={`px-2 py-1 rounded text-xs font-bold ${
                                asset.status === 'ACTIVE' ? 'bg-emerald-500/10 text-emerald-500' :
                                asset.status === 'MAINTENANCE' ? 'bg-red-500/10 text-red-500' :
                                asset.status === 'TRANSIT' ? 'bg-yellow-500/10 text-yellow-500' : 'bg-slate-700 text-slate-400'
                              }`}>
                                {asset.status}
                              </span>
                            </td>
                            <td className="px-6 py-4">{asset.location}</td>
                            <td className="px-6 py-4">
                              <div className="w-24 bg-slate-700 rounded-full h-1.5 overflow-hidden">
                                <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: `${asset.capacity}%` }}></div>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                 </div>
               </div>
            )}

            {activeTab === 'comms' && (
              <div className="h-[calc(100vh-140px)] animate-in fade-in slide-in-from-bottom-4 duration-500">
                <ChatModule user={CURRENT_USER} />
              </div>
            )}
            
            {/* Restricted Access State */}
            {(activeTab !== 'overview' && activeTab !== 'logistics' && activeTab !== 'comms' && activeTab !== 'map') && (
              <div className="animate-in zoom-in-95 duration-300 flex items-center justify-center h-96 bg-slate-900/50 border border-slate-800 rounded-xl border-dashed">
                <div className="text-center p-8">
                  <div className="inline-flex p-4 rounded-full bg-slate-800 mb-4">
                    <ShieldAlert className="h-10 w-10 text-slate-500" />
                  </div>
                  <h3 className="text-lg font-medium text-slate-300">Access Restricted</h3>
                  <p className="text-slate-500 mt-2 max-w-sm mx-auto">
                    This departmental module requires elevated operational clearance level 4 or higher.
                  </p>
                  <button onClick={() => setActiveTab('overview')} className="mt-6 px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded text-sm font-medium text-white transition-colors flex items-center mx-auto">
                    <ChevronRight size={16} className="rotate-180 mr-2" />
                    Return to Overview
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'map' && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 h-[calc(100vh-140px)] bg-slate-900 border border-slate-800 rounded-xl p-4 relative overflow-hidden">
                     <div className="absolute top-4 left-4 z-10 bg-slate-900/80 backdrop-blur border border-slate-700 p-3 rounded-lg shadow-lg">
                        <h3 className="text-sm font-bold text-white mb-1">Tactical Map View</h3>
                        <p className="text-xs text-slate-400">Real-time regional risk aggregation</p>
                     </div>
                     <RiskMap data={regionalData} />
                </div>
            )}

          </div>
        </div>
      </main>

      {/* AI Modal */}
      <AIBriefing 
        isOpen={showBriefing} 
        onClose={() => setShowBriefing(false)} 
        data={{ alerts: MOCK_ALERTS, assets: MOCK_ASSETS, regions: regionalData }}
      />

    </div>
  );
};

export default App;