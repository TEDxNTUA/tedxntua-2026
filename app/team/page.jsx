import TeamList from "./components/TeamList";
import teams from "./teamsData";

export default function TeamPage() {
  return (
    <section
      className="min-h-screen bg-center bg-fixed bg-repeat"
      // style={{ backgroundImage: "url('/team_page_background.png')", backgroundSize: "auto" }}
    >
      {/* Hero Section with Timeline */}
      <div className="bg-black text-white px-4 py-12 sm:px-8 sm:py-16">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="mb-4 text-3xl font-bold sm:text-4xl md:text-5xl">
              Our <span className="text-red-600">Team</span>
            </h1>
            <p className="mx-auto max-w-2xl text-sm text-gray-300 sm:text-base md:text-lg">
              Meet the passionate people behind TEDxNTUA 2026.
            </p>
          </div>
          <TeamList teams={teams} />
        </div>
      </div>
    </section>);

}
