import AnchorScrollHandler from "../components/AnchorScrollHandler";

export default function ProgramPage() {
  return (
    <div>
      <AnchorScrollHandler />

      <section id="performances" className="min-h-[70vh] py-20 scroll-mt-24">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-6">Performances</h1>
          <p className="text-lg text-gray-700 mb-8">Full program for TEDxNTUA 2026. Scroll to the items on the left to jump to each section.</p>
          <div className="prose">
            <p>Sample program content goes here. Add times, stages and short descriptions per item.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
