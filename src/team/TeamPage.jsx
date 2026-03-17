import TeamHero from "./components/TeamHero";
import TeamTimeline from "./components/TeamTimeline";
import teams from "./teamsData";

export default function TeamPage() {
  const heroImages = teams.flatMap((t) => t.heroImages || []).slice(0, 8);

  return (
    <section className="min-h-screen bg-white">
      <div className="bg-black text-white py-12 px-4 sm:py-16 sm:px-8">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-3xl font-bold mb-3 sm:text-5xl sm:mb-4">
            Our <span className="text-red-600">Team</span>
          </h1>
          <p className="text-base text-gray-300 sm:text-lg">
            Meet the passionate people behind TEDxNTUA 2026.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 -mt-6 sm:px-8 sm:-mt-8">
        <TeamHero images={heroImages} alt="team carousel" />
      </div>

      <div className="py-12 px-4 sm:py-16 sm:px-8">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-3 sm:text-3xl sm:mb-4">
            Meet Our <span className="text-red-600">Teams</span>
          </h2>
          <p className="text-sm text-gray-600 text-center mb-8 sm:text-base sm:mb-12">
            Scroll down to discover each team
          </p>
          <TeamTimeline teams={teams} />
        </div>
      </div>
    </section>
  );
}
