import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Linkedin } from "lucide-react";
import { SiWhatsapp, SiFacebook, SiX, SiInstagram } from "react-icons/si";

export function Footer() {
  return (
    <footer style={{ background: "#050914" }} className="border-t border-white/5">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src="/gt-logo.png" alt="Gyan Travels" className="w-12 h-12 object-contain rounded-full shrink-0" />
              <div className="flex flex-col leading-none">
                <span
                  className="text-white text-lg font-bold tracking-wider"
                  style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700 }}
                >
                  GYAN <span className="text-primary">TRAVELS</span>
                </span>
                <span className="text-[10px] text-primary italic opacity-70">Don't worry when you travel with GT</span>
              </div>
            </div>
            <p className="text-white/40 text-sm leading-relaxed mb-5 italic">
              "Don't worry when you travel with GT"
            </p>
            <div className="flex items-center gap-3">
              {[
                { Icon: SiFacebook, label: "Facebook", href: "#" },
                { Icon: SiX, label: "Twitter", href: "#" },
                { Icon: SiInstagram, label: "Instagram", href: "#" },
              ].map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-primary hover:border-primary/40 transition-all"
                >
                  <Icon size={14} />
                </a>
              ))}
              <a
                href="#"
                aria-label="LinkedIn"
                className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-primary hover:border-primary/40 transition-all"
              >
                <Linkedin size={14} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-poppins font-bold text-white mb-4 text-sm uppercase tracking-wider">Company</h4>
            <ul className="space-y-3">
              {["About Us", "Careers", "Press & Media", "Sustainability"].map((link) => (
                <li key={link}>
                  <a href="#" className="text-white/40 hover:text-primary text-sm transition-colors">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-poppins font-bold text-white mb-4 text-sm uppercase tracking-wider">Support</h4>
            <ul className="space-y-3">
              {["Help Center", "Terms of Service", "Privacy Policy", "Cancellation Policy"].map((link) => (
                <li key={link}>
                  <a href="#" className="text-white/40 hover:text-primary text-sm transition-colors">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-poppins font-bold text-white mb-4 text-sm uppercase tracking-wider">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-primary shrink-0 mt-0.5" />
                <span className="text-white/40 text-sm">Gonikopal, Coorg, Karnataka — 571213</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-primary shrink-0" />
                <a href="tel:+917349549367" className="text-white/40 hover:text-primary text-sm transition-colors">+91 73495 49367</a>
              </li>
              <li className="flex items-center gap-3">
                <SiWhatsapp size={16} className="text-green-400 shrink-0" />
                <a
                  href="https://wa.me/917349549367"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/40 hover:text-green-400 text-sm transition-colors"
                >
                  +91 73495 49367
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-primary shrink-0" />
                <a href="mailto:hellogyantravels@gmail.com" className="text-white/40 hover:text-primary text-sm transition-colors">hellogyantravels@gmail.com</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-white/30 text-xs">
          <p>&copy; {new Date().getFullYear()} Gyan Travels. All rights reserved. Don't worry when you travel with GT.</p>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-primary transition-colors">Privacy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms</a>
            <span className="text-primary">Made with Excellence in India</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
