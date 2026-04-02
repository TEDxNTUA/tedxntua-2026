export default function EventPageShell({ title, children }) {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[radial-gradient(circle_at_top,rgba(74,222,128,0.22),transparent_34%),linear-gradient(180deg,#07110d_0%,#050907_100%)] text-white">
      <div className="pointer-events-none absolute left-[-10%] top-28 h-72 w-72 rounded-full bg-emerald-400/12 blur-3xl" />
      <div className="pointer-events-none absolute right-[-6%] top-80 h-96 w-96 rounded-full bg-cyan-300/8 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <div className="rounded-[2.25rem] border border-white/14 bg-black/45 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.38)] backdrop-blur-2xl sm:p-8 lg:p-10">
          <div className="mb-10 flex flex-col gap-5 border-b border-white/12 pb-8">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
                  {title}
                </h1>
              </div>
            </div>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
