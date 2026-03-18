import TeamReveal from "./TeamReveal";

export default function TeamList({ teams }) {
  return (
    <div className="grid gap-6">
      {teams.map((team, index) => (
        <TeamReveal key={team.slug} team={team} index={index} />
      ))}
    </div>
  );
}
