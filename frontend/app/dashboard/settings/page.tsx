import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import SettingsForm from "@/components/SettingsForm";

export default async function SettingsPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("username, bio, avatar_url")
    .eq("id", user.id)
    .single();

  return (
    <div className="min-h-screen bg-primary-bg p-6">
      <div className="max-w-xl mx-auto">
        <h1 className="text-2xl font-bold text-text-primary mb-1">Settings</h1>
        <p className="text-text-muted text-sm mb-6">
          Manage your profile, username, and avatar.
        </p>

        <SettingsForm
          userId={user.id}
          initialFullName={user.user_metadata?.full_name ?? ""}
          initialUsername={profile?.username ?? ""}
          initialBio={profile?.bio ?? ""}
          initialAvatarUrl={profile?.avatar_url ?? null}
        />
      </div>
    </div>
  );
}