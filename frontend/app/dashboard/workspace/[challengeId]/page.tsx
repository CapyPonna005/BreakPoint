import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { mapRowToProblem } from "@/data/problems";
import ChallengeWorkspaceClient from "@/components/ChallengeWorkspaceClient";

export default async function ChallengeWorkspacePage({
  params,
}: {
  params: Promise<{ challengeId: string }>;
}) {
  const { challengeId } = await params;
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("problems")
    .select("*")
    .eq("id", challengeId)
    .single();

  if (error || !data) {
    notFound();
  }

  const problem = mapRowToProblem(data);

  return <ChallengeWorkspaceClient problem={problem} />;
}