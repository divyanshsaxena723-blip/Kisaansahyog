import React, { useState } from 'react';
import {
  Search,
  Phone,
  MessageCircle,
  Handshake,
  CheckCircle2,
  X,
  ArrowRight,
  TrendingDown,
} from 'lucide-react';
import { useAppStore } from '../store/useAppStore';

interface Listing {
  id: string;
  cropName: string;
  cropNameHi: string;
  variety: string;
  quantity: number;
  rate: number;
  farmerName: string;
  farmerPhone: string;
  location: string;
  verified: boolean;
  harvestDate: string;
}

const INITIAL_LISTINGS: Listing[] = [
  {
    id: 'lot-1',
    cropName: 'Wheat',
    cropNameHi: 'गेहूं',
    variety: 'HD-2967 (Sharbati)',
    quantity: 40,
    rate: 2450,
    farmerName: 'रमेश कुमार (Ramesh Kumar)',
    farmerPhone: '9876543210',
    location: 'सीतापुर, उत्तर प्रदेश (Sitapur, UP)',
    verified: true,
    harvestDate: 'Ready Now (तैयार स्टॉक)',
  },
  {
    id: 'lot-2',
    cropName: 'Mustard',
    cropNameHi: 'सरसों',
    variety: 'Pusa Bold',
    quantity: 25,
    rate: 5400,
    farmerName: 'सुरेश पटेल (Suresh Patel)',
    farmerPhone: '9876543211',
    location: 'करनाल, हरियाणा (Karnal, HR)',
    verified: true,
    harvestDate: 'Ready Now (तैयार स्टॉक)',
  },
  {
    id: 'lot-3',
    cropName: 'Chana',
    cropNameHi: 'चना',
    variety: 'Desi Chana (चना)',
    quantity: 15,
    rate: 5850,
    farmerName: 'महेंद्र सिंह (Mahendra Singh)',
    farmerPhone: '9876543212',
    location: 'नासिक, महाराष्ट्र (Nashik, MH)',
    verified: true,
    harvestDate: 'In 3 Days',
  },
  {
    id: 'lot-4',
    cropName: 'Basmati',
    cropNameHi: 'बासमती धान',
    variety: 'Pusa 1121',
    quantity: 60,
    rate: 3800,
    farmerName: 'बलबीर सिंह (Balbir Singh)',
    farmerPhone: '9876543213',
    location: 'लुधियाना, पंजाब (Ludhiana, PB)',
    verified: true,
    harvestDate: 'Ready Now (तैयार स्टॉक)',
  },
  {
    id: 'lot-5',
    cropName: 'Maize',
    cropNameHi: 'मक्का',
    variety: 'Hybrid Yellow',
    quantity: 35,
    rate: 2150,
    farmerName: 'राजेश यादव (Rajesh Yadav)',
    farmerPhone: '9876543214',
    location: 'अलवर, राजस्थान (Alwar, RJ)',
    verified: true,
    harvestDate: 'Ready Now',
  },
];

export const BuyerMarketScreen: React.FC = () => {
  const [search, setSearch] = useState('');
  const [selectedCrop, setSelectedCrop] = useState<string>('All');
  const [activeBargainLot, setActiveBargainLot] = useState<Listing | null>(null);
  const [counterRate, setCounterRate] = useState<number>(0);
  const [offerSuccessMsg, setOfferSuccessMsg] = useState<string | null>(null);

  const crops = ['All', 'Wheat', 'Basmati', 'Mustard', 'Chana', 'Maize'];

  const filteredListings = INITIAL_LISTINGS.filter((lot) => {
    const matchesCrop =
      selectedCrop === 'All' ||
      lot.cropName.toLowerCase() === selectedCrop.toLowerCase();
    const query = search.toLowerCase();
    const matchesSearch =
      lot.cropName.toLowerCase().includes(query) ||
      lot.cropNameHi.includes(query) ||
      lot.variety.toLowerCase().includes(query) ||
      lot.location.toLowerCase().includes(query) ||
      lot.farmerName.toLowerCase().includes(query);
    return matchesCrop && matchesSearch;
  });

  const openBargainModal = (lot: Listing) => {
    setActiveBargainLot(lot);
    setCounterRate(lot.rate - 50);
    setOfferSuccessMsg(null);
  };

  const handleWhatsAppBargain = (lot: Listing, offered: number) => {
    const diff = lot.rate - offered;
    const text = encodeURIComponent(
      `नमस्ते ${lot.farmerName} जी! मैंने किसान सहयोग (KisaanSahyog) पर आपका ${lot.cropNameHi} (${lot.variety}) का ${lot.quantity} क्विंटल लॉट देखा।\n\nआपका भाव: ₹${lot.rate}/क्विंटल\nमेरा प्रस्तावित भाव: ₹${offered}/क्विंटल (-₹${diff})\nकुल सौदा मूल्य: ₹${(offered * lot.quantity).toLocaleString('en-IN')}\n\nक्या यह भाव आपको स्वीकार है?`,
    );
    window.open(
      `https://wa.me/91${lot.farmerPhone}?text=${text}`,
      '_blank',
      'noopener,noreferrer',
    );
  };

  return (
    <div className="space-y-4 pb-24">
      {/* Search Header */}
      <div className="bg-white p-3 rounded-2xl border border-cream-border shadow-sm">
        <div className="relative mb-3">
          <Search className="absolute left-3.5 top-3.5 text-soil-brown" size={18} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="फसल, किस्म या जिला खोजें..."
            className="w-full min-h-[48px] pl-10 pr-4 bg-cream-bg rounded-xl border border-cream-border text-sm font-semibold text-soil-deep focus:outline-none focus:ring-2 focus:ring-leaf-green"
          />
        </div>

        {/* Filter Chips */}
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
          {crops.map((crop) => (
            <button
              key={crop}
              onClick={() => setSelectedCrop(crop)}
              className={`min-h-[40px] px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                selectedCrop === crop
                  ? 'bg-soil-brown text-white shadow-sm'
                  : 'bg-cream-bg text-soil-brown border border-cream-border hover:bg-cream-tan'
              }`}
            >
              {crop === 'All' ? 'सभी फसलें (All)' : crop}
            </button>
          ))}
        </div>
      </div>

      {/* Banner */}
      <div className="flex items-center justify-between px-1">
        <div>
          <h2 className="text-base font-bold text-soil-deep font-devanagari">
            उपलब्ध किसान लॉट
          </h2>
          <p className="text-xs text-soil-brown">
            {filteredListings.length} सक्रिय लॉट मंडी भाव से जुड़े हैं
          </p>
        </div>
        <span className="bg-leaf-soft text-leaf-deep px-3 py-1 rounded-full text-xs font-bold border border-leaf-green">
          0% कमीशन
        </span>
      </div>

      {/* Listings List */}
      <div className="space-y-3">
        {filteredListings.map((lot) => {
          const totalVal = lot.rate * lot.quantity;
          return (
            <div
              key={lot.id}
              className="bg-white rounded-2xl p-4 border border-cream-border shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Card Top */}
              <div className="flex justify-between items-start mb-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="bg-leaf-soft text-leaf-deep px-2.5 py-0.5 rounded-md text-xs font-bold">
                      {lot.cropNameHi} ({lot.cropName})
                    </span>
                    {lot.verified && (
                      <span className="text-[11px] text-leaf-deep font-bold flex items-center gap-0.5">
                        <CheckCircle2 size={13} />
                        सत्यापित
                      </span>
                    )}
                  </div>
                  <div className="text-base font-extrabold text-soil-deep mt-1">
                    {lot.variety}
                  </div>
                  <p className="text-xs text-soil-brown font-medium mt-0.5">
                    {lot.location}
                  </p>
                </div>

                <div className="text-right">
                  <div className="text-xl font-black text-soil-deep">
                    ₹ {lot.rate.toLocaleString('en-IN')}
                  </div>
                  <div className="text-[11px] font-semibold text-soil-brown">
                    प्रति क्विंटल
                  </div>
                  <div className="text-xs font-bold text-leaf-deep mt-0.5">
                    कुल ₹ {totalVal.toLocaleString('en-IN')}
                  </div>
                </div>
              </div>

              {/* Farmer Info Strip */}
              <div className="bg-cream-bg rounded-xl p-2.5 my-3 flex justify-between items-center text-xs">
                <div>
                  <span className="text-soil-brown block text-[10px]">
                    किसान (Seller)
                  </span>
                  <span className="font-bold text-soil-deep">{lot.farmerName}</span>
                </div>
                <div className="text-right">
                  <span className="text-soil-brown block text-[10px]">उपलब्धता</span>
                  <span className="font-bold text-soil-deep">
                    {lot.quantity} क्विंटल • {lot.harvestDate}
                  </span>
                </div>
              </div>

              {/* Action Buttons: Call, WhatsApp, Bargain */}
              <div className="grid grid-cols-3 gap-2 pt-1">
                <a
                  href={`tel:${lot.farmerPhone}`}
                  className="min-h-[48px] bg-cream-bg border border-cream-border text-soil-deep hover:bg-cream-tan rounded-xl flex items-center justify-center gap-1.5 text-xs font-bold active:scale-95 transition-transform"
                >
                  <Phone className="text-soil-brown" size={15} />
                  <span>कॉल</span>
                </a>

                <button
                  onClick={() => handleWhatsAppBargain(lot, lot.rate)}
                  className="min-h-[48px] bg-emerald-50 border border-emerald-300 text-emerald-800 hover:bg-emerald-100 rounded-xl flex items-center justify-center gap-1.5 text-xs font-bold active:scale-95 transition-transform"
                >
                  <MessageCircle className="text-emerald-600" size={15} />
                  <span>व्हाट्सएप</span>
                </button>

                <button
                  onClick={() => openBargainModal(lot)}
                  className="min-h-[48px] bg-harvest-gold text-soil-deep hover:bg-amber-500 rounded-xl flex items-center justify-center gap-1.5 text-xs font-bold shadow-sm active:scale-95 transition-transform"
                >
                  <Handshake size={15} />
                  <span>मोलभाव करें</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bargain Modal / Drawer */}
      {activeBargainLot && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-end justify-center p-0 max-w-md mx-auto">
          <div className="w-full bg-white rounded-t-3xl border-t border-cream-border p-5 shadow-2xl">
            {/* Modal Header */}
            <div className="flex justify-between items-center pb-3 border-b border-cream-border">
              <div>
                <h3 className="text-lg font-bold text-soil-deep font-devanagari flex items-center gap-1.5">
                  <Handshake className="text-harvest-gold" size={20} />
                  मोलभाव करें (Make an Offer)
                </h3>
                <p className="text-xs text-soil-brown">
                  {activeBargainLot.cropNameHi} • {activeBargainLot.quantity} क्विंटल
                </p>
              </div>
              <button
                onClick={() => setActiveBargainLot(null)}
                className="w-11 h-11 min-h-[48px] min-w-[48px] rounded-full bg-cream-bg flex items-center justify-center text-soil-brown hover:bg-cream-tan"
              >
                <X size={18} />
              </button>
            </div>

            {offerSuccessMsg ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-14 h-14 bg-leaf-soft text-leaf-deep rounded-full flex items-center justify-center mx-auto border border-leaf-green">
                  <CheckCircle2 size={32} />
                </div>
                <h4 className="text-base font-bold text-soil-deep">
                  {offerSuccessMsg}
                </h4>
                <p className="text-xs text-soil-brown">
                  किसान को आपका ऑफ़र भेज दिया गया है।
                </p>
                <button
                  onClick={() => setActiveBargainLot(null)}
                  className="min-h-[48px] px-6 bg-leaf-green text-white rounded-xl text-sm font-bold"
                >
                  ठीक है (Close)
                </button>
              </div>
            ) : (
              <div className="py-4 space-y-4">
                {/* Rates Comparison */}
                <div className="grid grid-cols-2 gap-3 bg-cream-bg p-3 rounded-2xl border border-cream-border">
                  <div>
                    <span className="text-[11px] text-soil-brown font-semibold block">
                      किसान का भाव
                    </span>
                    <span className="text-lg font-bold text-soil-deep">
                      ₹ {activeBargainLot.rate} / Q
                    </span>
                  </div>
                  <div>
                    <span className="text-[11px] text-soil-brown font-semibold block">
                      आपकी प्रस्तावित दर
                    </span>
                    <span className="text-lg font-bold text-leaf-deep">
                      ₹ {counterRate} / Q
                    </span>
                  </div>
                </div>

                {/* Counter Input & Quick Chips */}
                <div>
                  <label
                    htmlFor="counter-rate-input"
                    className="text-xs font-bold text-soil-brown block mb-1.5"
                  >
                    अपनी दर तय करें (₹ प्रति क्विंटल):
                  </label>
                  <input
                    id="counter-rate-input"
                    type="number"
                    value={counterRate}
                    onChange={(e) => setCounterRate(Number(e.target.value))}
                    className="w-full min-h-[50px] px-4 rounded-xl border border-cream-border text-lg font-extrabold text-soil-deep focus:outline-none focus:ring-2 focus:ring-leaf-green"
                  />
                  <div className="flex gap-2 mt-2">
                    {[-25, -50, -100].map((delta) => (
                      <button
                        key={delta}
                        type="button"
                        onClick={() => setCounterRate(activeBargainLot.rate + delta)}
                        className="flex-1 min-h-[48px] py-1.5 bg-white border border-cream-border text-soil-brown rounded-lg text-xs font-bold hover:bg-cream-tan flex items-center justify-center gap-0.5"
                      >
                        <TrendingDown size={12} />
                        {delta} ₹/Q
                      </button>
                    ))}
                  </div>
                </div>

                {/* Total Value Banner */}
                <div className="bg-leaf-soft border border-leaf-green p-3 rounded-xl flex justify-between items-center text-xs">
                  <div>
                    <span className="text-soil-brown block">
                      कुल सौदा (Total Deal):
                    </span>
                    <span className="font-bold text-soil-deep text-sm">
                      {activeBargainLot.quantity} Q × ₹{counterRate}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-soil-brown block">संशोधित मूल्य:</span>
                    <span className="text-base font-extrabold text-leaf-deep">
                      ₹{' '}
                      {(counterRate * activeBargainLot.quantity).toLocaleString(
                        'en-IN',
                      )}
                    </span>
                  </div>
                </div>

                {/* Submit Actions */}
                <div className="space-y-2 pt-2">
                  <button
                    onClick={() =>
                      handleWhatsAppBargain(activeBargainLot, counterRate)
                    }
                    className="w-full min-h-[52px] bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-sm"
                  >
                    <MessageCircle size={18} />
                    <span>व्हाट्सएप पर यह भाव भेजें (Send on WhatsApp)</span>
                  </button>

                  <button
                    onClick={() => {
                      setOfferSuccessMsg(
                        `₹ ${counterRate}/क्विंटल का ऑफ़र दर्ज कर लिया गया है!`,
                      );
                    }}
                    className="w-full min-h-[48px] bg-soil-brown hover:bg-soil-deep text-white rounded-xl font-bold text-sm flex items-center justify-center gap-1.5"
                  >
                    <ArrowRight size={16} />
                    <span>पोर्टल पर ऑफ़र सबमिट करें</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export const BuyerRequirementsScreen: React.FC = () => {
  return (
    <div className="space-y-4 pb-20">
      <div className="bg-white p-4 rounded-2xl border border-cream-border shadow-sm">
        <h3 className="font-bold text-soil-deep text-base font-devanagari">
          सक्रिय मोलभाव एवं ऑफ़र सूची
        </h3>
        <p className="text-xs text-soil-brown mt-1">
          आपके द्वारा किसानों को भेजे गए हालिया प्रस्ताव:
        </p>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-cream-border shadow-sm">
        <div className="flex justify-between items-start">
          <div>
            <span className="text-xs font-bold text-leaf-deep bg-leaf-soft px-2 py-0.5 rounded-md">
              गेहूं (Wheat)
            </span>
            <div className="font-bold text-soil-deep text-sm mt-1">
              40 क्विंटल • रमेश कुमार (सीतापुर)
            </div>
            <p className="text-xs text-soil-brown mt-0.5">
              मूल भाव: ₹2,450 ➔ आपका ऑफ़र: ₹2,400/Q
            </p>
          </div>
          <span className="text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300 px-2.5 py-1 rounded-full">
            प्रतीक्षारत (Pending)
          </span>
        </div>
      </div>
    </div>
  );
};

export const BuyerSavedScreen: React.FC = () => (
  <div className="p-4 bg-white rounded-2xl border border-cream-border text-center py-12">
    <p className="text-sm font-bold text-soil-deep">कोई सहेजा गया लॉट नहीं है</p>
    <p className="text-xs text-soil-brown mt-1">
      बाज़ार से लॉट सहेजने पर वे यहाँ दिखाई देंगे।
    </p>
  </div>
);

export const BuyerAccountScreen: React.FC = () => (
  <div className="space-y-4 pb-20">
    <div className="bg-white p-4 rounded-2xl border border-cream-border shadow-sm">
      <h3 className="font-bold text-soil-deep text-base">
        अग्रवाल ट्रेडर्स (Agarwal Traders)
      </h3>
      <p className="text-xs text-soil-brown">
        थोक अनाज खरीदार • कानपुर, उत्तर प्रदेश
      </p>
      <div className="mt-3 pt-3 border-t border-cream-border text-xs text-soil-brown space-y-1.5">
        <div>
          <strong>GSTIN:</strong> 09AAACA1234A1Z5
        </div>
        <div>
          <strong>संपर्क:</strong> +91 94150 00000
        </div>
        <div>
          <strong>सत्यापन स्थिति:</strong> सत्यापित व्यापारी
        </div>
      </div>
    </div>
  </div>
);

/**
 * Default entry used by App.tsx: renders the buyer screen for the active tab.
 */
const BuyerScreens: React.FC = () => {
  const buyerTab = useAppStore((state) => state.buyerTab);

  switch (buyerTab) {
    case 'market':
      return <BuyerMarketScreen />;
    case 'requirements':
      return <BuyerRequirementsScreen />;
    case 'saved':
      return <BuyerSavedScreen />;
    case 'account':
      return <BuyerAccountScreen />;
    default:
      return <BuyerMarketScreen />;
  }
};

export default BuyerScreens;
