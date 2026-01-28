import Link from "next/link";
import teams from "../../teamsData";

type Props = { params: { slug: string; memberId: string } };

export default function MemberPage({ params }: Props) {
  const { slug, memberId } = params;
  const team = teams.find((t) => t.slug === slug);
  const member = team?.members?.find((m) => m.id === memberId);

  if (!team || !member) {
    return (
      <section className="min-h-screen p-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-semibold">Not found</h2>
          <p className="text-gray-600">No member matches &quot;{memberId}&quot; in team &quot;{slug}&quot;.</p>
          <Link href={`/team/${slug}`} className="text-blue-600 mt-4 block">Back to team</Link>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen p-8">
      <div className="max-w-3xl mx-auto">
        <Link href={`/team/${slug}`} className="text-blue-600 mb-4 inline-block">← Back to team</Link>
        <div className="flex gap-6 items-start">
          <div className="w-40 h-40 rounded overflow-hidden bg-gray-100">
            {member.photo ? (
              <img src={member.photo} alt={member.name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">No photo</div>
            )}
          </div>
          <div>
            <h1 className="text-2xl font-bold">{member.name}</h1>
            {member.role && <p className="text-gray-600">{member.role}</p>}
            {member.bio && <p className="mt-3 text-gray-700">{member.bio}</p>}
          </div>
        </div>
      </div>
    </section>
  );
}
