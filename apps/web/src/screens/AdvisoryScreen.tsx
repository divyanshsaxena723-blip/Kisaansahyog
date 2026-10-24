import { useMemo } from "react";
import {
  ArrowRight,
  CloudDrizzle,
  Droplets,
  Flower2,
  Leaf,
  Mic,
  Sprout,
  ThermometerSun,
  Volume2,
  Wind,
} from "lucide-react";
import { getDictionary } from "@kisaansahyog/shared";
import { useAppStore } from "../store/useAppStore";
import { SurfaceCard } from "../components/stitch/SurfaceCard";
import { StatusBadge } from "../components/stitch/StatusBadge";

const tasks = [
  {
    id: "irrigation",
    title: "Irrigation window",
    subtitle: "Drip check for Block A",
    time: "06:00 AM",
    priority: "high",
  },
  {
    id: "scout",
    title: "Pest scouting",
    subtitle: "Aphids in mustard patch",
    time: "10:30 AM",
    priority: "medium",
  },
  {
    id: "fertilizer",
    title: "Fertilizer split",
    subtitle: "Urea top-dress readiness",
    time: "03:00 PM",
    priority: "medium",
  },
];

const timeline = [
  { stage: "Germination", done: true },
  { stage: "Tillering", done: true },
  { stage: "CRI", done: false, active: true },
  { stage: "Booting", done: false },
  { stage: "Flowering", done: false },
];

const alternatives = [
  { crop: "Mustard", reason: "Better price outlook", roi: "+12%" },
  { crop: "Chickpea", reason: "Less water required", roi: "+9%" },
];

export default function AdvisoryScreen() {
  const language = useAppStore((state) => state.language);
  const is2GMode = useAppStore((state) => state.is2GMode);
  const setVoiceOpen = useAppStore((state) => state.setVoiceOpen);
  const dictionary = getDictionary(language);

  const greeting = useMemo(() => {
    const hour = new Date().getHours();
    if (hour < 12) return dictionary.greetings.morning;
    if (hour < 17) return dictionary.greetings.afternoon;
    return dictionary.greetings.evening;
  }, [dictionary]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-soil-brown">{greeting}</p>
          <h1 className="text-xl font-extrabold text-soil-text">
            {dictionary.screens.advisory}
          </h1>
        </div>
        <button
          onClick={() => setVoiceOpen(true)}
          className="flex min-h-[48px] items-center gap-1.5 rounded-full bg-leaf-green px-4 text-sm font-semibold text-cream-card"
        >
          <Mic size={18} /> {dictionary.common.voiceAssistant}
        </button>
      </div>

      <SurfaceCard className="relative overflow-hidden">
        <div className="flex items-start justify-between">
          <div>
            <StatusBadge tone="gold">Live advisory</StatusBadge>
            <h2 className="mt-2 text-lg font-bold">Wheat • PBW 824</h2>
            <p className="text-xs text-soil-brown">Ludhiana • Block A • 8.5 acres</p>
          </div>
          <div className="text-right">
            <p className="text-3xl font-extrabold">29°C</p>
            <p className="text-xs text-soil-brown">Partly cloudy</p>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-4 gap-2">
          {[
            { icon: ThermometerSun, label: "Feels", value: "31°C" },
            { icon: Droplets, label: "Humidity", value: "58%" },
            { icon: Wind, label: "Wind", value: "14 km/h" },
            { icon: CloudDrizzle, label: "Rain", value: "0%" },
          ].map((item) => (
            <div
              key={item.label}
              className="flex flex-col items-center rounded-2xl bg-cream-bg py-2 text-center"
            >
              <item.icon size={16} className="text-leaf-green" />
              <p className="mt-1 text-xs text-soil-brown">{item.label}</p>
              <p className="text-sm font-semibold">{item.value}</p>
            </div>
          ))}
        </div>

        <div className="mt-4 flex items-start gap-2 rounded-2xl bg-leaf-soft p-3">
          <Leaf size={18} className="mt-0.5 text-leaf-deep" />
          <div>
            <p className="text-sm font-semibold text-leaf-deep">
              CRI stage advisory
            </p>
            <p className="mt-1 text-xs leading-relaxed text-soil-brown">
              Ensure irrigation at Crown Root Initiation. Check soil moisture at
              10cm depth before watering.
            </p>
          </div>
        </div>
      </SurfaceCard>

      <SurfaceCard>
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold">Today's tasks (CRI)</h2>
          <StatusBadge tone="neutral">{tasks.length} tasks</StatusBadge>
        </div>
        <div className="mt-3 space-y-2">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="flex min-h-[56px] items-center justify-between rounded-2xl border border-cream-border bg-cream-bg/60 px-3 py-2"
            >
              <div className="flex items-center gap-2">
                <Sprout size={18} className="text-leaf-green" />
                <div>
                  <p className="text-sm font-semibold">{task.title}</p>
                  <p className="text-xs text-soil-brown">{task.subtitle}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs font-semibold">{task.time}</p>
                <p className="text-[10px] uppercase tracking-wide text-soil-brown">
                  {task.priority}
                </p>
              </div>
            </div>
          ))}
        </div>
      </SurfaceCard>

      <SurfaceCard>
        <h2 className="text-base font-bold">Growth stage timeline</h2>
        <div className="mt-3 flex items-center justify-between">
          {timeline.map((item, idx) => (
            <div key={item.stage} className="flex flex-1 items-center">
              <div className="flex flex-col items-center gap-1">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full ${
                    item.active
                      ? "bg-leaf-green text-cream-card"
                      : item.done
                        ? "bg-leaf-soft text-leaf-deep"
                        : "bg-cream-bg text-soil-brown"
                  }`}
                >
                  <Flower2 size={14} />
                </div>
                <p className="text-[10px] text-soil-brown">{item.stage}</p>
              </div>
              {idx < timeline.length - 1 && (
                <div className="mx-1 h-px flex-1 bg-cream-border" />
              )}
            </div>
          ))}
        </div>
      </SurfaceCard>

      <SurfaceCard>
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold">Alternative crops to consider</h2>
          <ArrowRight size={16} className="text-leaf-green" />
        </div>
        <div className="mt-2 space-y-2">
          {alternatives.map((alt) => (
            <div
              key={alt.crop}
              className="flex min-h-[56px] items-center justify-between rounded-2xl border border-cream-border px-3 py-2"
            >
              <div>
                <p className="text-sm font-semibold">{alt.crop}</p>
                <p className="text-xs text-soil-brown">{alt.reason}</p>
              </div>
              <StatusBadge tone="leaf">Est. ROI {alt.roi}</StatusBadge>
            </div>
          ))}
        </div>
      </SurfaceCard>

      {is2GMode && (
        <div className="flex items-center gap-2 rounded-2xl bg-cream-tan/60 px-3 py-2 text-xs text-soil-brown">
          <Volume2 size={14} /> 2G mode active — data-light advisory view
        </div>
      )}
    </div>
  );
}
