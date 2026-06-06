import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    q: "When will Gyan Travels officially launch?",
    a: "We are currently in the final stages of preparation. Join our waitlist to be among the first to know when we go live and to receive exclusive early-bird benefits.",
  },
  {
    q: "What makes Gyan Travels different from other bus services?",
    a: "Gyan Travels redefines road travel with hotel-grade sleeper coaches, real-time GPS tracking, verified professional drivers, and a digital-first booking experience — all at prices 20% lower than comparable luxury transport.",
  },
  {
    q: "What amenities are available on board?",
    a: "Our coaches feature luxury sleeper pods with memory foam mattresses, privacy curtains, personal reading lights, USB & Type-C charging, complimentary high-speed Wi-Fi, climate control, noise isolation, personal entertainment screens, complimentary snacks, and CCTV surveillance.",
  },
  {
    q: "How can I book a ticket?",
    a: "Once we launch, you'll be able to book directly through our website or mobile app using our seamless booking system. Payment options will include UPI, credit/debit cards, net banking, and popular wallets.",
  },
  {
    q: "What is the cancellation and refund policy?",
    a: "We offer flexible cancellation with full refunds up to 24 hours before departure and partial refunds up to 4 hours before. Detailed policies will be published at launch.",
  },
  {
    q: "Are the buses safe?",
    a: "Absolutely. Safety is our highest priority. Every bus has real-time GPS tracking, emergency response protocols, comprehensive insurance coverage, and is maintained to the highest mechanical standards. All drivers are background-verified and undergo regular health checks.",
  },
  {
    q: "Which cities will you operate in at launch?",
    a: "Our launch network will include Bangalore, Chennai, Hyderabad, Mumbai, Kochi, Coimbatore, Delhi, Jaipur, Mysore, Pune, and Goa. We'll be expanding rapidly to more cities after launch.",
  },
  {
    q: "What benefits do waitlist members get?",
    a: "Waitlist members receive priority booking access before the general public, exclusive launch discounts, early access to route announcements, and special loyalty rewards that non-waitlist members won't receive.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-20" style={{ background: "#0a1128" }}>
      <div className="container mx-auto px-4 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="font-poppins text-4xl md:text-5xl font-black text-white mb-4">
            Frequently Asked <span className="text-gradient-gold">Questions</span>
          </h2>
          <p className="text-white/60 text-lg">
            Everything you need to know before we launch
          </p>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className={`glass-panel overflow-hidden transition-all duration-300 ${openIndex === i ? "border-primary/40" : ""}`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-5 md:p-6 text-left gap-4"
              >
                <span className={`font-medium text-sm md:text-base leading-relaxed ${openIndex === i ? "text-primary" : "text-white"}`}>
                  {faq.q}
                </span>
                <div className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all ${openIndex === i ? "bg-primary text-primary-foreground" : "border border-white/20 text-white/50"}`}>
                  {openIndex === i ? <Minus size={14} /> : <Plus size={14} />}
                </div>
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <div className="border-t border-white/10 px-5 md:px-6 py-4">
                      <p className="text-white/60 text-sm leading-relaxed">{faq.a}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
