export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center" style={{ background: "#050914" }}>
      <div className="text-center">
        <h1 className="text-6xl font-black text-white mb-4">404</h1>
        <p className="text-white/60 text-xl mb-8">Page not found</p>
        <a href="/" className="text-amber-400 hover:text-amber-300 transition-colors underline">
          Back to Home
        </a>
      </div>
    </div>
  );
}
