import { useEffect, useRef, useState } from "react";
import { PartyPopper } from "lucide-react";

const PYCON_URL = "https://cm.pycon.org";
const EVENT_START = new Date("2026-09-17T00:00:00+01:00");

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const getTimeLeft = (): TimeLeft => {
  const diff = Math.max(0, EVENT_START.getTime() - Date.now());
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
};

const TimeUnit = ({ value, label }: { value: number; label: string }) => (
  <div className="flex flex-col items-center leading-none">
    <span className="text-sm sm:text-base font-bold tabular-nums">
      {String(value).padStart(2, "0")}
    </span>
    <span className="text-[11px] sm:text-xs uppercase tracking-wide opacity-80">
      {label}
    </span>
  </div>
);

export const PyConBanner = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(getTimeLeft);

  useEffect(() => {
    const interval = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(interval);
  }, []);

  const visible = Date.now() < EVENT_START.getTime();

  useEffect(() => {
    const el = rootRef.current;
    if (!visible || !el) {
      document.documentElement.style.setProperty("--pycon-banner-height", "0px");
      return;
    }

    const updateHeight = () =>
      document.documentElement.style.setProperty(
        "--pycon-banner-height",
        `${el.offsetHeight}px`
      );

    updateHeight();
    const observer = new ResizeObserver(updateHeight);
    observer.observe(el);

    return () => {
      observer.disconnect();
      document.documentElement.style.setProperty("--pycon-banner-height", "0px");
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      ref={rootRef}
      className="relative w-full bg-gradient-to-r from-primary to-secondary text-white dark:text-black"
    >
      <a
        href={PYCON_URL}
        target="_blank"
        rel="noreferrer noopener"
        className="container flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 py-2 text-xs sm:text-sm hover:opacity-90 transition-opacity"
      >
        <span className="flex items-center gap-1.5 font-semibold whitespace-nowrap">
          <PartyPopper className="h-4 w-4" />
          PyCon Cameroon 2026 · Sept 17–19
        </span>

        <div className="flex items-center gap-2 sm:gap-3">
          <TimeUnit value={timeLeft.days} label="days" />
          <span className="opacity-60">:</span>
          <TimeUnit value={timeLeft.hours} label="hrs" />
          <span className="opacity-60">:</span>
          <TimeUnit value={timeLeft.minutes} label="min" />
          <span className="opacity-60">:</span>
          <TimeUnit value={timeLeft.seconds} label="sec" />
        </div>

        <span className="rounded-full bg-white/20 px-3 py-1 font-medium whitespace-nowrap">
          Learn more →
        </span>
      </a>
    </div>
  );
};
