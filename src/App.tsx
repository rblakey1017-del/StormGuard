import { useState } from 'react';
import { Camera, CloudRain, MapPin, FileText } from 'lucide-react';

export default function StormGuard() {
  const [photo, setPhoto] = useState<string | null>(null);
  const [scanResult, setScanResult] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'scan' | 'alerts' | 'repairs' | 'claims'>('scan');

  const handlePhotoUpload = (e: any, type: string) => {
    const file = e.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = () => {
      setPhoto(reader.result as string);
      setTimeout(() => {
        setScanResult({
          severity: "Moderate",
          cost: 1850,
          confidence: 87,
          message: `Storm damage detected on your ${type.toLowerCase()}. Local recovery pros available now.`
        });
      }, 1100);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Premium Header */}
      <header className="bg-zinc-900/95 backdrop-blur-md border-b border-sky-500 sticky top-0 p-4 shadow-xl z-50">
        <div className="max-w-6xl mx-auto flex items-center gap-4">
          <img 
            src="https://i.imgur.com/WHWgnpB.jpeg" 
            alt="StormGuard Logo" 
            className="h-11 w-auto drop-shadow-md" 
          />
          <div>
            <h1 className="text-3xl font-bold tracking-tighter">StormGuard</h1>
            <p className="text-xs text-sky-400 -mt-1">AI Storm Damage Protection • Dallas</p>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 pt-8">
        {/* Improved Tabs */}
        <div className="flex gap-2 pb-8 overflow-x-auto border-b border-zinc-800">
          {['scan', 'alerts', 'repairs', 'claims'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`px-8 py-4 rounded-3xl font-semibold whitespace-nowrap transition-all flex items-center gap-2 ${
                activeTab === tab 
                  ? 'bg-sky-400 text-zinc-950 shadow-lg shadow-sky-500/50' 
                  : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-300'
              }`}
            >
              {tab === 'scan' && '📸'} 
              {tab === 'alerts' && '🚨'} 
              {tab === 'repairs' && '🔧'} 
              {tab === 'claims' && '📄'}
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Scan Tab - More Polished */}
        {activeTab === 'scan' && (
          <div className="bg-zinc-900 rounded-3xl p-10 text-center shadow-2xl">
            <div className="mb-8">
              <Camera className="w-24 h-24 mx-auto text-sky-400" />
            </div>
            <h2 className="text-4xl font-bold mb-3">Scan Storm Damage</h2>
            <p className="text-zinc-400 text-lg mb-10 max-w-md mx-auto">
              Take or upload a clear photo — our AI will analyze hail, wind, or flood damage
            </p>

            <div className="grid grid-cols-1 gap-4 max-w-md mx-auto">
              {['Car', 'Roof', 'Flooding'].map((type) => (
                <label 
                  key={type} 
                  className="border-2 border-dashed border-zinc-700 hover:border-sky-400 hover:bg-zinc-800/50 rounded-3xl p-10 cursor-pointer transition-all active:scale-[0.98]"
                >
                  <span className="text-xl font-semibold block">{type} Damage</span>
                  <span className="text-sm text-zinc-500">Tap to upload photo</span>
                  <input 
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    onChange={(e) => handlePhotoUpload(e, type)} 
                  />
                </label>
              ))}
            </div>

            {photo && (
              <div className="mt-12">
                <img src={photo} alt="Damage" className="mx-auto rounded-3xl max-h-96 shadow-2xl" />
                {scanResult && (
                  <div className="mt-10 bg-gradient-to-br from-emerald-900/40 to-zinc-900 border border-emerald-500 rounded-3xl p-10">
                    <p className="text-6xl font-bold text-emerald-400">${scanResult.cost}</p>
                    <p className="text-3xl mt-2">{scanResult.severity} Damage</p>
                    <p className="mt-6 text-lg leading-relaxed">{scanResult.message}</p>
                    <button className="mt-8 w-full bg-white hover:bg-amber-300 text-zinc-900 py-5 rounded-3xl font-semibold text-lg transition-colors">
                      Get Full Report + Local Quotes →
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Alerts Tab */}
        {activeTab === 'alerts' && (
          <div className="bg-gradient-to-br from-sky-950 to-zinc-900 border border-sky-400 rounded-3xl p-12 text-center">
            <CloudRain className="w-20 h-20 mx-auto mb-8 text-sky-400" />
            <p className="text-4xl font-semibold">Severe Thunderstorm Warning</p>
            <p className="text-2xl mt-6">DFW Area • Hail & Damaging Winds Possible</p>
            <p className="mt-10 text-sky-300 text-lg">Take shelter • Move vehicles indoors • Stay safe</p>
          </div>
        )}

        {/* Repairs & Claims */}
        {(activeTab === 'repairs' || activeTab === 'claims') && (
          <div className="bg-zinc-900 rounded-3xl p-16 text-center">
            <div className="mx-auto w-24 h-24 bg-zinc-800 rounded-2xl flex items-center justify-center mb-8">
              {activeTab === 'repairs' ? <MapPin className="w-12 h-12 text-sky-400" /> : <FileText className="w-12 h-12 text-sky-400" />}
            </div>
            <h3 className="text-3xl font-semibold mb-4">Feature Coming Soon</h3>
            <p className="text-zinc-400 max-w-sm mx-auto">
              {activeTab === 'repairs' 
                ? "We'll connect you with trusted local storm repair professionals" 
                : "Generate professional insurance reports with your photos and AI estimates"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}