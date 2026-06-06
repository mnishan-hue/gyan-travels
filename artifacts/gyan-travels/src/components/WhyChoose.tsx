import { motion } from "framer-motion";
import { Star, TrendingUp, Award, Users } from "lucide-react";

const cards = [
  {
    icon: Star,
    value: "5-Star",
    title: "Premium Experience",
    description: "Hotel-grade luxury in every coach, from boarding to arrival at your destination.",
  },
  {
    icon: TrendingUp,
    value: "20% Lower",
    title: "Best Fares",
    description: "Premium experience at prices 20% lower than comparable luxury transport options.",
  },
  {
    icon: Award,
    value: "ISO 9001:2015",
    title: "Industry Leading",
    description: "Certified quality management systems ensuring world-class service delivery.",
  },
  {
    icon: Users,
    value: "50K+ Members",
    title: "Growing Community",
    description: "Join thousands of discerning travelers who've already signed up for early access.",
  },
];

export function WhyChoose() {
  return (
    <section className="py-20" style={{ background: "#0a1128" }}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="font-poppins text-4xl md:text-5xl font-black text-white mb-4">
            Why Choose <span className="text-gradient-gold">Gyan Travels</span>
          </h2>
          <p className="text-white/60 text-lg max-w-xl mx-auto">
            The numbers speak. The experience speaks louder.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {cards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="glass-panel p-6 group hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center mb-4">
                <card.icon className="text-primary" size={24} />
              </div>
              <p className="text-2xl font-black text-gradient-gold mb-1">{card.value}</p>
              <h3 className="font-poppins font-bold text-white text-base mb-2">{card.title}</h3>
              <p className="text-white/60 text-sm leading-relaxed">{card.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
