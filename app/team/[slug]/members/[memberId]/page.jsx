import teams from "../../../teamsData";
import MemberPhoto from "../../../components/MemberPhoto";
export function generateStaticParams() {
  return teams.flatMap((team) =>
    (team.members || []).map((member) => ({
      slug: team.slug,
      memberId: member.id,
    }))
  );
}

export const dynamicParams = false;

export default function MemberPage({ params }) {
  const { slug, memberId } = params;
  const team = teams.find((t) => t.slug === slug);
  const member = team?.members?.find((m) => m.id === memberId);

  if (!team || !member) {
    return (
      <section className="min-h-screen p-8 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-semibold">Not found</h2>
          <p className="text-gray-600">No member matches &quot;{memberId}&quot; in team &quot;{slug}&quot;.</p>
          <a href={`/team/${slug}`} className="text-blue-600 mt-4 block">Back to team</a>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen p-8 bg-white">
      <div className="max-w-3xl mx-auto">
        <a href={`/team/${slug}`} className="text-blue-600 mb-4 inline-block">← Back to team</a>
        <div className="flex gap-6 items-start">
          <MemberPhoto
            member={member}
            containerClassName="w-48 h-48 rounded bg-gray-100"
          />
          <div>
            <h1 className="text-2xl font-bold">{member.name}</h1>
          </div>
        </div>
      </div>
    </section>
  );
}
