import TeamList from "./components/TeamList";
import TeamNavigation from "./components/TeamNavigation";
import teams from "./teamsData";

export default function TeamPage() {
  return (
    <section className="relative min-h-screen bg-center bg-fixed bg-repeat overflow-visible">
      {/* Team Navigation */}
      <TeamNavigation teams={teams} />
      
      {/* Team List */}
      <div className="bg-black text-white px-4 sm:px-8">
        <div className="max-w-5xl mx-auto">
          <TeamList teams={teams} />
        </div>
      </div>
    </section>);

}
