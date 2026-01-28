import TeamHero from "./components/TeamHero";
import TeamTimeline from "./components/TeamTimeline";
import teams from "./teamsData";

export default function TeamPage() {
  const heroImages = teams.flatMap((t) => t.heroImages || []).slice(0, 8);

  return (
    <section className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-black text-white py-16 px-8">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-4">
            Our <span className="text-red-600">Team</span>
          </h1>
          <p className="text-lg text-gray-300">
            Meet the passionate people behind TEDxNTUA 2026.
          </p>
        </div>
      </div>

      {/* Hero carousel */}
      <div className="max-w-5xl mx-auto px-8 -mt-8">
        <TeamHero images={heroImages} alt="team carousel" />
      </div>

      {/* Timeline Section */}
      <div className="py-16 px-8">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">
            Meet Our <span className="text-red-600">Teams</span>
          </h2>
          <p className="text-gray-600 text-center mb-12">
            Scroll down to discover each team
          </p>
          <TeamTimeline teams={teams} />
        </div>
      </div>
    </section>
  );
}
