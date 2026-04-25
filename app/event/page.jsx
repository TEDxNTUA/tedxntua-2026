import { redirect } from "next/navigation";

export default function EventIndex() {
  // Send /event -> /event/program as the default
  redirect("/event/constructionPage");
}
