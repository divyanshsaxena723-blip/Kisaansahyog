import { ArrowLeftRight, Languages, Sprout, UserRound, Wifi, WifiOff } from "lucide-react";
import { getDictionary } from "@kisaansahyog/shared";
import { useAppStore } from "../../store/useAppStore";

function getGreetingKey(): "morning" | "afternoon" | "evening" {
  const hour = new Date().getHours();

  if (hour < 12) {
    return "morning";
  }

  if (hour < 17) {
    return "afternoon";
  }

  return "evening";
}

export function TopBar() {
  const language = useAppStore((state) => state.language);
  const role = useAppStore((state) => state.role);
  const is2GMode = useAppStore((state) => state.is2GMode);
  const toggleLanguage = useAppStore((state) => state.toggleLanguage);
  const toggleRole = useAppStore((state) => state.toggleRole);
  const toggle2GMode = useAppStore((state) => state.toggle2GMode);

  const dictionary = getDictionary(language);
  const greeting = dictionary.greetings[getGreetingKey()];

  return (
    <header className="sticky top-0 z-20 border-b border-cream-border bg-cream-bg/95 px-4 pb-3 pt-4 backdrop-blur">
      <div className="flex items-center justify-between gap-2">
        <div className="flex min-w-0 items-center gap-2.5">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-leaf-green text-cream-card shadow-sm">
            <Sprout size={21} aria-hidden="true" />
          </span>
          <div className="min-w-0">
            <p className="truncate text-base font-extrabold leading-tight text-soil-text">
              {dictionary.app.name}
            </p>
            <p className="truncate text-[11px] leading-tight text-soil-brown">
              {dictionary.app.tagline}
            </p>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-1.5">
          <button
            type="button"
            onClick={toggle2GMode}
            aria-pressed={is2GMode}
            aria-label={`${dictionary.common.twoGMode}: ${
              is2GMode ? dictionary.common.enabled : dictionary.common.disabled
            }`}
            className={`inline-flex min-h-9 items-center gap-1 rounded-full border px-2.5 text-[10px] font-bold transition ${
              is2GMode
                ? "border-harvest-gold/50 bg-harvest-gold/15 text-soil-brown"
                : "border-cream-border bg-cream-card text-soil-brown"
            }`}
          >
            {is2GMode ? (
              <WifiOff size={13} aria-hidden="true" />
            ) : (
              <Wifi size={13} aria-hidden="true" />
            )}
            2G
          </button>

          <button
            type="button"
            onClick={toggleLanguage}
            aria-label={dictionary.common.changeLanguage}
            className="inline-flex min-h-9 items-center gap-1 rounded-full border border-cream-border bg-cream-card px-2.5 text-[11px] font-semibold text-soil-brown transition hover:bg-cream-tan/60"
          >
            <Languages size={14} aria-hidden="true" />
            {language === "hi" ? "EN" : "हिं"}
          </button>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-soil-text">{greeting}</p>
          <p className="truncate text-[11px] text-soil-brown">
            {is2GMode ? dictionary.common.dataSaver : dictionary.common.online}
          </p>
        </div>

        <button
          type="button"
          onClick={toggleRole}
          aria-label={`${dictionary.common.switchRole}: ${dictionary.roles[role]}`}
          className="inline-flex min-h-9 shrink-0 items-center gap-1.5 rounded-full border border-leaf-green/25 bg-leaf-soft px-3 text-xs font-semibold text-leaf-deep transition hover:bg-leaf-soft/70"
        >
          <UserRound size={14} aria-hidden="true" />
          {dictionary.roles[role]}
          <ArrowLeftRight size={12} aria-hidden="true" />
        </button>
      </div>
    </header>
  );
}
