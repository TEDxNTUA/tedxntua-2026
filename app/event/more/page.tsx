import AnchorScrollHandler from "../components/AnchorScrollHandler";

export default function MorePage() {
  return (
    <div>
      <AnchorScrollHandler />

      <section id="speakers" className="min-h-[70vh] py-20 scroll-mt-24">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-6">Speakers</h1>
          <p className="text-lg text-gray-700 mb-8">Speaker list and bios will be published here.</p>
        </div>
      </section>

      <section id="performances" className="min-h-[70vh] py-20 scroll-mt-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold mb-6">Performances</h2>
          <p className="text-gray-700">Live performances and intermissions schedule.</p>
        </div>
      </section>

      <section id="professional-workshops" className="min-h-[70vh] py-20 scroll-mt-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold mb-6">Professional Workshops</h2>
          <p className="text-gray-700">Workshops for professionals and continuing education.</p>
        </div>
      </section>

      <section id="experience-workshops" className="min-h-[70vh] py-20 scroll-mt-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold mb-6">Experience Workshops</h2>
          <p className="text-gray-700">Hands-on sessions and interactive experiences.</p>
        </div>
      </section>

      <section id="side-happenings" className="min-h-[70vh] py-20 scroll-mt-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold mb-6">Side Happenings</h2>
          <p className="text-gray-700">Small events and pop-ups around the main conference.</p>
        </div>
      </section>
    </div>
  );
}
