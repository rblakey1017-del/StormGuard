import { useState } from 'react';
import { AlertTriangle, Camera, CloudRain, MapPin, FileText } from 'lucide-react';

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
      {/* Slim Header */}
      <header className="bg-zinc-900 border-b border-sky-500 sticky top-0 p-3 shadow-lg">
        <div className="max-w-6xl mx-auto flex items-center gap-3">
          <img 
            src="https://i.imgur.com/WHWgnpB.jpeg" 
            alt="StormGuard Logo" 
            className="h-10 w-auto" 
          />
          <div>
            <h1 className="text-2xl font-bold tracking-tighter">StormGuard</h1>
            <p className="text-[10px] text-sky-400 -mt-1">AI Storm Protection • Dallas</p>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 pt-6">
        {/* Tabs */}
        <div className="flex gap-2 pb-6 overflow-x-auto border-b border-zinc-800">
          {['scan', 'alerts', 'repairs', 'claims'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`px-6 py-3 rounded-3xl font-medium whitespace-nowrap transition-all ${
                activeTab === tab 
                  ? 'bg-sky-400 text-zinc-950 shadow-md' 
                  : 'bg-zinc-800 hover:bg-zinc-700'
              }`}
            >
              {tab === 'scan' ? '📸 Scan' : 
               tab === 'alerts' ? '🚨 Alerts' : 
               tab === 'repairs' ? '🔧 Repairs' : '📄 Claims'}
            </button>
          ))}
        </div>

        {/* Scan Tab */}
        {activeTab === 'scan' && (
          <div className="bg-zinc-900 rounded-3xl p-8 text-center">
            <Camera className="w-20 h-20 mx-auto mb-6 text-sky-400" />
            <h2 className="text-3xl font-bold mb-2">Scan Storm Damage</h2>
            <p className="text-zinc-400 mb-8">Upload a clear photo of your car, roof, or flooding</p>

            <div className="grid grid-cols-1 gap-4">
              {['Car', 'Roof', 'Flooding'].map((type) => (
                <label key={type} className="border-2 border-dashed border-zinc-700 hover:border-sky-400 rounded-3xl p-10 cursor-pointer transition-all active:scale-95">
                  <span className="text-lg font-semibold">{type} Damage</span>
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
              <div className="mt-10">
                <img src={photo} alt="Damage" className="mx-auto rounded-3xl max-h-96 shadow-2xl" />
                {scanResult && (
                  <div className="mt-8 bg-emerald-900/30 border border-emerald-500 rounded-3xl p-8">
                    <p className="text-5xl font-bold text-emerald-400">${scanResult.cost}</p>
                    <p className="text-2xl mt-2">{scanResult.severity} Damage</p>
                    <p className="mt-6 text-lg">{scanResult.message}</p>
                    <button className="mt-6 w-full bg-white text-zinc-900 py-4 rounded-3xl font-semibold">
                      Get Full Report + Repair Quotes →
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Alerts Tab */}
        {activeTab === 'alerts' && (
          <div className="bg-sky-950 border border-sky-400 rounded-3xl p-10">
            <CloudRain className="w-16 h-16 mx-auto mb-6 text-sky-400" />
            <p className="text-3xl font-semibold">Severe Thunderstorm Warning</p>
            <p className="text-xl mt-6">DFW Area • Hail & Damaging Winds Possible</p>
            <p className="mt-8 text-sky-300">Take shelter • Move vehicles indoors</p>
          </div>
        )}

        {/* Repairs & Claims */}
        {(activeTab === 'repairs' || activeTab === 'claims') && (
          <div className="bg-zinc-900 rounded-3xl p-12 text-center py-24">
            <div className="mx-auto w-20 h-20 bg-zinc-800 rounded-full flex items-center justify-center mb-6">
              {activeTab === 'repairs' ? <MapPin className="w-10 h-10 text-sky-400" /> : <FileText className="w-10 h-10 text-sky-400" />}
            </div>
            <h3 className="text-2xl font-semibold mb-3">Coming Soon</h3>
            <p className="text-zinc-400">
              {activeTab === 'repairs' ? "Local storm repair professionals near you" : "Generate insurance reports with photos & AI estimates"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}