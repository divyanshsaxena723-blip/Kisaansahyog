import { Activity, Droplet, FlaskConical, Gauge, Leaf, Thermometer } from "lucide-react";
import { getDictionary } from "@kisaansahyog/shared";
import { useAppStore } from "../store/useAppStore";
import { SurfaceCard } from "../components/stitch/SurfaceCard";
import { StatusBadge } from "../components/stitch/StatusBadge";

const gauges = [
  {
    label: "Moisture",
    value: 38,
    unit: "%",
    icon: Droplet,
    tone: "leaf" as const,
    status: "Adequate",
  },
  {
    label: "Temperature",
    value: 26,
    unit: "°C",
    icon: Thermometer,
    tone: "gold" as const,
    status: "Optimal",
  },
  {
    label: "pH",
    value: 6.8,
    unit: "",
    icon: FlaskConical,
    tone: "leaf" as const,
    status: "Slightly acidic",
  },
  {
    label: "NPK",
    value: 72,
    unit: "%",
    icon: Activity,
    tone: "gold" as const,
    status: "Balanced",
  },
];

export default function SoilScreen() {
  const language = useAppStore((state) => state.language);
  const dictionary = getDictionary(language);

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl font-extrabold text-soil-text">
          {dictionary.screens.soil}
        </h1>
        <p className="text-xs text-soil-brown">IoT telemetry • Field #2 • Ludhiana</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {gauges.map((gauge) => (
          <SurfaceCard key={gauge.label} className="p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <gauge.icon size={16} className="text-leaf-green" />
                <p className="text-sm font-semibold">{gauge.label}</p>
              </div>
              <StatusBadge tone={gauge.tone}>{gauge.status}</StatusBadge>
            </div>
            <div className="mt-3 flex items-end justify-between">
              <p className="text-3xl font-extrabold">
                {gauge.value}
                <span className="ml-1 text-lg text-soil-brown">
                  {gauge.unit}
                </span>
              </p>
              <Gauge size={22} className="text-cream-border" />
            </div>
            <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-cream-bg">
              <div
                className="h-full rounded-full bg-leaf-green"
                style={{ width: `${Math.min(gauge.value, 100)}%` }}
              />
            </div>
          </SurfaceCard>
        ))}
      </div>

      <SurfaceCard>
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold">Soil Health Card</h2>
          <Leaf size={18} className="text-leaf-green" />
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2">
          {[
            { key: "Organic Carbon", value: "0.58%" },
            { key: "Available N", value: "245 kg/ha" },
            { key: "Available P", value: "18 kg/ha" },
            { key: "Available K", value: "286 kg/ha" },
            { key: "EC", value: "0.24 dS/m" },
            { key: "Zn", value: "0.62 ppm" },
          ].map((item) => (
            <div
              key={item.key}
              className="flex min-h-[48px] items-center justify-between rounded-2xl bg-cream-bg px-3 py-2"
            >
              <p className="text-xs text-soil-brown">{item.key}</p>
              <p className="text-sm font-semibold">{item.value}</p>
            </div>
          ))}
        </div>
        <p className="mt-3 text-xs leading-relaxed text-soil-brown">
          Recommendations: Apply FYM 10t/ha, balance P based on crop need.
          Follow KVK advice for micronutrient application.
        </p>
      </SurfaceCard>
    </div>
  );
}
