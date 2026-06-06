import { motion } from "framer-motion";
import { Bus, Map, ShieldCheck, Sparkles, Headset, CreditCard } from "lucide-react";

const features = [
  { icon: Bus, title: "Luxury Sleeper Coaches", description: "Ergonomically designed pods with premium bedding, privacy blinds, and personal entertainment." },
  { icon: Map, title: "Real-Time GPS Tracking", description: "Share your live journey status with family. Precise ETA updates straight to your phone." },
  { icon: ShieldCheck, title: "Verified Drivers", description: "Highly trained, background-verified professionals ensuring a safe and smooth ride." },
  { icon: Sparkles, title: "Sanitized Buses", description: "Deep cleaning and UV sanitization before every trip for your health and peace of mind." },
  { icon: Headset, title: "24/7 Customer Support", description: "Dedicated travel concierges available around the clock to assist you." },
  { icon: CreditCard, title: "Seamless Digital Payments", description: "One-click bookings, flexible cancellations, and instant refunds directly to your wallet." },
];

const cardVariants = [
  { initial: { opacity: 0, x: -40, rotateY: -10 }, animate: { opacity: 1, x: 0, rotateY: 0 } },
  { initial: { opacity: 0, y: -40 }, animate: { opacity: 1, y: 0 } },
  { initial: { opacity: 0, x: 40, rotateY: 10 }, animate: { opacity: 1, x: 0, rotateY: 0 } },
  { initial: { opacity: 0, x: -40, scale: 0.9 }, animate: { opacity: 1, x: 0, scale: 1 } },
  { initial: { opacity: 0, y: 40 }, animate: { opacity: 1, y: 0 } },
  { initial: { opacity: 0, x: 40, scale: 0.9 }, animate: { opacity: 1, x: 0, scale: 1 } },
];

export function Features() {
  return (
    <section id="features" className="py-24 bg-gradient-to-b from-[#0a1128] to-[#050914] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white mb-4">
            The <span className="text-gradient-gold">Gyan Travels</span> Edge
          </h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            Bringing aviation-grade standards to Indian road travel with next-gen luxury coaches.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feature, idx) => (
            <motion.div
              key={feature.title}
              initial={cardVariants[idx].initial}
              whileInView={cardVariants[idx].animate}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.6, type: "spring", bounce: 0.3 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="bg-white/[0.02] border border-white/5 rounded-3xl p-6 md:p-8 hover:bg-white/[0.04] transition-colors duration-500 group overflow-hidden relative cursor-default"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/0 group-hover:from-primary/5 group-hover:to-transparent transition-all duration-500 rounded-3xl pointer-events-none" />
              <div className="relative z-10">
                <motion.div
                  whileHover={{ rotate: [0, -10, 10, 0], scale: 1.15 }}
                  transition={{ duration: 0.4 }}
                  className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-primary/10 border border-primary/20 text-primary mb-5 flex items-center justify-center"
                >
                  <feature.icon className="h-6 w-6 md:h-7 md:w-7" />
                </motion.div>
                <h3 className="text-lg md:text-xl font-bold text-white mb-2 tracking-tight">{feature.title}</h3>
                <p className="text-sm md:text-base text-white/50 leading-relaxed group-hover:text-white/70 transition-colors duration-300">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
