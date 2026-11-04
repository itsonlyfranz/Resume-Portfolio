"use client";
import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";
const subscribe = () => () => {};
export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
  return (
    <div className="theme-options" role="group" aria-label="Color theme">
      {["system", "light", "dark"].map((value) => (
        <button
          key={value}
          aria-pressed={mounted && theme === value}
          onClick={() => setTheme(value)}
        >
          {value}
        </button>
      ))}
    </div>
  );
}
