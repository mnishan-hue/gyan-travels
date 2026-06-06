import { motion } from "framer-motion";
import { Shield, Heart, Leaf, Zap } from "lucide-react";

const commitments = [
  {
    icon: Shield,
    title: "Safety First",
    description: "Live GPS tracking on every journey, 24/7 emergency response protocols, and comprehensive travel insurance for complete peace of mind.",
  },
  {
    icon: Heart,
    title: "Guest Comfort",
    description: "Premium amenities, high-speed Wi-Fi, personal entertainment, and attentive service — because every moment of your journey matters.",
  },
  {
    icon: Leaf,
    title: "Eco-Friendly",
    description: "Emission-compliant fleet with a clear roadmap to carbon neutrality. Travel luxuriously without compromising the planet.",
  },
  {
    icon: Zap,
    title: "Tech-Enabled",
    description: "AI-powered predictive maintenance, smart seat reservations, and digital operations keep your experience seamless and ahead of its time.",
  },
];

export function Commitment() {
  return (
    <section className="py-20" style={{ background: "#050914" }}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="font-poppins text-4xl md:text-5xl font-black text-white mb-4">
            Our <span className="text-gradient-gold">Commitment</span>
          </h2>
          <p className="text-white/60 text-lg max-w-xl mx-auto">
            Four pillars that define everything we do
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {commitments.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-panel p-6 flex items-start gap-5 hover:-translate-y-1 hover:border-primary/30 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center shrink-0">
                <item.icon className="text-primary" size={24} />
              </div>
              <div>
                <h3 className="font-poppins font-bold text-white text-lg mb-2">{item.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
