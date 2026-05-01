import { useState } from 'react';
import { Camera, CloudRain, MapPin, FileText } from 'lucide-react';

export default function StormGuard() {
  const [photo, setPhoto] = useState<string | null>(null);
  const [scanResult, setScanResult] = useState<any>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [activeTab, setActiveTab] = useState<'scan' | 'alerts' | 'repairs' | 'claims'>('scan');

  const handlePhotoUpload = (e: any, type: string) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsScanning(true);
    const reader = new FileReader();
    reader.onload = () => {
      setPhoto(reader.result as string);
      setTimeout(() => {
        setScanResult({
          severity: "Moderate",
          cost: 1850,
          message: `Storm damage detected on your ${type.toLowerCase()}. Local recovery pros available now.`
        });
        setIsScanning(false);
      }, 1600);
    };
    reader.readAsDataURL(file);
  };

  const repairs = [
    { name: "DFW Hail Repair Pros", distance: "2.3 mi", price: "$1,200–$2,800", phone: "(972) 555-0123", rating: "4.9" },
    { name: "Plano Storm Masters", distance: "4.1 mi", price: "$950–$2,400", phone: "(214) 555-0987", rating: "4.8" },
    { name: "North Texas Restoration", distance: "6.8 mi", price: "$1,450–$3,200", phone: "(469) 555-3344", rating: "4.7" },
  ];

  return (
    <div className="min-h-screen bg-zinc-900 text-white">   {/* Changed to gray background */}
      {/* Header */}
      <header className="bg-zinc-950 border-b border-sky-500 sticky top-0 p-4 shadow-lg">
        <div className="max-w-6xl mx-auto flex items-center gap-3">
          <img src="https://i.imgur.com/WHWgnpB.jpeg" alt="StormGuard" className="h-10 w-auto" />
          <div>
            <h1 className="text-2xl font-bold tracking-tighter">StormGuard</h1>
            <p className="text-xs text-sky-400">AI Storm Protection • Dallas</p>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 pt-6">
        {/* Tabs */}
        <div className="flex gap-3 pb-8 overflow-x-auto border-b border-zinc-700">
          {['scan', 'alerts', 'repairs', 'claims'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`px-8 py-4 rounded-3xl font-semibold whitespace-nowrap transition-all flex-shrink-0 ${
                activeTab === tab 
                  ? 'bg-sky-400 text-zinc-950 shadow-lg shadow-sky-500/50' 
                  : 'bg-zinc-800 hover:bg-zinc-700'
              }`}
            >
              {tab === 'scan' ? '📸 Scan Damage' : 
               tab === 'alerts' ? '🚨 Live Alerts' : 
               tab === 'repairs' ? '🔧 Repairs' : '📄 Claims'}
            </button>
          ))}
        </div>

        {/* Scan Tab */}
        {activeTab === 'scan' && (
          <div className="bg-zinc-800 rounded-3xl p-10 text-center">
            <Camera className="w-24 h-24 mx-auto mb-6 text-sky-400" />
            <h2 className="text-4xl font-bold mb-3">Scan Storm Damage</h2>
            <p className="text-zinc-400 mb-10">Upload a clear photo of your car, roof, or flooding</p>

            <div className="grid grid-cols-1 gap-4">
              {['Car', 'Roof', 'Flooding'].map((type) => (
                <label key={type} className="border-2 border-dashed border-zinc-600 hover:border-sky-400 rounded-3xl p-10 cursor-pointer transition-all">
                  <span className="text-xl font-semibold">{type} Damage</span>
                  <input type="file" accept="image/*" className="hidden" onChange={(e) => handlePhotoUpload(e, type)} />
                </label>
              ))}
            </div>

            {isScanning && (
              <div className="mt-8 text-sky-400 flex items-center justify-center gap-3">
                <div className="animate-spin w-5 h-5 border-2 border-sky-400 border-t-transparent rounded-full"></div>
                Analyzing with AI...
              </div>
            )}

            {photo && !isScanning && (
              <div className="mt-12">
                <img src={photo} alt="Damage" className="mx-auto rounded-3xl max-h-96 shadow-2xl" />
                {scanResult && (
                  <div className="mt-10 bg-emerald-900/30 border border-emerald-500 rounded-3xl p-10">
                    <p className="text-6xl font-bold text-emerald-400">${scanResult.cost}</p>
                    <p className="text-3xl mt-3">{scanResult.severity} Damage</p>
                    <p className="mt-6 text-lg">{scanResult.message}</p>
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
          <div className="bg-zinc-800 border border-sky-500 rounded-3xl p-12 text-center">
            <CloudRain className="w-20 h-20 mx-auto mb-6 text-sky-400" />
            <p className="text-3xl font-semibold">Severe Thunderstorm Warning</p>
            <p className="text-xl mt-6">DFW Area • Hail & Damaging Winds Possible</p>
          </div>
        )}

        {/* Repairs Tab */}
        {activeTab === 'repairs' && (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">Nearby Repair Pros</h2>
            <p className="text-zinc-400">Trusted shops near Dallas</p>
            {repairs.map((shop, i) => (
              <div key={i} className="bg-zinc-800 rounded-3xl p-6">
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-semibold">{shop.name}</h3>
                    <p className="text-emerald-400">{shop.price}</p>
                  </div>
                  <div className="text-right">
                    <p>{shop.distance}</p>
                    <p className="text-amber-400">★ {shop.rating}</p>
                  </div>
                </div>
                <a href={`tel:${shop.phone}`} className="mt-6 block bg-sky-500 py-4 rounded-2xl text-center font-medium">
                  Call Now
                </a>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'claims' && (
          <div className="bg-zinc-800 rounded-3xl p-16 text-center">
            <FileText className="w-20 h-20 mx-auto mb-8 text-sky-400" />
            <h3 className="text-3xl font-semibold">Insurance Claim Helper</h3>
            <p className="text-zinc-400 mt-4">Coming soon</p>
          </div>
        )}
      </div>
    </div>
  );
}