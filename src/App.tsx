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
      {/* Header */}
      <header className="bg-zinc-900 border-b border-sky-500 sticky top-0 p-4">
        <div className="max-w-6xl mx-auto flex items-center gap-3">
          <img 
            src="https://i.imgur.com/WHWgnpB.jpeg" 
            alt="StormGuard Logo" 
            className="h-10 w-auto" 
          />
          <div>
            <h1 className="text-2xl font-bold tracking-tighter">StormGuard</h1>
            <p className="text-xs text-sky-400">AI Storm Protection • Dallas</p>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 pt-6">
        {/* Tabs */}
        <div className="flex gap-2 pb-8 overflow-x-auto border-b border-zinc-800">
          {['scan', 'alerts', 'repairs', 'claims'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`px-6 py-3.5 rounded-3xl font-medium whitespace-nowrap transition-all flex-shrink-0 ${
                activeTab === tab 
                  ? 'bg-sky-400 text-zinc-950 shadow-md' 
                  : 'bg-zinc-800 hover:bg-zinc-700'
              }`}
            >
              {tab === 'scan' ? '📸 Scan Damage' : 
               tab === 'alerts' ? '🚨 Live Alerts' : 
               tab === 'repairs' ? '🔧 Find Repairs' : '📄 Claims'}
            </button>
          ))}
        </div>

        {/* Main Content */}
        {activeTab === 'scan' && (
          <div className="bg-zinc-900 rounded-3xl p-10 text-center">
            <Camera className="w-24 h-24 mx-auto mb-6 text-sky-400" />
            <h2 className="text-4xl font-bold mb-3">Scan Your Damage</h2>
            <p className="text-zinc-400 mb-10">Upload a photo — get instant AI assessment</p>

            <div className="space-y-4">
              {['Car', 'Roof', 'Flooding'].map((type) => (
                <label key={type} className="block border-2 border-dashed border-zinc-700 hover:border-sky-400 rounded-3xl p-10 cursor-pointer transition-all">
                  <span className="text-xl font-semibold">{type} Damage</span>
                  <input type="file" accept="image/*" className="hidden" onChange={(e) => handlePhotoUpload(e, type)} />
                </label>
              ))}
            </div>

            {photo && (
              <div className="mt-12">
                <img src={photo} alt="Uploaded" className="mx-auto rounded-3xl max-h-96 shadow-2xl" />
                {scanResult && (
                  <div className="mt-10 bg-emerald-900/30 border border-emerald-500 rounded-3xl p-10">
                    <p className="text-6xl font-bold text-emerald-400">${scanResult.cost}</p>
                    <p className="text-3xl mt-3">{scanResult.severity} Damage</p>
                    <p className="mt-6 text-lg">{scanResult.message}</p>
                    <button className="mt-8 w-full bg-white text-black py-5 rounded-3xl font-semibold text-lg">
                      Get Full Report + Local Pros →
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {activeTab === 'alerts' && (
          <div className="bg-sky-950 border border-sky-400 rounded-3xl p-12 text-center">
            <CloudRain className="w-20 h-20 mx-auto mb-6 text-sky-400" />
            <p className="text-4xl font-semibold">Severe Thunderstorm Warning</p>
            <p className="text-2xl mt-6">DFW Area • Hail & Damaging Winds Possible</p>
          </div>
        )}

        {(activeTab === 'repairs' || activeTab === 'claims') && (
          <div className="bg-zinc-900 rounded-3xl p-16 text-center">
            <h3 className="text-3xl font-semibold mb-4">Feature Coming Soon</h3>
            <p className="text-zinc-400">We're working hard to bring you local repair matching and easy insurance claims.</p>
          </div>
        )}
      </div>
    </div>
  );
}