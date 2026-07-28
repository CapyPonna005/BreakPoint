import { redirect } from "next/navigation";
import { problems } from "@/data/problems";

export default function WorkspaceIndexPage() {
  redirect(`/dashboard/workspace/${problems[0].id}`);
}