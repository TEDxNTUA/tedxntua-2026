export default function HomePage() {
  return (
    <div
      className="flex min-h-screen items-center justify-center"
      style={{
        background: `
          radial-gradient(ellipse at 20% 20%, rgba(255,255,255,0.85) 0%, transparent 48%),
          radial-gradient(ellipse at 80% 15%, rgba(212,237,224,0.7) 0%, transparent 44%),
          radial-gradient(ellipse at 10% 80%, rgba(200,232,213,0.6) 0%, transparent 48%),
          radial-gradient(ellipse at 85% 85%, rgba(232,212,240,0.55) 0%, transparent 44%),
          radial-gradient(ellipse at 50% 50%, #2d9e6b 0%, #1a7a52 60%, #155e40 100%)
        `,
        backgroundColor: "#1e8a5e",
      }}
    >
      <main className="flex flex-col items-center justify-center text-center px-8">
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold text-white tracking-tight mb-4">
          TEDxNTUA
        </h1>
      </main>
    </div>
  );
}
