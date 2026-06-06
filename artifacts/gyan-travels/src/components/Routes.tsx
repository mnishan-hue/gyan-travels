import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Clock, MapPin } from "lucide-react";

const otherRoutes = [
  { from: "Bangalore", to: "Kochi", duration: "10h 30m" },
  { from: "Chennai", to: "Coimbatore", duration: "8h 15m" },
  { from: "Hyderabad", to: "Mumbai", duration: "14h 00m" },
  { from: "Delhi", to: "Jaipur", duration: "5h 30m" },
  { from: "Pune", to: "Goa", duration: "11h 45m" },
  { from: "Mysore", to: "Bangalore", duration: "3h 15m" },
];

const upcomingRoutes = [
  { from: "Ahmedabad", to: "Rajkot", duration: "4h 30m" },
  { from: "Vijayawada", to: "Vizag", duration: "7h 00m" },
  { from: "Mangalore", to: "Bangalore", duration: "8h 00m" },
];

const routeCardDirections = [
  { x: -30, y: 0 }, { x: 0, y: -30 }, { x: 30, y: 0 },
  { x: -30, y: 0 }, { x: 0, y: 30 }, { x: 30, y: 0 },
];

export function Routes() {
  return (
    <section id="routes" className="py-20 bg-gradient-to-b from-[#050914] to-[#0a1128]">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-white mb-4">
            Popular <span className="text-gradient-gold">Routes</span>
          </h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            Connecting India's most loved destinations with luxury on wheels
          </p>
        </motion.div>

        {/* Featured Route Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, type: "spring", bounce: 0.25 }}
          className="mb-10 relative group"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 via-primary/10 to-transparent rounded-3xl blur-xl opacity-70 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative bg-gradient-to-br from-primary/10 via-white/[0.03] to-transparent border border-primary/30 rounded-3xl p-6 md:p-10 overflow-hidden">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/20 border border-primary/40 rounded-full mb-5">
              <Sparkles className="text-primary" size={12} />
              <span className="text-primary font-bold text-xs">Featured Route</span>
            </div>

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
              <div className="flex-1">
                <div className="flex md:hidden flex-col gap-2 mb-4">
                  <span className="text-[9px] text-primary uppercase tracking-widest">From</span>
                  <span className="text-3xl font-black text-white tracking-tighter">Madikeri</span>
                  <div className="flex items-center gap-2">
                    <div className="w-px h-6 bg-primary/40" />
                    <ArrowRight className="text-primary rotate-90" size={16} />
                  </div>
                  <span className="text-[9px] text-primary uppercase tracking-widest">To</span>
                  <span className="text-3xl font-black text-white tracking-tighter">Coimbatore</span>
                </div>

                <div className="hidden md:flex items-center gap-4 mb-4">
                  <div>
                    <span className="text-[9px] text-primary uppercase tracking-widest block mb-1">From</span>
                    <span className="text-5xl font-black text-white tracking-tighter">Madikeri</span>
                  </div>
                  <div className="flex items-center gap-2 flex-1 px-4">
                    <div className="flex-1 h-px bg-primary/30" />
                    <motion.div
                      animate={{ x: [0, 6, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <ArrowRight className="text-primary" size={20} />
                    </motion.div>
                    <div className="flex-1 h-px bg-primary/30" />
                  </div>
                  <div className="text-right">
                    <span className="text-[9px] text-primary uppercase tracking-widest block mb-1">To</span>
                    <span className="text-5xl font-black text-white tracking-tighter">Coimbatore</span>
                  </div>
                </div>

                <div className="flex items-start gap-2 flex-wrap">
                  <MapPin size={14} className="text-white/40 mt-0.5 shrink-0" />
                  <span className="text-white/40 text-sm">
                    <span className="text-white/30 mr-1">via</span>
                    Madikeri → Murnad → Virajpet → Gonikoppa → Hunsur → Mysore → Bangalore → Hosur → Krishnagiri → Dharmapuri → Salem → Erode → Coimbatore
                  </span>
                </div>
              </div>

              <div className="flex flex-row md:flex-col items-center md:items-end justify-between gap-4 border-t md:border-t-0 border-white/5 pt-4 md:pt-0 shrink-0">
                <div className="flex items-center gap-1.5 text-white/50">
                  <Clock size={14} />
                  <span className="text-sm">Est. 6h 00m</span>
                </div>
                <div className="text-right">
                  <span className="px-3 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-sm font-bold text-primary uppercase tracking-wide">
                    Coming Soon
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Other Routes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {otherRoutes.map((route, i) => (
            <motion.div
              key={`${route.from}-${route.to}`}
              initial={{ opacity: 0, x: routeCardDirections[i].x, y: routeCardDirections[i].y }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5, type: "spring", bounce: 0.2 }}
              whileHover={{ scale: 1.03, borderColor: "rgba(234,179,8,0.3)" }}
              className="bg-white/[0.03] border border-white/5 rounded-2xl p-5 group transition-colors duration-300 cursor-default"
            >
              <div className="flex items-center gap-2 mb-3 flex-wrap">
                <span className="text-base font-bold text-white">{route.from}</span>
                <motion.div
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2, ease: "easeInOut" }}
                >
                  <ArrowRight size={14} className="text-primary flex-shrink-0" />
                </motion.div>
                <span className="text-base font-bold text-white">{route.to}</span>
              </div>
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5 text-white/40">
                  <Clock size={12} />
                  <span className="text-xs">{route.duration}</span>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-bold text-primary uppercase flex-shrink-0">
                  Coming Soon
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Upcoming Connectivity */}
        <motion.h3
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="text-xl font-bold text-white mb-5 tracking-tight border-l-4 border-primary pl-4"
        >
          Upcoming Connectivity
        </motion.h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {upcomingRoutes.map((route, i) => (
            <motion.div
              key={`${route.from}-${route.to}`}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, type: "spring", bounce: 0.25 }}
              whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.05)" }}
              className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 group transition-colors duration-300 cursor-default"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="text-sm font-semibold text-white truncate">{route.from}</span>
                  <ArrowRight size={13} className="text-primary flex-shrink-0" />
                  <span className="text-sm font-semibold text-white truncate">{route.to}</span>
                </div>
                <span className="flex-shrink-0 whitespace-nowrap px-2.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-bold text-primary uppercase">
                  Coming Soon
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
