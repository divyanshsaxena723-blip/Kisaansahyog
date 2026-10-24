import { Mic, Send, Sparkles } from "lucide-react";
import { getDictionary } from "@kisaansahyog/shared";
import { useAppStore } from "../store/useAppStore";
import { SurfaceCard } from "../components/stitch/SurfaceCard";
import { StatusBadge } from "../components/stitch/StatusBadge";

const chips = ["Wheat", "Basmati", "Mustard", "Gram", "Maize"];

export default function SellScreen() {
  const language = useAppStore((state) => state.language);
  const setVoiceOpen = useAppStore((state) => state.setVoiceOpen);
  const dictionary = getDictionary(language);

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl font-extrabold text-soil-text">
          {dictionary.screens.sell}
        </h1>
        <p className="text-xs text-soil-brown">
          Voice-first listing • Direct to buyers
        </p>
      </div>

      <SurfaceCard className="text-center">
        <StatusBadge>
          <Sparkles size={11} /> Voice enabled
        </StatusBadge>
        <button
          onClick={() => setVoiceOpen(true)}
          className="mx-auto mt-4 flex h-20 w-20 items-center justify-center rounded-full bg-harvest-gold text-soil-deep shadow-lg"
        >
          <Mic size={32} />
        </button>
        <p className="mt-3 text-sm font-semibold">
          Say: "30 quintal wheat, ₹2400 per quintal"
        </p>
        <p className="mt-1 text-xs text-soil-brown">
          We'll auto-fill crop, quantity and price
        </p>
      </SurfaceCard>

      <SurfaceCard>
        <h2 className="text-base font-bold">Quick prompts</h2>
        <div className="mt-2 flex flex-wrap gap-2">
          {chips.map((chip) => (
            <button
              key={chip}
              className="min-h-[48px] rounded-full border border-cream-border bg-cream-bg px-4 text-sm"
            >
              {chip}
            </button>
          ))}
        </div>
      </SurfaceCard>

      <SurfaceCard>
        <h2 className="text-base font-bold">Lot creation form</h2>
        <div className="mt-3 space-y-2">
          {[
            { label: "Crop", value: "Wheat (PBW 824)" },
            { label: "Quantity", value: "30 Quintal" },
            { label: "Expected price", value: "₹2400 / Quintal" },
            { label: "Location", value: "Ludhiana, Punjab" },
            { label: "Available by", value: "28 Oct 2026" },
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
          <Send size={18} /> Post lot for buyers
        </button>
      </SurfaceCard>
    </div>
  );
}
