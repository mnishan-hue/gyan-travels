import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, Star, Sparkles } from "lucide-react";

function Particle({ i }: { i: number }) {
  const colors = ["#f59e0b", "#fbbf24", "#fcd34d", "#ef4444", "#10b981", "#3b82f6", "#8b5cf6", "#ec4899"];
  const color = colors[i % colors.length];
  const x = Math.random() * 600 - 300;
  const y = Math.random() * -400 - 100;
  const rotate = Math.random() * 720 - 360;
  const delay = Math.random() * 0.4;
  const size = Math.random() * 8 + 5;
  const shape = i % 3;

  return (
    <motion.div
      initial={{ opacity: 1, x: 0, y: 0, rotate: 0, scale: 1 }}
      animate={{ opacity: 0, x, y, rotate, scale: 0.3 }}
      transition={{ duration: 1.4 + Math.random() * 0.6, delay, ease: "easeOut" }}
      className="absolute left-1/2 top-1/2 pointer-events-none"
      style={{
        width: size,
        height: shape === 0 ? size : size * 0.5,
        background: color,
        borderRadius: shape === 2 ? "50%" : shape === 1 ? "2px" : "1px",
        transform: `translate(-50%, -50%)`,
      }}
    />
  );
}

export function WaitlistSuccessModal({ onClose }: { onClose: () => void }) {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const esc = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", esc);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", esc);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div
        ref={overlayRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
        className="fixed inset-0 flex items-center justify-center px-4"
        style={{ background: "rgba(5,9,20,0.85)", backdropFilter: "blur(12px)", zIndex: 10000 }}
      >
        <div className="absolute inset-0 overflow-hidden pointer-events-none flex items-center justify-center">
          {Array.from({ length: 60 }).map((_, i) => <Particle key={i} i={i} />)}
        </div>

        <motion.div
          initial={{ scale: 0.6, opacity: 0, y: 40 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ type: "spring", bounce: 0.45, duration: 0.7 }}
          className="relative w-full max-w-md rounded-3xl overflow-hidden text-center"
          style={{
            background: "linear-gradient(135deg, #0d1a36 0%, #0a1128 100%)",
            border: "1px solid rgba(234,179,8,0.3)",
            boxShadow: "0 0 80px rgba(234,179,8,0.2), 0 20px 60px rgba(0,0,0,0.6)",
          }}
        >
          <div className="h-1 w-full" style={{ background: "linear-gradient(90deg, transparent, hsl(43,96%,58%), transparent)" }} />

          <div className="absolute inset-0 pointer-events-none" style={{
            background: "radial-gradient(ellipse at center top, rgba(234,179,8,0.08), transparent 60%)"
          }} />

          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all"
          >
            <X size={16} />
          </button>

          <div className="relative z-10 p-8 md:p-10">
            <motion.div
              initial={{ scale: 0, rotate: -30 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", bounce: 0.5, delay: 0.2, duration: 0.8 }}
              className="w-24 h-24 rounded-full mx-auto mb-6 flex items-center justify-center relative"
              style={{ background: "radial-gradient(circle, rgba(234,179,8,0.2), rgba(234,179,8,0.05))", border: "2px solid rgba(234,179,8,0.4)" }}
            >
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <CheckCircle2 size={44} className="text-primary" />
              </motion.div>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="font-poppins text-3xl font-black text-white mb-2"
            >
              You're In! 🎉
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-white/60 text-sm leading-relaxed mb-8"
            >
              Welcome to the Gyan Travels family. You've secured your spot for priority booking access and exclusive early-bird benefits when we launch.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex gap-3 mb-7"
            >
              {[
                { icon: Star, label: "Priority Booking", sub: "First access" },
                { icon: Sparkles, label: "Launch Discount", sub: "Exclusive offer" },
              ].map(({ icon: Icon, label, sub }) => (
                <div key={label} className="flex-1 rounded-2xl p-3 border border-primary/20" style={{ background: "rgba(234,179,8,0.06)" }}>
                  <Icon size={18} className="text-primary mx-auto mb-1.5" />
                  <p className="text-white font-bold text-xs">{label}</p>
                  <p className="text-white/40 text-[10px]">{sub}</p>
                </div>
              ))}
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="text-primary/70 text-xs uppercase tracking-[0.2em] font-medium mb-6"
            >
              Don't worry when you travel with GT
            </motion.p>

            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={onClose}
              className="w-full h-12 rounded-2xl font-bold text-primary-foreground text-sm tracking-wide"
              style={{ background: "linear-gradient(90deg, hsl(43,96%,50%), hsl(43,96%,65%))", boxShadow: "0 0 24px rgba(234,179,8,0.4)" }}
            >
              Awesome, can't wait! ✨
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
