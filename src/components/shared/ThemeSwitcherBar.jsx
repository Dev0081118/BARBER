import { useState } from "react";
import { Palette, Sparkles, Building2, Crown, Compass, Check } from "lucide-react";
import { THEMES } from "../../schemas/barberSchema.js";

export default function ThemeSwitcherBar({
  currentTheme,
  onThemeChange,
  barbers,
  selectedBarberSlug,
  onBarberChange,
}) {
  const [isOpen, setIsOpen] = useState(false);

  const themeList = [
    {
      id: THEMES.NOIR_LUXURY,
      title: "Noir Luxury",
      subtitle: "Editorial Dark & Champagne Gold",
      icon: Crown,
      palette: ["#0a0a0a", "#1a1a1a", "#d4af37"],
      recommendedSlug: "next-level-barbershop",
    },
    {
      id: THEMES.MODERN_STUDIO,
      title: "Modern Studio",
      subtitle: "Northbridge Creative Neutral & Sage",
      icon: Sparkles,
      palette: ["#f4f1ea", "#1e2022", "#485340"],
      recommendedSlug: "district-nine",
    },
    {
      id: THEMES.HERITAGE_CLASSIC,
      title: "Classic Heritage",
      subtitle: "St Georges Traditional Wood & Burgundy",
      icon: Building2,
      palette: ["#2a1418", "#fcf9f2", "#bfa05d"],
      recommendedSlug: "st-george-guild",
    },
    {
      id: THEMES.JULES,
      title: "Jules Original",
      subtitle: "Hammoudi Emerald Green & Copper",
      icon: Compass,
      palette: ["#0e291b", "#000000", "#c96b3c"],
      recommendedSlug: "hammoudi-original",
    },
  ];

  return (
    <aside aria-label="Theme and Barber Switcher" className="fixed bottom-6 right-6 z-50">
      {isOpen ? (
        <div className="w-[320px] sm:w-[360px] rounded-2xl border border-neutral-700/60 bg-neutral-900/95 p-5 text-white shadow-2xl backdrop-blur-xl animate-in fade-in slide-in-from-bottom-4 duration-200">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2">
              <Palette className="h-4 w-4 text-amber-400" />
              <p className="font-helvetica text-xs font-semibold tracking-wider uppercase text-neutral-300">
                Design System Preview
              </p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-neutral-400 hover:text-white text-xs px-2 py-1 rounded border border-white/10 transition-colors"
            >
              Close
            </button>
          </div>

          {/* Theme Selector */}
          <div className="mt-4">
            <p className="text-[11px] font-medium uppercase tracking-widest text-neutral-400 mb-2">
              Select Design System
            </p>
            <div className="space-y-2">
              {themeList.map((t) => {
                const Icon = t.icon;
                const isSelected = currentTheme === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => {
                      onThemeChange(t.id);
                      if (t.recommendedSlug && onBarberChange) {
                        onBarberChange(t.recommendedSlug);
                      }
                    }}
                    className={`w-full flex items-center justify-between p-2.5 rounded-xl border text-left transition-all ${
                      isSelected
                        ? "border-amber-400/80 bg-white/10 shadow-sm"
                        : "border-white/5 bg-white/[0.02] hover:bg-white/[0.06] hover:border-white/20"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10"
                        style={{ backgroundColor: t.palette[0] }}
                      >
                        <Icon className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <p className="text-xs font-medium text-white flex items-center gap-1.5">
                          {t.title}
                          {isSelected && (
                            <span className="text-[10px] bg-amber-400/20 text-amber-300 px-1.5 py-0.5 rounded-full font-mono">
                              ACTIVE
                            </span>
                          )}
                        </p>
                        <p className="text-[10px] text-neutral-400 line-clamp-1">{t.subtitle}</p>
                      </div>
                    </div>
                    <div className="flex gap-1 shrink-0">
                      {t.palette.map((color, i) => (
                        <span
                          key={i}
                          className="h-3 w-3 rounded-full border border-black/30"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Independent Barber Profile Switcher */}
          {barbers && barbers.length > 0 && (
            <div className="mt-4 border-t border-white/10 pt-3">
              <div className="flex items-center justify-between mb-2">
                <p className="text-[11px] font-medium uppercase tracking-widest text-neutral-400">
                  Barber Data Profile
                </p>
                <Compass className="h-3.5 w-3.5 text-neutral-400" />
              </div>
              <div className="grid grid-cols-1 gap-1.5">
                {barbers.map((barber) => {
                  const isActive = selectedBarberSlug === barber.slug;
                  return (
                    <button
                      key={barber.slug}
                      onClick={() => onBarberChange(barber.slug)}
                      className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs transition-colors ${
                        isActive
                          ? "bg-amber-400 text-black font-semibold"
                          : "bg-white/5 text-neutral-300 hover:bg-white/10"
                      }`}
                    >
                      <span className="truncate">{barber.businessName}</span>
                      {isActive && <Check className="h-3 w-3 shrink-0 ml-2" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          <div className="mt-4 border-t border-white/10 pt-2 flex items-center justify-between text-[10px] text-neutral-400">
            <span>Perth Independent Barber System</span>
            <span className="font-mono text-neutral-500">v2.0 • Multi-Theme</span>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="group flex items-center gap-2.5 rounded-full border border-white/20 bg-neutral-900/90 px-4 py-2.5 text-white shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-amber-400 hover:bg-black"
        >
          <Palette className="h-4 w-4 text-amber-400 transition-transform duration-300 group-hover:rotate-45" />
          <span className="text-xs font-medium tracking-wide">
            Switch Theme / Barbers
          </span>
          <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
        </button>
      )}
    </aside>
  );
}
