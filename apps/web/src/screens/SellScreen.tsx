import { useMemo, useState } from 'react';
import { CheckCircle2, AlertTriangle, Send, Sparkles } from 'lucide-react';
import {
  getDictionary,
  MANDI_BENCHMARK_RATES,
  MOCK_FARMER,
} from '@kisaansahyog/shared';
import { useAppStore } from '../store/useAppStore';
import { useListingStore } from '../store/useListingStore';
import { SurfaceCard } from '../components/stitch/SurfaceCard';
import { StatusBadge } from '../components/stitch/StatusBadge';

const cropPresets = [
  { label: 'Wheat HD-2967', cropName: 'Wheat', cropNameHi: 'गेहूं', variety: 'HD-2967' },
  { label: 'Mustard Pusa Bold', cropName: 'Mustard', cropNameHi: 'सरसों', variety: 'Pusa Bold' },
  { label: 'Chana Desi', cropName: 'Chana', cropNameHi: 'चना', variety: 'Desi' },
  { label: 'Basmati 1121', cropName: 'Basmati', cropNameHi: 'बासमती धान', variety: '1121' },
];

const availabilityPresets = [
  'Ready Now (तैयार स्टॉक)',
  'In 3 Days',
  'In 1 Week',
];

export default function SellScreen() {
  const language = useAppStore((state) => state.language);
  const setFarmerTab = useAppStore((state) => state.setFarmerTab);
  const dictionary = getDictionary(language);

  const addListing = useListingStore((state) => state.addListing);

  const [selectedCrop, setSelectedCrop] = useState(cropPresets[0]);
  const [quantityQuintals, setQuantityQuintals] = useState<number>(30);
  const [ratePerQuintal, setRatePerQuintal] = useState<number>(2450);
  const [harvestDate, setHarvestDate] = useState<string>(availabilityPresets[0]);
  const [success, setSuccess] = useState<string | null>(null);

  const benchmarkRate = useMemo(() => {
    const key = selectedCrop.cropName as keyof typeof MANDI_BENCHMARK_RATES;
    const hiKey = selectedCrop.cropNameHi as keyof typeof MANDI_BENCHMARK_RATES;
    const rate = MANDI_BENCHMARK_RATES[key] ?? MANDI_BENCHMARK_RATES[hiKey] ?? 2400;
    return rate as number;
  }, [selectedCrop]);

  const guardrail = useMemo(() => {
    const mandiRate = benchmarkRate;
    const askingRate = Number(ratePerQuintal) || 0;
    const diffPercent = Math.round(((askingRate - mandiRate) / mandiRate) * 100);
    const minAllowed = Math.round(mandiRate * 0.85);
    const maxAllowed = Math.round(mandiRate * 1.4);

    if (diffPercent > 40) {
      return {
        status: 'high' as const,
        diffPercent,
        mandiRate,
        minAllowed,
        maxAllowed,
      };
    }
    if (diffPercent < -15) {
      return {
        status: 'low' as const,
        diffPercent,
        mandiRate,
        minAllowed,
        maxAllowed,
      };
    }
    return {
      status: 'fair' as const,
      diffPercent,
      mandiRate,
      minAllowed,
      maxAllowed,
    };
  }, [benchmarkRate, ratePerQuintal]);

  const totalDealValue = useMemo(() => {
    const qty = Number(quantityQuintals) || 0;
    const rate = Number(ratePerQuintal) || 0;
    return qty * rate;
  }, [quantityQuintals, ratePerQuintal]);

  const handlePublish = () => {
    addListing({
      cropName: selectedCrop.cropName,
      cropNameHi: selectedCrop.cropNameHi,
      variety: selectedCrop.variety,
      quantityQuintals: Number(quantityQuintals),
      ratePerQuintal: Number(ratePerQuintal),
      farmerName: MOCK_FARMER.name,
      farmerPhone: MOCK_FARMER.phone,
      district: MOCK_FARMER.location.split(',')[0].trim(),
      state: 'उत्तर प्रदेश',
      harvestDate,
      verified: true,
      organic: false,
      location: MOCK_FARMER.location,
    } as any);

    setSuccess('आपकी फसल बाज़ार में लाइव हो गई है!');
    setTimeout(() => {
      setSuccess(null);
      setFarmerTab('market');
    }, 1400);
  };

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl font-extrabold text-soil-text">
          {dictionary.screens.sell}
        </h1>
        <p className="text-xs text-soil-brown">
          किसान से सीधे खरीदार तक • कमीशन मुक्त
        </p>
      </div>

      {success && (
        <div className="flex items-center gap-2 rounded-2xl border border-leaf-green bg-leaf-soft px-3 py-2 text-sm font-semibold text-leaf-deep">
          <CheckCircle2 size={18} />
          <span>{success}</span>
        </div>
      )}

      <SurfaceCard>
        <StatusBadge>
          <Sparkles size={11} /> Farmer Listing
        </StatusBadge>
        <h2 className="mt-2 text-base font-bold">
          नई फसल लिस्टिंग (New Crop Listing)
        </h2>
        <p className="text-xs text-soil-brown">
          नीचे दिए गए विकल्पों से अपनी फसल भरें और बाज़ार में प्रकाशित करें
        </p>
      </SurfaceCard>

      <SurfaceCard>
        <h2 className="text-base font-bold">फसल का नाम और किस्म (Crop & Variety)</h2>
        <div className="mt-2 flex flex-wrap gap-2">
          {cropPresets.map((preset) => (
            <button
              key={preset.label}
              type="button"
              onClick={() => setSelectedCrop(preset)}
              className={`min-h-[48px] rounded-full border px-4 text-sm font-semibold ${
                selectedCrop.label === preset.label
                  ? 'border-soil-brown bg-soil-brown text-white'
                  : 'border-cream-border bg-cream-bg text-soil-deep'
              }`}
            >
              {preset.label}
            </button>
          ))}
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
          <div className="rounded-xl bg-cream-bg p-2.5">
            <p className="text-soil-brown">Crop</p>
            <p className="font-semibold text-soil-deep">
              {selectedCrop.cropNameHi} ({selectedCrop.cropName})
            </p>
          </div>
          <div className="rounded-xl bg-cream-bg p-2.5">
            <p className="text-soil-brown">Variety</p>
            <p className="font-semibold text-soil-deep">{selectedCrop.variety}</p>
          </div>
        </div>
      </SurfaceCard>

      <SurfaceCard>
        <h2 className="text-base font-bold">
          मात्रा और अपेक्षित दर (Quantity & Expected Rate)
        </h2>

        <div className="mt-3 rounded-xl border border-cream-border bg-cream-bg px-3 py-2 text-xs font-semibold text-soil-deep">
          📊 वर्तमान मंडी भाव: ₹{guardrail.mandiRate.toLocaleString('en-IN')}/Q •
          स्वीकार्य सीमा: ₹{guardrail.minAllowed.toLocaleString('en-IN')} - ₹
          {guardrail.maxAllowed.toLocaleString('en-IN')}/Q
        </div>

        <div className="mt-3 grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-semibold text-soil-brown">
              मात्रा (क्विंटल)
            </label>
            <input
              type="number"
              min={1}
              value={quantityQuintals}
              onChange={(e) => setQuantityQuintals(Number(e.target.value))}
              className="mt-1 min-h-[56px] w-full rounded-2xl border border-cream-border bg-cream-bg px-3 text-sm font-semibold text-soil-deep"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-soil-brown">
              मांग दर (₹/क्विंटल)
            </label>
            <input
              type="number"
              min={100}
              value={ratePerQuintal}
              onChange={(e) => setRatePerQuintal(Number(e.target.value))}
              className="mt-1 min-h-[56px] w-full rounded-2xl border border-cream-border bg-cream-bg px-3 text-sm font-semibold text-soil-deep"
            />
          </div>
        </div>

        <div className="mt-3 rounded-2xl border border-cream-border bg-cream-bg p-3">
          <div className="flex items-center justify-between">
            <p className="text-xs text-soil-brown">
              कुल संभावित भुगतान (Total Deal Value)
            </p>
            <p className="text-lg font-extrabold text-soil-deep">
              ₹ {totalDealValue.toLocaleString('en-IN')}
            </p>
          </div>
        </div>

        {guardrail.status === 'high' && (
          <div className="mt-3 space-y-2 rounded-2xl border border-amber-300 bg-amber-50 px-3 py-2 text-xs text-amber-900">
            <div className="flex items-start gap-2">
              <AlertTriangle size={16} className="mt-0.5" />
              <p className="font-semibold">
                ⚠️ मंडी औसत भाव से {guardrail.diffPercent}% अधिक है!
              </p>
            </div>
            <p>
              सीतापुर मंडी का औसत भाव ₹{guardrail.mandiRate.toLocaleString('en-IN')}
              /क्विंटल है। भाव 40% से अधिक होने पर खरीदार मिलने में अधिक समय लग सकता
              है।
            </p>
            <p className="font-semibold">
              (उचित सीमा: ₹{guardrail.minAllowed.toLocaleString('en-IN')} - ₹
              {guardrail.maxAllowed.toLocaleString('en-IN')}/Q • अंतिम निर्णय आपका
              है)
            </p>
          </div>
        )}

        {guardrail.status === 'low' && (
          <div className="mt-3 space-y-2 rounded-2xl border border-orange-300 bg-orange-50 px-3 py-2 text-xs text-orange-900">
            <div className="flex items-start gap-2">
              <AlertTriangle size={16} className="mt-0.5" />
              <p className="font-semibold">
                ⚠️ मंडी औसत भाव से {Math.abs(guardrail.diffPercent)}% कम है!
              </p>
            </div>
            <p>
              सीतापुर मंडी का औसत भाव ₹{guardrail.mandiRate.toLocaleString('en-IN')}
              /क्विंटल है। न्यूनतम सीमा से कम भाव रखने पर लाभ कम हो सकता है।
            </p>
            <p className="font-semibold">
              (क्या आप सुनिश्चित हैं कि यह भाव सही है? • अंतिम निर्णय आपका है)
            </p>
          </div>
        )}

        {guardrail.status === 'fair' && (
          <div className="mt-3 space-y-1 rounded-2xl border border-leaf-green bg-leaf-soft px-3 py-2 text-xs text-leaf-deep">
            <div className="flex items-center gap-2">
              <CheckCircle2 size={16} />
              <p className="font-semibold">✅ उचित बाज़ार सीमा (Fair Market Range)</p>
            </div>
            <p>
              मंडी औसत दर ₹{guardrail.mandiRate.toLocaleString('en-IN')}/Q के अनुसार
              यह भाव स्वीकार्य सीमा (-15% से +40%) के भीतर है।
            </p>
          </div>
        )}
      </SurfaceCard>

      <SurfaceCard>
        <h2 className="text-base font-bold">कटाई/उपलब्धता (Harvest / Availability)</h2>
        <div className="mt-2 flex flex-wrap gap-2">
          {availabilityPresets.map((preset) => (
            <button
              key={preset}
              type="button"
              onClick={() => setHarvestDate(preset)}
              className={`min-h-[48px] rounded-full border px-4 text-sm font-semibold ${
                harvestDate === preset
                  ? 'border-leaf-green bg-leaf-green text-white'
                  : 'border-cream-border bg-cream-bg text-soil-deep'
              }`}
            >
              {preset}
            </button>
          ))}
        </div>
        <div className="mt-3 rounded-2xl bg-cream-bg p-3 text-xs text-soil-brown">
          <p>
            <span className="font-semibold text-soil-deep">किसान:</span>{' '}
            {MOCK_FARMER.name} • {MOCK_FARMER.location}
          </p>
          <p className="mt-1">
            <span className="font-semibold text-soil-deep">फोन:</span>{' '}
            {MOCK_FARMER.phone}
          </p>
        </div>
      </SurfaceCard>

      <button
        onClick={handlePublish}
        className="flex min-h-[56px] w-full items-center justify-center gap-2 rounded-2xl bg-leaf-green text-cream-card shadow-sm active:scale-[0.99]"
      >
        <Send size={18} /> बाज़ार में लिस्ट करें (Publish Lot)
      </button>
    </div>
  );
}
