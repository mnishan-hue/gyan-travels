import { motion } from "framer-motion";
import { SiWhatsapp } from "react-icons/si";

export function WhatsAppFloat() {
  return (
    <motion.a
      href="https://wa.me/917349549367?text=Hi%20Gyan%20Travels!%20I%20want%20to%20know%20more%20about%20your%20services."
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-green-500 text-white shadow-lg"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", delay: 2, stiffness: 200, damping: 15 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-60 animate-ping" />
      <SiWhatsapp size={28} className="relative z-10" />
    </motion.a>
  );
}
