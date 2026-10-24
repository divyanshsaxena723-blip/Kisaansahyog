import { Bookmark, FileText, Search, Send } from "lucide-react";
import { getDictionary } from "@kisaansahyog/shared";
import { useAppStore } from "../store/useAppStore";
import { SurfaceCard } from "../components/stitch/SurfaceCard";
import { StatusBadge } from "../components/stitch/StatusBadge";

const saved = [
  { id: "1", crop: "Wheat", qty: "30 Q", price: "₹2400/Q", trader: "Agarwal Mills" },
  { id: "2", crop: "Mustard", qty: "15 Q", price: "₹5450/Q", trader: "Punjab Traders" },
];

const requirements = [
  { id: "r1", crop: "Basmati 1121", qty: "100 Q", budget: "₹3900/Q", location: "Delhi NCR" },
];

export default function BuyerScreens() {
  const language = useAppStore((state) => state.language);
  const buyerTab = useAppStore((state) => state.buyerTab);
  const dictionary = getDictionary(language);

  if (buyerTab === "requirements") {
    return (
      <div className="space-y-4">
        <div>
          <h1 className="text-xl font-extrabold text-soil-text">
            {dictionary.nav.requirements}
          </h1>
          <p className="text-xs text-soil-brown">Post bulk demand</p>
        </div>

        <SurfaceCard>
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold">Post requirement</h2>
            <FileText size={18} className="text-leaf-green" />
          </div>
          <div className="mt-3 space-y-2">
            {[
              { label: "Crop", value: "Basmati 1121" },
              { label: "Quantity", value: "100 Quintal" },
              { label: "Max price", value: "₹3900 / Quintal" },
              { label: "Delivery district", value: "Delhi NCR" },
              { label: "Needed by", value: "05 Nov 2026" },
            ].map((field) => (
              <div
                key={field.label}
                className="flex min-h-[56px] items-center justify-between rounded-2xl bg-cream-bg px-3 py-2"
              >
                <p className="text-xs text-soil-brown">{field.label}</p>
                <p className="text-sm font-semibold">{field.value}</p>
              </div>
            ))}
          </div>
          <button className="mt-4 flex min-h-[56px] w-full items-center justify-center gap-2 rounded-2xl bg-leaf-green text-cream-card">
            <Send size={18} /> Publish requirement
          </button>
        </SurfaceCard>

        <SurfaceCard>
          <h2 className="text-base font-bold">Active requirements</h2>
          <div className="mt-2 space-y-2">
            {requirements.map((req) => (
              <div
                key={req.id}
                className="flex min-h-[56px] items-center justify-between rounded-2xl border border-cream-border px-3 py-2"
              >
                <div>
                  <p className="text-sm font-semibold">{req.crop}</p>
                  <p className="text-xs text-soil-brown">
                    {req.qty} • {req.location}
                  </p>
                </div>
                <StatusBadge tone="gold">{req.budget}</StatusBadge>
              </div>
            ))}
          </div>
        </SurfaceCard>
      </div>
    );
  }

  if (buyerTab === "saved") {
    return (
      <div className="space-y-4">
        <div>
          <h1 className="text-xl font-extrabold text-soil-text">
            {dictionary.nav.saved}
          </h1>
          <p className="text-xs text-soil-brown">Saved listings</p>
        </div>
        <div className="space-y-2">
          {saved.map((item) => (
            <SurfaceCard key={item.id} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bookmark size={18} className="text-harvest-gold" />
                <div>
                  <p className="text-sm font-semibold">
                    {item.crop} • {item.qty}
                  </p>
                  <p className="text-xs text-soil-brown">{item.trader}</p>
                </div>
              </div>
              <StatusBadge tone="leaf">{item.price}</StatusBadge>
            </SurfaceCard>
          ))}
        </div>
      </div>
    );
  }

  if (buyerTab === "account") {
    return (
      <div className="space-y-4">
        <div>
          <h1 className="text-xl font-extrabold text-soil-text">
            {dictionary.nav.account}
          </h1>
          <p className="text-xs text-soil-brown">Buyer profile</p>
        </div>
        <SurfaceCard>
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-leaf-soft">
              <Search size={18} className="text-leaf-deep" />
            </div>
            <div>
              <p className="text-base font-bold">Agarwal Flour Mills</p>
              <p className="text-xs text-soil-brown">Kanpur • GSTIN verified</p>
            </div>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-2">
            <div className="rounded-2xl bg-cream-bg p-3">
              <p className="text-xs text-soil-brown">Active requirements</p>
              <p className="text-xl font-extrabold">3</p>
            </div>
            <div className="rounded-2xl bg-cream-bg p-3">
              <p className="text-xs text-soil-brown">Deals in progress</p>
              <p className="text-xl font-extrabold">18</p>
            </div>
          </div>
        </SurfaceCard>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl font-extrabold text-soil-text">
          {dictionary.nav.market}
        </h1>
        <p className="text-xs text-soil-brown">Buyer marketplace</p>
      </div>
      <SurfaceCard>
        <div className="flex items-center gap-2 rounded-2xl bg-cream-bg px-3 py-2">
          <Search size={18} className="text-soil-brown" />
          <input
            placeholder="Search crop, variety, location..."
            className="w-full bg-transparent text-sm outline-none"
          />
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {["Wheat", "Basmati", "Mustard", "Maize"].map((tag) => (
            <span
              key={tag}
              className="min-h-[40px] rounded-full border border-cream-border px-3 py-1 text-xs"
            >
              {tag}
            </span>
          ))}
        </div>
      </SurfaceCard>
      <SurfaceCard>
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold">Direct farmer lots</p>
          <StatusBadge tone="leaf">0% commission</StatusBadge>
        </div>
        <p className="mt-1 text-xs text-soil-brown">
          Browse verified lots and connect directly with farmers.
        </p>
      </SurfaceCard>
    </div>
  );
}
