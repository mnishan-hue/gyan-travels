import { motion } from "framer-motion";
import {
  BedDouble, Wifi, BatteryCharging, Tv, Wind, Coffee,
  Headphones, Shield, Lightbulb, Lock, Smartphone, Star
} from "lucide-react";

const amenities = [
  { icon: BedDouble, label: "Luxury Sleeper Pods", desc: "Ergonomic reclining beds with memory foam" },
  { icon: Wifi, label: "Free High-Speed Wi-Fi", desc: "Stay connected throughout your journey" },
  { icon: BatteryCharging, label: "USB & Type-C Charging", desc: "Individual charging ports at every seat" },
  { icon: Tv, label: "Personal Entertainment", desc: "In-seat screens with movies & music" },
  { icon: Wind, label: "Climate Control", desc: "Individual air conditioning vents" },
  { icon: Coffee, label: "Complimentary Snacks", desc: "Light refreshments on select routes" },
  { icon: Headphones, label: "Noise Isolation", desc: "Quiet cabin for restful sleep" },
  { icon: Shield, label: "CCTV Surveillance", desc: "24/7 security monitoring onboard" },
  { icon: Lightbulb, label: "Personal Reading Light", desc: "Adjustable ambient lighting" },
  { icon: Lock, label: "Secure Luggage", desc: "Locked undercarriage storage" },
  { icon: Smartphone, label: "Live Tracking", desc: "Real-time bus location updates" },
  { icon: Star, label: "Premium Bedding", desc: "Clean blankets, pillows & curtains" },
];

export function Amenities() {
  return (
    <section className="py-24 bg-[#0a1128] relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-[700px] h-[700px] bg-primary/5 blur-[120px] translate-y-1/2 -translate-x-1/3 pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white mb-4">
            Onboard <span className="text-gradient-gold">Amenities</span>
          </h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            Everything you need for a comfortable, connected, and restful journey.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, type: "spring", bounce: 0.2 }}
          className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border border-primary/20 rounded-[2rem] p-8 mb-12 overflow-hidden relative"
        >
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#0a1128] to-transparent pointer-events-none" />
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6 relative z-10">
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="w-16 h-16 rounded-2xl bg-primary/20 border border-primary/30 flex-shrink-0 flex items-center justify-center"
            >
              <BedDouble className="h-8 w-8 text-primary" />
            </motion.div>
            <div>
              <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight mb-2">Luxury Sleeper Experience</h3>
              <p className="text-white/60 text-lg max-w-2xl leading-relaxed">
                Our flagship sleeper coaches offer fully reclining pods with memory foam padding, privacy curtains, personal storage, and premium bedding — giving you a hotel-quality rest on the road.
              </p>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {amenities.map((amenity, idx) => (
            <motion.div
              key={amenity.label}
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.04, duration: 0.4, type: "spring", bounce: 0.3 }}
              whileHover={{ y: -5, scale: 1.04, backgroundColor: "rgba(255,255,255,0.05)" }}
              className="bg-white/[0.02] border border-white/5 rounded-2xl p-5 hover:border-primary/20 group transition-colors duration-300 cursor-default"
            >
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
                className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/[0.15] text-primary mb-3 flex items-center justify-center"
              >
                <amenity.icon size={18} />
              </motion.div>
              <p className="text-sm font-bold text-white mb-1 tracking-tight leading-tight">{amenity.label}</p>
              <p className="text-xs text-white/40 leading-snug group-hover:text-white/60 transition-colors duration-300">{amenity.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
