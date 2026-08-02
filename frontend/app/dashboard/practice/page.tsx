import { createClient } from "@/lib/supabase/server";
import { mapRowToProblem, type Problem } from "@/data/problems";
import PracticeList from "@/components/PracticeList";

export default async function PracticePage() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("problems")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Failed to load problems:", error);
  }

  const problems: Problem[] = (data ?? []).map(mapRowToProblem);

  return <PracticeList problems={problems} />;
}