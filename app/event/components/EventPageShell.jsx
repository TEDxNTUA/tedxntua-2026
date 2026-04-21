export default function EventPageShell({ title, description, children }) {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[radial-gradient(circle_at_top,rgba(74,222,128,0.22),transparent_34%),linear-gradient(180deg,#07110d_0%,#050907_100%)] text-white">
      <div className="pointer-events-none absolute left-[-10%] top-28 h-72 w-72 rounded-full bg-emerald-400/12 blur-3xl" />
      <div className="pointer-events-none absolute right-[-6%] top-80 h-96 w-96 rounded-full bg-cyan-300/8 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-20">
        <div className="rounded-[2.5rem] border border-white/10 bg-black/40 p-8 shadow-[0_40px_100px_rgba(0,0,0,0.5)] backdrop-blur-3xl sm:p-12 lg:p-16">
          <header className="mb-16 border-b border-white/5 pb-12">
            <h1 className="text-5xl font-black uppercase tracking-[0.1em] text-white sm:text-6xl lg:text-7xl drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]">
              {title}
            </h1>
            {description && (
              <p className="mt-8 max-w-3xl text-lg leading-relaxed text-white/50 font-medium tracking-wide">
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
