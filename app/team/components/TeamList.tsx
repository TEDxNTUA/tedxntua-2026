import TeamCard from "./TeamCard";
import TeamReveal from "./TeamReveal";
import { Team } from "../teamsData";

type Props = {
  teams: Team[];
};

export default function TeamList({ teams }: Props) {
  return (
    <div className="grid gap-6">
      {teams.map((t, i) => (
        <TeamReveal key={t.slug} team={t} index={i} />
      ))}
    </div>
  );
}
