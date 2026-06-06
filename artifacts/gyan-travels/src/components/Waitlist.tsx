import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useJoinWaitlist, useGetWaitlistCount, getGetWaitlistCountQueryKey } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { WaitlistSuccessModal } from "./WaitlistSuccessModal";

export function Waitlist() {
  const queryClient = useQueryClient();
  const [email, setEmail] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const countQuery = useGetWaitlistCount();
  const joinMutation = useJoinWaitlist();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    joinMutation.mutate(
      { data: { email } },
      {
        onSuccess: () => {
          setEmail("");
          queryClient.invalidateQueries({ queryKey: getGetWaitlistCountQueryKey() });
          setShowSuccess(true);
        },
        onError: (err: unknown) => {
          const error = err as { body?: { error?: string }; message?: string };
          const msg = error?.body?.error || error?.message || "Something went wrong. Please try again.";
          alert(msg);
        },
      }
    );
  };

  const count = countQuery.data?.count ?? 0;

  return (
    <>
      {showSuccess && <WaitlistSuccessModal onClose={() => setShowSuccess(false)} />}

      <section id="waitlist" className="py-24" style={{ background: "#050914" }}>
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-panel shimmer-gold border border-primary/20 max-w-2xl mx-auto p-8 md:p-12 text-center"
          >
            {count > 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center justify-center gap-2 mb-6"
              >
                <div className="flex items-center gap-2 bg-green-500/10 border border-green-500/20 rounded-full px-4 py-1.5">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
                  </span>
                  <Users size={14} className="text-green-400" />
                  <span className="text-green-400 text-xs font-semibold">{count.toLocaleString()} people have already joined</span>
                </div>
              </motion.div>
            )}

            <h2 className="font-poppins text-4xl md:text-6xl font-black mb-4 leading-tight">
              Experience <span className="text-gradient-gold">Luxury</span>
            </h2>
            <p className="text-white/60 text-lg mb-8 leading-relaxed">
              Be among the first to experience India's most premium bus travel.
              Waitlist members get priority booking access and exclusive launch discounts.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={18} />
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full h-14 rounded-xl pl-12 pr-4 text-white placeholder:text-white/30 text-sm font-medium outline-none focus:ring-2 focus:ring-primary/50"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.10)" }}
                />
              </div>
              <Button
                type="submit"
                disabled={joinMutation.isPending}
                className="h-14 px-8 rounded-xl font-bold text-sm shrink-0 glow-primary"
                style={{ background: "linear-gradient(135deg, hsl(43,96%,52%), hsl(43,96%,65%))" }}
              >
                {joinMutation.isPending ? "Joining..." : "Join Waitlist"}
              </Button>
            </form>

            <p className="text-white/30 text-xs mt-4">
              No spam. Unsubscribe anytime. We respect your privacy.
            </p>
          </motion.div>
        </div>
      </section>
    </>
  );
}
