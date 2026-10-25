import { useEffect, useMemo, useState } from "react";
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
  AlertCircle,
  CheckCircle2,
  TrendingUp,
  Coins,
  ShieldCheck,
} from "lucide-react";
import {
  getDictionary,
  MOCK_FARMER,
  calculateCropStageInfo,
  calculateCropEconomics,
} from "@kisaansahyog/shared";
import { useAppStore } from "../store/useAppStore";
import { SurfaceCard } from "../components/stitch/SurfaceCard";
import { StatusBadge } from "../components/stitch/StatusBadge";
import {
  fetchTelemetryWeather,
  fetchTelemetryAdvisory,
  FALLBACK_WEATHER,
  FALLBACK_ADVISORY,
  type TelemetryWeatherData,
  type TelemetryAdvisoryData,
} from "../api/apiClient";

const tasks = [
  {
    id: "irrigation",
    title: "CRI Irrigation assessment",
    subtitle: "Check soil moisture & rain probability",
    time: "06:30 AM",
    priority: "high",
  },
  {
    id: "fertilizer",
    title: "Urea split top-dress",
    subtitle: "1st dose (45 kg/acre) after CRI moisture",
    time: "10:00 AM",
    priority: "high",
  },
  {
    id: "scout",
    title: "Weed & Termite scouting",
    subtitle: "Inspect crown root rootzone (Block A)",
    time: "03:30 PM",
    priority: "medium",
  },
];

const alternatives = [
  { crop: "Mustard (Pusa Bold)", reason: "Lower water need, higher mandi modal rate", roi: "+18%" },
  { crop: "Chana (Desi)", reason: "Nitrogen-fixing, resilient to winter drought", roi: "+14%" },
];

export default function AdvisoryScreen() {
  const language = useAppStore((state) => state.language);
  const is2GMode = useAppStore((state) => state.is2GMode);
  const setVoiceOpen = useAppStore((state) => state.setVoiceOpen);
  const dictionary = getDictionary(language);

  const [weather, setWeather] = useState<TelemetryWeatherData>(FALLBACK_WEATHER);
  const [advisory, setAdvisory] = useState<TelemetryAdvisoryData>(FALLBACK_ADVISORY);
  const [loading, setLoading] = useState<boolean>(true);

  // Pure Agronomic Engine Calculations
  const stageInfo = useMemo(() => {
    return calculateCropStageInfo("Wheat", 28);
  }, []);

  const economics = useMemo(() => {
    return calculateCropEconomics("Wheat", 3.0, 19.5, 2450);
  }, []);

  useEffect(() => {
    let isMounted = true;
    async function loadTelemetry() {
      try {
        const [weatherRes, advisoryRes] = await Promise.all([
          fetchTelemetryWeather(),
          fetchTelemetryAdvisory(28),
        ]);
        if (isMounted) {
          if (weatherRes.data) setWeather(weatherRes.data);
          if (advisoryRes.data) setAdvisory(advisoryRes.data);
          setLoading(false);
        }
      } catch (err) {
        console.warn("[AdvisoryScreen] Error fetching telemetry:", err);
        if (isMounted) setLoading(false);
      }
    }

    loadTelemetry();
    return () => {
      isMounted = false;
    };
  }, []);

  const greeting = useMemo(() => {
    const hour = new Date().getHours();
    if (hour < 12) return dictionary.greetings.morning;
    if (hour < 17) return dictionary.greetings.afternoon;
    return dictionary.greetings.evening;
  }, [dictionary]);

  const weatherLabel =
    language === "hi"
      ? weather.conditionHi || weather.condition
      : weather.condition;

  return (
    <div className="space-y-4">
      {/* Top Greeting & Voice Assistant Button */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-soil-brown">{greeting}</p>
          <h1 className="text-xl font-extrabold text-soil-text">
            {dictionary.screens.advisory}
          </h1>
        </div>
        <button
          onClick={() => setVoiceOpen(true)}
          className="flex min-h-[48px] items-center gap-1.5 rounded-full bg-leaf-green px-4 text-sm font-semibold text-cream-card shadow-sm active:scale-95 transition-transform"
        >
          <Mic size={18} /> {dictionary.common.voiceAssistant}
        </button>
      </div>

      {/* Main Weather & Active Crop SurfaceCard */}
      <SurfaceCard className="relative overflow-hidden">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2">
              <StatusBadge tone={weather.source === "live" ? "leaf" : "gold"}>
                {weather.source === "live" ? "Live Telemetry" : "Offline Data"}
              </StatusBadge>
              {loading && <span className="text-[10px] text-soil-brown animate-pulse">Syncing...</span>}
            </div>
            <h2 className="mt-2 text-lg font-bold">{MOCK_FARMER.activeCrop}</h2>
            <p className="text-xs text-soil-brown">
              {MOCK_FARMER.location} • {MOCK_FARMER.land}
            </p>
          </div>
          <div className="text-right">
            <p className="text-3xl font-extrabold">{weather.temp}°C</p>
            <p className="text-xs font-medium text-soil-brown">{weatherLabel}</p>
            <p className="text-[10px] text-soil-brown/80">
              Min {weather.tempMin}° / Max {weather.tempMax}°
            </p>
          </div>
        </div>

        {/* 4 Telemetry Metrics */}
        <div className="mt-4 grid grid-cols-4 gap-2">
          {[
            {
              icon: ThermometerSun,
              label: "Feels Like",
              value: `${weather.feelsLike ?? weather.temp}°C`,
            },
            {
              icon: Droplets,
              label: "Humidity",
              value: `${weather.humidity}%`,
            },
            {
              icon: Wind,
              label: "Wind Speed",
              value: `${weather.windSpeed ?? 14} km/h`,
            },
            {
              icon: CloudDrizzle,
              label: "Rain Prob.",
              value: `${weather.rainProbability}%`,
            },
          ].map((item) => (
            <div
              key={item.label}
              className="flex flex-col items-center rounded-2xl bg-cream-bg py-2 text-center"
            >
              <item.icon size={16} className="text-leaf-green" />
              <p className="mt-1 text-[11px] text-soil-brown">{item.label}</p>
              <p className="text-sm font-bold text-soil-text">{item.value}</p>
            </div>
          ))}
        </div>

        {/* Dynamic Stage-Specific CRI Irrigation Advisory Card */}
        <div
          className={`mt-4 rounded-2xl p-3.5 transition-colors border ${
            advisory.action === "postpone"
              ? "bg-harvest-gold/15 border-harvest-gold/30 text-soil-deep"
              : advisory.action === "irrigate"
                ? "bg-leaf-soft border-leaf-deep/20 text-leaf-deep"
                : "bg-cream-tan/50 border-cream-border text-soil-text"
          }`}
        >
          <div className="flex items-start gap-2.5">
            {advisory.action === "postpone" ? (
              <AlertCircle size={20} className="mt-0.5 text-harvest-gold shrink-0" />
            ) : (
              <Leaf size={20} className="mt-0.5 text-leaf-deep shrink-0" />
            )}
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <p className="text-sm font-bold">
                  {language === "hi" ? advisory.headlineHi : advisory.headline}
                </p>
                {advisory.dieselSavingsAmount > 0 && (
                  <StatusBadge tone="gold">
                    {language === "hi" ? advisory.savingsNoteHi : advisory.savingsNote}
                  </StatusBadge>
                )}
              </div>
              <p className="mt-1 text-xs leading-relaxed text-soil-brown">
                {language === "hi" ? advisory.advisoryTextHi : advisory.advisoryText}
              </p>
              <div className="mt-2 flex items-center justify-between text-[11px] font-medium text-soil-brown">
                <span>अवस्था: {advisory.stageHi || advisory.stage}</span>
                <span>अनुशंसा: {advisory.recommendedDate}</span>
              </div>
            </div>
          </div>
        </div>
      </SurfaceCard>

      {/* Phenology & Crop Growth Timeline Card */}
      <SurfaceCard>
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-1.5">
              <Sprout size={16} className="text-leaf-green" />
              <h2 className="text-base font-bold text-soil-text">
                Crop Growth Timeline (फसल विकास चक्र)
              </h2>
            </div>
            <p className="text-xs text-soil-brown mt-0.5">
              Day {stageInfo.daysSinceSowing} of {stageInfo.totalDurationDays} ({stageInfo.stageProgressPercent}% completed)
            </p>
          </div>
          <StatusBadge tone={stageInfo.isCriticalStage ? "gold" : "leaf"}>
            {stageInfo.waterRequirement === "high" ? "High Water Need" : "Medium Water"}
          </StatusBadge>
        </div>

        {/* Progress Bar */}
        <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-cream-bg border border-cream-border">
          <div
            className="h-full rounded-full bg-leaf-green transition-all duration-700"
            style={{ width: `${stageInfo.stageProgressPercent}%` }}
          />
        </div>

        {/* Timeline Stage Indicators */}
        <div className="mt-4 flex items-center justify-between overflow-x-auto pb-1">
          {stageInfo.timeline.map((item, idx) => (
            <div key={item.stageName} className="flex flex-1 items-center min-w-[50px]">
              <div className="flex flex-col items-center gap-1">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full transition-all ${
                    item.current
                      ? "bg-leaf-green text-cream-card ring-2 ring-leaf-deep/40 scale-105 shadow-sm"
                      : item.completed
                        ? "bg-leaf-soft text-leaf-deep"
                        : "bg-cream-bg text-soil-brown/60 border border-cream-border"
                  }`}
                >
                  {item.completed ? (
                    <CheckCircle2 size={15} />
                  ) : (
                    <Flower2 size={14} />
                  )}
                </div>
                <p className="text-[9px] text-center text-soil-brown max-w-[55px] truncate font-medium">
                  {language === "hi"
                    ? item.stageNameHi.split(" ")[0]
                    : item.stageName.split(" ")[0]}
                </p>
              </div>
              {idx < stageInfo.timeline.length - 1 && (
                <div
                  className={`mx-0.5 h-0.5 flex-1 ${
                    item.completed ? "bg-leaf-green" : "bg-cream-border"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Critical Action Banner */}
        <div className="mt-3 rounded-xl bg-cream-bg p-2.5 border border-cream-border flex items-start gap-2">
          <ShieldCheck size={16} className="text-leaf-green shrink-0 mt-0.5" />
          <p className="text-xs text-soil-brown">
            <span className="font-bold text-soil-text">
              {language === "hi" ? "वर्तमान कार्य:" : "Current Action:"}
            </span>{" "}
            {language === "hi" ? stageInfo.criticalActionHi : stageInfo.criticalAction}
          </p>
        </div>
      </SurfaceCard>

      {/* Farm Economics & Gross Margin Forecast Card */}
      <SurfaceCard className="border border-leaf-deep/15">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Coins size={18} className="text-harvest-gold" />
            <h2 className="text-base font-bold text-soil-text">
              Harvest Economics Forecast (आय व लागत अनुमान)
            </h2>
          </div>
          <StatusBadge tone="leaf">
            +{economics.profitMarginPercent}% Net Margin
          </StatusBadge>
        </div>
        <p className="text-xs text-soil-brown mt-0.5">
          Based on 3 Acres Wheat HD-2967 @ ₹2,450/Q benchmark mandi rate
        </p>

        <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-2">
          <div className="rounded-2xl bg-cream-bg p-2.5">
            <p className="text-[10px] text-soil-brown font-medium">Est. Yield (उपज)</p>
            <p className="text-base font-black text-soil-text mt-0.5">
              {economics.totalEstimatedYieldQuintals} Q
            </p>
            <span className="text-[9px] text-leaf-deep">~19.5 Q/Acre</span>
          </div>

          <div className="rounded-2xl bg-cream-bg p-2.5">
            <p className="text-[10px] text-soil-brown font-medium">Gross Revenue (सकल आय)</p>
            <p className="text-base font-black text-leaf-deep mt-0.5">
              ₹{economics.grossRevenue.toLocaleString("en-IN")}
            </p>
            <span className="text-[9px] text-soil-brown">@ ₹2,450/Q</span>
          </div>

          <div className="rounded-2xl bg-cream-bg p-2.5">
            <p className="text-[10px] text-soil-brown font-medium">Input Cost (लागत)</p>
            <p className="text-base font-black text-clay-red mt-0.5">
              ₹{economics.totalInputCost.toLocaleString("en-IN")}
            </p>
            <span className="text-[9px] text-soil-brown">₹{economics.costPerQuintal}/Q cost</span>
          </div>

          <div className="rounded-2xl bg-leaf-soft p-2.5">
            <p className="text-[10px] text-leaf-deep font-semibold">Net Profit (शुद्ध लाभ)</p>
            <p className="text-base font-black text-leaf-deep mt-0.5">
              ₹{economics.netProfit.toLocaleString("en-IN")}
            </p>
            <div className="flex items-center gap-0.5 text-[9px] text-leaf-deep font-bold">
              <TrendingUp size={11} /> +{economics.profitMarginPercent}% ROI
            </div>
          </div>
        </div>
      </SurfaceCard>

      {/* Today's Tasks */}
      <SurfaceCard>
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold">Today's tasks (CRI Stage)</h2>
          <StatusBadge tone="neutral">{tasks.length} active</StatusBadge>
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

      {/* Alternative Crops */}
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
