import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { setBaseUrl } from "@workspace/api-client-react";

if (import.meta.env.VITE_API_URL) {
  setBaseUrl(import.meta.env.VITE_API_URL as string);
}
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Stats } from "@/components/Stats";
import { Routes } from "@/components/Routes";
import { Features } from "@/components/Features";
import { Amenities } from "@/components/Amenities";
import { HowItWorks } from "@/components/HowItWorks";
import { WhyChoose } from "@/components/WhyChoose";
import { Commitment } from "@/components/Commitment";
import { FAQ } from "@/components/FAQ";
import { Waitlist } from "@/components/Waitlist";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30000,
    },
  },
});

function Home() {
  return (
    <div className="min-h-screen" style={{ background: "#050914" }}>
      <Navbar />
      <Hero />
      <Stats />
      <Routes />
      <Features />
      <Amenities />
      <HowItWorks />
      <WhyChoose />
      <Commitment />
      <FAQ />
      <Waitlist />
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
