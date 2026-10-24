import { Mic, X } from "lucide-react";
import { getDictionary } from "@kisaansahyog/shared";
import { useAppStore } from "../../store/useAppStore";

export function VoiceSheet() {
  const language = useAppStore((state) => state.language);
  const isVoiceOpen = useAppStore((state) => state.isVoiceOpen);
  const setVoiceOpen = useAppStore((state) => state.setVoiceOpen);

  if (!isVoiceOpen) {
    return null;
  }

  const dictionary = getDictionary(language);

  return (
    <div
      role="presentation"
      onClick={() => setVoiceOpen(false)}
      className="fixed inset-0 z-40 flex items-end justify-center bg-soil-deep/45"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="voice-sheet-title"
        onClick={(event) => event.stopPropagation()}
        className="w-full max-w-md rounded-t-[2rem] border border-cream-border bg-cream-card p-5 pb-8 shadow-sheet"
      >
        <div className="mx-auto h-1 w-10 rounded-full bg-cream-border" />

        <div className="mt-4 flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-leaf-soft text-leaf-deep">
              <Mic size={21} aria-hidden="true" />
            </span>
            <div>
              <h2 id="voice-sheet-title" className="text-lg font-bold">
                {dictionary.screens.voice}
              </h2>
              <p className="text-xs text-soil-brown">{dictionary.app.name}</p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setVoiceOpen(false)}
            aria-label={dictionary.common.close}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-cream-bg text-soil-brown transition hover:bg-cream-tan"
          >
            <X size={18} aria-hidden="true" />
          </button>
        </div>

        <p className="mt-4 text-sm leading-relaxed text-soil-brown">
          {dictionary.scaffold.voiceBody}
        </p>

        <div className="mt-5 flex items-center gap-2 rounded-2xl bg-cream-bg p-3 text-xs text-soil-brown">
          <span className="h-2 w-2 animate-pulse rounded-full bg-leaf-green" />
          {dictionary.common.voiceAssistant} · {language === "hi" ? "हिंदी" : "English"}
        </div>

        <button
          type="button"
          onClick={() => setVoiceOpen(false)}
          className="mt-4 w-full rounded-2xl bg-leaf-green px-4 py-3 text-sm font-semibold text-cream-card transition hover:bg-leaf-deep"
        >
          {dictionary.common.close}
        </button>
      </div>
    </div>
  );
}
