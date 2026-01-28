import TeamHero from "../components/TeamHero";
import teams from "../teamsData";

type Props = { params: { slug: string } };

export default function TeamDetailPage({ params }: Props) {
  const { slug } = params;
  const team = teams.find((t) => t.slug === slug);

  if (!team) {
    return (
      <section className="min-h-screen p-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-semibold">Team not found</h2>
          <p className="text-gray-600">No team matches &quot;{slug}&quot;.</p>
          <a href="/team" className="text-blue-600 mt-4 block">Back to teams</a>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-6">
          <h1 className="text-3xl font-bold">{team.title}</h1>
          {team.description && <p className="text-gray-600">{team.description}</p>}
        </header>

        <div className="mb-6">
          <TeamHero images={team.heroImages || []} alt={`${team.title} photos`} />
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-3">Members</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {(team.members || []).map((m) => (
              <div key={m.id} className="border rounded p-3 flex flex-col items-center text-center">
                <div className="w-28 h-28 rounded-full overflow-hidden mb-3">
                  {m.photo ? (
                    <img src={m.photo} alt={m.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-gray-100 flex items-center justify-center">No photo</div>
                  )}
                </div>
                <h3 className="font-medium">{m.name}</h3>
                {m.role && <p className="text-sm text-gray-500">{m.role}</p>}
                <a href={`/team/${team.slug}/members/${m.id}`} className="mt-3 text-blue-600">View profile</a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
