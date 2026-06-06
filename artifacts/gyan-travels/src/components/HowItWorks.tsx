import { motion } from "framer-motion";
import { Search, MapPin, CreditCard, CheckCircle } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Search & Select",
    description: "Enter your origin, destination, and travel date to explore available premium routes.",
    step: "01",
  },
  {
    icon: MapPin,
    title: "Book Your Seat",
    description: "Choose your preferred seat type — sleeper, semi-sleeper, or premium pods.",
    step: "02",
  },
  {
    icon: CreditCard,
    title: "Secure Payment",
    description: "Pay seamlessly via UPI, cards, or wallets. Instant confirmation in seconds.",
    step: "03",
  },
  {
    icon: CheckCircle,
    title: "Enjoy Your Journey",
    description: "Board and relax. Your luxury experience begins the moment you step in.",
    step: "04",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20" style={{ background: "#050914" }}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="font-poppins text-4xl md:text-5xl font-black text-white mb-4">
            How <span className="text-gradient-gold">Gyan Works</span>
          </h2>
          <p className="text-white/60 text-lg max-w-xl mx-auto">
            Book your luxury journey in four simple steps
          </p>
        </motion.div>

        <div className="relative">
          <div className="hidden lg:block absolute top-[52px] left-[calc(12.5%+24px)] right-[calc(12.5%+24px)] h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-panel p-6 relative hover:-translate-y-1 transition-all duration-300"
              >
                <div className="absolute top-4 right-4 font-poppins font-black text-3xl text-white/5">
                  {step.step}
                </div>
                <div className="w-12 h-12 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center mb-4">
                  <step.icon className="text-primary" size={24} />
                </div>
                <h3 className="font-poppins font-bold text-white text-lg mb-2">{step.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
