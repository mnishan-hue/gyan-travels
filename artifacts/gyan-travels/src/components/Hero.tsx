import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, ArrowRightLeft, Search, Users, Check, ChevronLeft, ChevronRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const CITIES = [
  "Bangalore", "Chennai", "Coimbatore", "Delhi", "Goa",
  "Hyderabad", "Jaipur", "Kochi", "Mumbai", "Mysore", "Pune"
];

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const MONTH_FULL = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const DAYS_OF_WEEK = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function CustomCalendar({ value, onChange, onClose }: { value: Date; onChange: (d: Date) => void; onClose: () => void }) {
  const today = new Date();
  const [viewYear, setViewYear] = useState(value.getFullYear());
  const [viewMonth, setViewMonth] = useState(value.getMonth());

  const firstDayOfMonth = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = getDaysInMonth(viewYear, viewMonth);

  const prevMonth = () => { if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); } else setViewMonth(m => m - 1); };
  const nextMonth = () => { if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); } else setViewMonth(m => m + 1); };

  const isToday = (d: number) => d === today.getDate() && viewMonth === today.getMonth() && viewYear === today.getFullYear();
  const isSelected = (d: number) => d === value.getDate() && viewMonth === value.getMonth() && viewYear === value.getFullYear();
  const isPast = (d: number) => new Date(viewYear, viewMonth, d) < new Date(today.getFullYear(), today.getMonth(), today.getDate());

  const cells: (number | null)[] = [];
  for (let i = 0; i < firstDayOfMonth; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 8, scale: 0.97 }}
      className="absolute top-full left-0 mt-2 rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
      style={{ background: "#111827", minWidth: "280px", zIndex: 9999 }}
    >
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
        <button onClick={prevMonth} className="w-8 h-8 rounded-lg flex items-center justify-center text-white/60 hover:text-primary hover:bg-white/5 transition-all">
          <ChevronLeft size={16} />
        </button>
        <span className="text-white font-bold text-sm tracking-wide">{MONTH_FULL[viewMonth]} {viewYear}</span>
        <button onClick={nextMonth} className="w-8 h-8 rounded-lg flex items-center justify-center text-white/60 hover:text-primary hover:bg-white/5 transition-all">
          <ChevronRight size={16} />
        </button>
      </div>
      <div className="grid grid-cols-7 px-3 pt-3 pb-1 gap-1">
        {DAYS_OF_WEEK.map(d => <div key={d} className="text-center text-[10px] font-bold text-white/30 uppercase">{d}</div>)}
      </div>
      <div className="grid grid-cols-7 px-3 pb-3 gap-1">
        {cells.map((d, i) => (
          <div key={i} className="aspect-square">
            {d !== null && (
              <button
                onClick={() => { onChange(new Date(viewYear, viewMonth, d)); onClose(); }}
                disabled={isPast(d)}
                className={`w-full h-full rounded-lg text-xs font-semibold flex items-center justify-center transition-all
                  ${isSelected(d) ? "bg-primary text-black font-black" : ""}
                  ${isToday(d) && !isSelected(d) ? "border border-primary/50 text-primary" : ""}
                  ${!isSelected(d) && !isPast(d) ? "text-white/80 hover:bg-white/10" : ""}
                  ${isPast(d) ? "text-white/20 cursor-not-allowed" : ""}
                `}
              >{d}</button>
            )}
          </div>
        ))}
      </div>
      <div className="flex gap-2 px-3 pb-3">
        {[
          { label: "Today", date: today },
          { label: "Tomorrow", date: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1) },
          { label: "+2 Days", date: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 2) },
        ].map(({ label, date }) => (
          <button key={label} onClick={() => { onChange(date); onClose(); }}
            className="flex-1 py-1.5 rounded-lg bg-white/5 text-white/60 hover:bg-primary/20 hover:text-primary text-[10px] font-bold uppercase tracking-wide transition-all border border-white/5 hover:border-primary/30"
          >{label}</button>
        ))}
      </div>
    </motion.div>
  );
}

export function Hero() {
  const { toast } = useToast();
  const today = new Date();

  const [fromCity, setFromCity] = useState("Bangalore");
  const [toCity, setToCity] = useState("Kochi");
  const [date, setDate] = useState(today);
  const [passengers, setPassengers] = useState("1");
  const [fromOpen, setFromOpen] = useState(false);
  const [toOpen, setToOpen] = useState(false);
  const [calOpen, setCalOpen] = useState(false);

  const widgetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (widgetRef.current && !widgetRef.current.contains(e.target as Node)) {
        setFromOpen(false); setToOpen(false); setCalOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSwap = () => { const t = fromCity; setFromCity(toCity); setToCity(t); };

  const handleSearch = () => {
    toast({ title: "Coming Soon!", description: "GYAN TRAVELS is launching soon. Join the waitlist below!" });
    document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth" });
  };

  const formattedDate = `${String(date.getDate()).padStart(2, "0")} ${MONTHS[date.getMonth()]} ${date.getFullYear()}`;

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center pt-36 md:pt-40 pb-12">
      {/* Background — its own overflow-hidden so it doesn't clip the dropdowns */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=1920&q=80")',
            animation: "heroPulse 20s ease-in-out infinite",
            transform: "scale(1.05)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a1128]/80 via-[#0a1128]/60 to-[#0a1128]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(234,179,8,0.15),transparent_50%)]" />

      </div>

      <div className="container relative z-10 mx-auto px-4 flex flex-col items-center text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-5xl md:text-7xl lg:text-8xl font-black leading-[0.9] tracking-tighter text-white mb-6 max-w-5xl"
        >
          India's{" "}<span className="text-gradient-gold">Smartest Way</span>
          <br className="hidden md:block" />{" "}to Travel.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-lg md:text-xl text-white/80 font-light max-w-2xl mb-6"
        >
          Experience next-generation luxury road transport. Premium sleeper coaches, real-time tracking, and unmatched comfort.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="h-px w-24 mb-5"
          style={{ background: "linear-gradient(90deg, transparent, hsl(43,96%,58%), transparent)" }}
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-primary font-medium tracking-[0.2em] uppercase text-xs animate-pulse mb-12"
        >
          Don't worry when you travel with GT
        </motion.p>

        {/* Booking Widget */}
        <motion.div
          ref={widgetRef}
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", bounce: 0.35, duration: 1, delay: 0.4 }}
          className="w-full max-w-5xl glass-panel rounded-[2rem] p-6 md:p-8"
          style={{ position: "relative" }}
        >
          <div className="flex flex-col lg:flex-row gap-3 lg:gap-2 items-stretch">

            {/* FROM */}
            <div className="flex-1 lg:flex-[2]" style={{ position: "relative" }}>
              <button
                onClick={() => { setFromOpen(v => !v); setToOpen(false); setCalOpen(false); }}
                className="w-full h-14 rounded-xl glass-input text-white flex items-center pl-11 pr-4 hover:bg-white/10 transition-colors"
              >
                <div className="flex flex-col items-start min-w-0">
                  <span className="text-[9px] text-white/50 uppercase tracking-widest leading-none mb-0.5">Leaving from</span>
                  <span className="font-semibold text-sm truncate">{fromCity}</span>
                </div>
              </button>
              <MapPin className="absolute left-4 top-[50%] -translate-y-1/2 text-primary pointer-events-none" size={16} style={{ top: "27px" }} />

              <AnimatePresence>
                {fromOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    className="absolute left-0 right-0 mt-2 rounded-2xl overflow-auto border border-white/10 shadow-2xl"
                    style={{ top: "100%", background: "#1a2235", zIndex: 9999, maxHeight: "260px" }}
                  >
                    {CITIES.map(c => (
                      <button key={c} onClick={() => { setFromCity(c); setFromOpen(false); }}
                        className="w-full text-left px-4 py-3 text-sm text-white hover:bg-primary/20 transition-colors flex items-center justify-between border-b border-white/5 last:border-0"
                      >
                        <span>{c}</span>
                        {c === fromCity && <Check size={13} className="text-primary" />}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* SWAP */}
            <button onClick={handleSwap} className="hidden lg:flex w-10 h-14 items-center justify-center text-primary hover:text-primary/70 transition-all shrink-0 rounded-lg hover:bg-white/5">
              <ArrowRightLeft size={16} />
            </button>
            <button onClick={handleSwap} className="lg:hidden self-center w-10 h-10 rounded-full flex items-center justify-center text-primary" style={{ background: "#1a2235" }}>
              <ArrowRightLeft size={16} className="rotate-90" />
            </button>

            {/* TO */}
            <div className="flex-1 lg:flex-[2]" style={{ position: "relative" }}>
              <button
                onClick={() => { setToOpen(v => !v); setFromOpen(false); setCalOpen(false); }}
                className="w-full h-14 rounded-xl glass-input text-white flex items-center pl-11 pr-4 hover:bg-white/10 transition-colors"
              >
                <div className="flex flex-col items-start min-w-0">
                  <span className="text-[9px] text-white/50 uppercase tracking-widest leading-none mb-0.5">Going to</span>
                  <span className="font-semibold text-sm truncate">{toCity}</span>
                </div>
              </button>
              <MapPin className="absolute left-4 text-primary pointer-events-none" size={16} style={{ top: "27px" }} />

              <AnimatePresence>
                {toOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    className="absolute left-0 right-0 mt-2 rounded-2xl overflow-auto border border-white/10 shadow-2xl"
                    style={{ top: "100%", background: "#1a2235", zIndex: 9999, maxHeight: "260px" }}
                  >
                    {CITIES.map(c => (
                      <button key={c} onClick={() => { setToCity(c); setToOpen(false); }}
                        className="w-full text-left px-4 py-3 text-sm text-white hover:bg-primary/20 transition-colors flex items-center justify-between border-b border-white/5 last:border-0"
                      >
                        <span>{c}</span>
                        {c === toCity && <Check size={13} className="text-primary" />}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* DATE */}
            <div className="flex-1 lg:flex-[2]" style={{ position: "relative" }}>
              <button
                onClick={() => { setCalOpen(v => !v); setFromOpen(false); setToOpen(false); }}
                className="w-full h-14 rounded-xl glass-input text-white flex items-center pl-11 pr-4 hover:bg-white/10 transition-colors"
              >
                <div className="flex flex-col items-start min-w-0">
                  <span className="text-[9px] text-white/50 uppercase tracking-widest leading-none mb-0.5">Date of Journey</span>
                  <span className="font-semibold text-sm text-primary">{formattedDate}</span>
                </div>
              </button>
              <div className="absolute left-4 pointer-events-none" style={{ top: "27px", transform: "translateY(-50%)" }}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <rect x="1" y="2.5" width="14" height="12.5" rx="2.5" stroke="hsl(43,96%,58%)" strokeWidth="1.5"/>
                  <line x1="1" y1="6" x2="15" y2="6" stroke="hsl(43,96%,58%)" strokeWidth="1.2"/>
                  <line x1="4.5" y1="1" x2="4.5" y2="4" stroke="hsl(43,96%,58%)" strokeWidth="1.5" strokeLinecap="round"/>
                  <line x1="11.5" y1="1" x2="11.5" y2="4" stroke="hsl(43,96%,58%)" strokeWidth="1.5" strokeLinecap="round"/>
                  <circle cx="5" cy="9.5" r="1" fill="hsl(43,96%,58%)"/>
                  <circle cx="8" cy="9.5" r="1" fill="hsl(43,96%,58%)"/>
                  <circle cx="11" cy="9.5" r="1" fill="hsl(43,96%,58%)"/>
                  <circle cx="5" cy="12.5" r="1" fill="hsl(43,96%,58%)" fillOpacity="0.6"/>
                  <circle cx="8" cy="12.5" r="1" fill="hsl(43,96%,58%)" fillOpacity="0.6"/>
                </svg>
              </div>
              <AnimatePresence>
                {calOpen && <CustomCalendar value={date} onChange={setDate} onClose={() => setCalOpen(false)} />}
              </AnimatePresence>
            </div>

            {/* PASSENGERS */}
            <div className="flex-1 lg:flex-[1]" style={{ position: "relative" }}>
              <Users className="absolute left-4 text-primary z-10 pointer-events-none" size={16} style={{ top: "27px", transform: "translateY(-50%)" }} />
              <div className="w-full h-14 rounded-xl glass-input flex flex-col justify-center pl-11 pr-4">
                <span className="text-[9px] text-white/50 uppercase tracking-widest leading-none mb-0.5">Passengers</span>
                <select value={passengers} onChange={e => setPassengers(e.target.value)}
                  className="bg-transparent border-none outline-none text-white font-semibold text-sm appearance-none cursor-pointer"
                >
                  <option value="1" className="bg-[#0a1128]">1 Seat</option>
                  <option value="2" className="bg-[#0a1128]">2 Seats</option>
                  <option value="3" className="bg-[#0a1128]">3 Seats</option>
                  <option value="4" className="bg-[#0a1128]">4+ Seats</option>
                </select>
              </div>
            </div>

            {/* SEARCH */}
            <button
              onClick={handleSearch}
              className="h-14 rounded-xl bg-primary text-primary-foreground font-bold text-base flex items-center justify-center gap-2 glow-primary hover:bg-primary/90 transition-all lg:w-36 w-full shrink-0"
            >
              <Search size={18} />
              Search
            </button>
          </div>
        </motion.div>
      </div>

      <style>{`
        @keyframes heroPulse {
          0%, 100% { transform: scale(1.05); }
          50% { transform: scale(1.08); }
        }
      `}</style>
    </section>
  );
}
