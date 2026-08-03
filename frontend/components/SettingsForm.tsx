"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Upload, User } from "lucide-react";
import FloatingField from "@/components/FloatingField";
import { useToast } from "@/context/ToastContext";
import { createClient } from "@/lib/supabase/client";

type SettingsFormProps = {
  userId: string;
  initialFullName: string;
  initialUsername: string;
  initialBio: string;
  initialAvatarUrl: string | null;
};

export default function SettingsForm({
  userId,
  initialFullName,
  initialUsername,
  initialBio,
  initialAvatarUrl,
}: SettingsFormProps) {
  const router = useRouter();
  const supabase = createClient();
  const { showToast } = useToast();

  const [fullName, setFullName] = useState(initialFullName);
  const [username, setUsername] = useState(initialUsername);
  const [bio, setBio] = useState(initialBio);
  const [avatarUrl, setAvatarUrl] = useState(initialAvatarUrl);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleAvatarSelect(file: File) {
    if (!file.type.startsWith("image/")) return;
    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    const trimmedUsername = username.trim();
    if (!trimmedUsername) {
      setError("Username is required.");
      return;
    }

    setSaving(true);

    try {
      let newAvatarUrl = avatarUrl;

      // Upload the new avatar first, if one was picked, so we have a URL
      // ready before touching the profiles row.
      if (avatarFile) {
        const ext = avatarFile.name.split(".").pop();
        const path = `${userId}/avatar.${ext}`;

        const { error: uploadError } = await supabase.storage
          .from("avatars")
          .upload(path, avatarFile, { upsert: true });

        if (uploadError) {
          throw new Error("Failed to upload avatar. Please try again.");
        }

        const { data: publicUrlData } = supabase.storage
          .from("avatars")
          .getPublicUrl(path);

        // Cache-bust so the new image shows immediately instead of a
        // browser-cached copy of the old file at the same URL.
        newAvatarUrl = `${publicUrlData.publicUrl}?updated=${Date.now()}`;
      }

      const { error: updateError } = await supabase
        .from("profiles")
        .update({
          username: trimmedUsername,
          bio: bio.trim(),
          avatar_url: newAvatarUrl,
        })
        .eq("id", userId);

      if (updateError) {
        // Postgres unique_violation error code
        if (updateError.code === "23505") {
          setError("That username is already taken. Try another.");
        } else {
          setError("Failed to save changes. Please try again.");
        }
        return;
      }

      // Full name lives in Supabase Auth's user metadata, not the profiles
      // table — it's what DashboardHeader's "Welcome back" greeting reads.
      const trimmedFullName = fullName.trim();
      const { error: authUpdateError } = await supabase.auth.updateUser({
        data: { full_name: trimmedFullName },
      });

      if (authUpdateError) {
        setError("Saved your profile, but failed to update your name. Please try again.");
        return;
      }

      showToast("Settings saved", "success");
      router.push("/dashboard");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSaving(false);
    }
  }

  const displayAvatar = avatarPreview ?? avatarUrl;

  return (
    <form
      onSubmit={handleSave}
      className="bg-secondary-bg/90 border border-border-subtle rounded-card p-6 flex flex-col gap-5"
    >
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="relative w-16 h-16 rounded-full bg-gradient-to-br from-accent to-highlight flex items-center justify-center text-white font-bold text-lg overflow-hidden shrink-0 cursor-pointer group"
        >
          {displayAvatar ? (
            <img src={displayAvatar} alt="Avatar" className="w-full h-full object-cover" />
          ) : (
            <User className="w-7 h-7" />
          )}
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
            <Upload className="w-5 h-5 text-white" />
          </div>
        </button>
        <div>
          <p className="text-sm text-text-secondary">Profile picture</p>
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="text-xs text-accent hover:brightness-110 transition cursor-pointer"
          >
            Change avatar
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleAvatarSelect(file);
            }}
            className="hidden"
          />
        </div>
      </div>

      <FloatingField
        id="fullName"
        label="Full name"
        value={fullName}
        onChange={setFullName}
      />

      <FloatingField
        id="username"
        label="Username"
        value={username}
        onChange={setUsername}
        required
      />

      <div
        className={`relative border rounded-input px-3 py-2 transition-colors border-border-subtle focus-within:border-accent group`}
      >
        <label
          htmlFor="bio"
          className={`absolute left-2.5 -top-2.5 text-xs px-1 bg-secondary-bg transition-colors group-focus-within:text-accent ${
            bio.length > 0 ? "text-text-secondary" : "text-text-muted"
          }`}
        >
          Bio
        </label>
        <textarea
          id="bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          rows={3}
          className="w-full bg-transparent text-sm text-text-primary border-0 outline-none focus:outline-none focus-visible:outline-none resize-none p-0 pt-1"
        />
      </div>

      {error && (
        <p className="text-sm text-red-400 bg-red-500/10 px-3 py-2 rounded-input">{error}</p>
      )}

      <button
        type="submit"
        disabled={saving}
        className="self-end flex items-center gap-2 bg-accent text-white px-5 py-2.5 rounded-button font-medium hover:brightness-110 active:brightness-90 disabled:opacity-50 disabled:cursor-not-allowed transition cursor-pointer"
      >
        {saving && <Loader2 className="w-4 h-4 animate-spin" />}
        {saving ? "Saving..." : "Save Changes"}
      </button>
    </form>
  );
}