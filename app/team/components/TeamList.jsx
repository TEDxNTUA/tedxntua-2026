
import TeamReveal from "./TeamReveal";






export default function TeamList({ teams }) {
  return (
    <div className="grid gap-6">
      {teams.map((t, i) =>
      <TeamReveal key={t.slug} team={t} index={i} />
      )}
    </div>);

}
