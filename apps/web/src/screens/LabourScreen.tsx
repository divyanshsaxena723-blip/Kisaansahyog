import { MapPin, Phone, Tractor } from "lucide-react";
import { getDictionary } from "@kisaansahyog/shared";
import { useAppStore } from "../store/useAppStore";
import { SurfaceCard } from "../components/stitch/SurfaceCard";
import { StatusBadge } from "../components/stitch/StatusBadge";

const listings = [
  {
    id: "1",
    name: "Sukhi Tractor Services",
    type: "Tractor + Rotavator",
    rate: "₹800/hour",
    location: "Ludhiana",
    available: true,
  },
  {
    id: "2",
    name: "Baljeet Harvester",
    type: "Combine Harvester",
    rate: "₹1800/acre",
    location: "Jagraon",
    available: true,
  },
  {
    id: "3",
    name: "Kisan Trolley Service",
    type: "Trolley / Transport",
    rate: "₹450/trip",
    location: "Khanna",
    available: false,
  },
];

export default function LabourScreen() {
  const language = useAppStore((state) => state.language);
  const dictionary = getDictionary(language);

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl font-extrabold text-soil-text">
          {dictionary.nav.directory}
        </h1>
        <p className="text-xs text-soil-brown">
          Labour & machinery directory
        </p>
      </div>

      <div className="space-y-3">
        {listings.map((listing) => (
          <SurfaceCard key={listing.id}>
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-cream-tan/70">
                  <Tractor size={18} className="text-soil-brown" />
                </div>
                <div>
                  <p className="text-base font-bold">{listing.name}</p>
                  <p className="text-xs text-soil-brown">{listing.type}</p>
                </div>
              </div>
              <StatusBadge tone={listing.available ? "leaf" : "neutral"}>
                {listing.available ? "Available" : "Busy"}
              </StatusBadge>
            </div>

            <div className="mt-3 flex items-center justify-between rounded-2xl bg-cream-bg px-3 py-2">
              <div className="flex items-center gap-1.5 text-xs text-soil-brown">
                <MapPin size={14} />
                {listing.location}
              </div>
              <p className="text-sm font-semibold">{listing.rate}</p>
            </div>

            <button
              disabled={!listing.available}
              className={`mt-3 flex min-h-[56px] w-full items-center justify-center gap-2 rounded-2xl ${
                listing.available
                  ? "bg-soil-brown text-cream-card"
                  : "bg-cream-border text-soil-brown/60"
              }`}
            >
              <Phone size={18} /> Contact
            </button>
          </SurfaceCard>
        ))}
      </div>
    </div>
  );
}
