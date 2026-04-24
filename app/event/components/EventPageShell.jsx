export default function EventPageShell({ title, description, children }) {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[radial-gradient(circle_at_top,rgba(74,222,128,0.34),transparent_52%),linear-gradient(360deg,#1d3a2b_0%,#153125_42%,#0d1713_100%)] text-white">
      <div className="pointer-events-none absolute left-[-10%] top-28 h-72 w-72 rounded-full bg-emerald-400/12 blur-3xl" />
      <div className="pointer-events-none absolute right-[-6%] top-80 h-96 w-96 rounded-full bg-cyan-300/8 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 py-10 pb-28 sm:px-6 md:pb-10 lg:px-8 lg:py-20">
        <div className="rounded-[2.5rem] border border-white/10 bg-black/40 p-8 shadow-[0_40px_100px_rgba(0,0,0,0.5)] backdrop-blur-3xl sm:p-12 lg:p-16">
          <header className="mb-16 border-b border-white/5 pb-12 text-center md:text-left">
            <h1 className="text-5xl font-black uppercase tracking-[0.1em] text-white sm:text-6xl lg:text-7xl drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]">
              {title}
            </h1>
            {description && (
              <p className="mx-auto mt-8 max-w-3xl text-lg leading-relaxed text-white/50 font-medium tracking-wide md:mx-0">
                {description}
              </p>
            )}
          </header>
          <div className="relative z-10">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
