import AnchorScrollHandler from "./AnchorScrollHandler";

export default function MorePage() {
  return (
    <div>
      <AnchorScrollHandler />

      <section id="speakers" className="min-h-[70vh] py-20 scroll-mt-24 more-section">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-6">Speakers</h1>
          <p className="text-lg mb-8">Speaker list and bios will be published here.</p>
        </div>
      </section>

      <section id="performances" className="min-h-[70vh] py-20 scroll-mt-24 more-section">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold mb-6">Performances</h2>
          <p>Live performances and intermissions schedule.</p>
        </div>
      </section>

      <section id="professional-workshops" className="min-h-[70vh] py-20 scroll-mt-24 more-section">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold mb-6">Professional Workshops</h2>
          <p>Workshops for professionals and continuing education.</p>
        </div>
      </section>

      <section id="experience-workshops" className="min-h-[70vh] py-20 scroll-mt-24 more-section">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold mb-6">Experience Workshops</h2>
          <p>Hands-on sessions and interactive experiences.</p>
        </div>
      </section>

      <section id="side-happenings" className="min-h-[70vh] py-20 scroll-mt-24 more-section">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold mb-6">Side Happenings</h2>
          <p>Small events and pop-ups around the main conference.</p>
        </div>
      </section>
    </div>
  );
}
