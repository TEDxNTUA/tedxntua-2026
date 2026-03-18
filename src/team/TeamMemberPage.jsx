import { Link, useParams } from "react-router-dom";
import MemberPhoto from "./components/MemberPhoto";
import teams from "./teamsData";

export default function TeamMemberPage() {
  const { slug = "", memberId = "" } = useParams();
  const team = teams.find((item) => item.slug === slug);
  const member = team?.members?.find((item) => item.id === memberId);

  if (!team || !member) {
    return (
      <section className="min-h-screen p-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-semibold">Not found</h2>
          <p className="text-gray-600">No member matches "{memberId}" in team "{slug}".</p>
          <Link to={`/team/${slug}`} className="text-blue-600 mt-4 block">Back to team</Link>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen p-8">
      <div className="max-w-3xl mx-auto">
        <Link to={`/team/${slug}`} className="text-blue-600 mb-4 inline-block">← Back to team</Link>
        <div className="flex gap-6 items-start">
          <MemberPhoto
            member={member}
            containerClassName="w-48 h-48 rounded bg-gray-100"
          />
          <div>
            <h1 className="text-2xl font-bold">{member.name}</h1>
            {member.role && <p className="text-gray-500 mt-1">{member.role}</p>}
          </div>
        </div>
      </div>
    </section>
  );
}
