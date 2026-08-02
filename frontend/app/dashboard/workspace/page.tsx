import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function WorkspaceIndexPage() {
  const supabase = await createClient();

  const { data: firstProblem } = await supabase
    .from("problems")
    .select("id")
    .order("created_at", { ascending: true })
    .limit(1)
    .single();

  if (!firstProblem) {
    redirect("/dashboard/create");
  }

  redirect(`/dashboard/workspace/${firstProblem.id}`);
}