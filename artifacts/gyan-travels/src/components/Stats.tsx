import { useRef } from "react";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect } from "react";

function AnimatedNumber({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const motionVal = useMotionValue(0);
  const spring = useSpring(motionVal, { duration: 2000, bounce: 0 });
  const display = useTransform(spring, (v) => `${Math.round(v)}${suffix}`);

  useEffect(() => {
    if (inView) motionVal.set(target);
  }, [inView, motionVal, target]);

  return <motion.span ref={ref}>{display}</motion.span>;
}

const stats = [
  { label: "Routes Launching", target: 50, suffix: "+" },
  { label: "Premium Coaches", target: 100, suffix: "+" },
  { label: "Travelers Expected", target: 10000, suffix: "+" },
];

export function Stats() {
  return (
    <section className="py-16" style={{ background: "#050914" }}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center col-span-1 last:col-span-2 md:last:col-span-1"
            >
              <div className="text-4xl md:text-5xl lg:text-6xl font-black font-poppins text-gradient-gold mb-2">
                <AnimatedNumber target={stat.target} suffix={stat.suffix} />
              </div>
              <p className="text-white/60 text-sm md:text-base font-medium uppercase tracking-wider">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
