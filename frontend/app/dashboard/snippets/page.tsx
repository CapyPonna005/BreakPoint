import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { exampleSnippets } from "@/data/exampleSnippets";

export default function SnippetsPage() {
  return (
    <div className="min-h-screen bg-primary-bg p-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold text-text-primary mb-1">Snippets</h1>
        <p className="text-text-muted text-sm mb-6">
          Don&apos;t have your own code handy? Pick one of these to turn into a challenge.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {exampleSnippets.map((snippet) => (
            <Link
              key={snippet.id}
              href={`/dashboard/create?snippet=${snippet.id}`}
              className="group flex flex-col bg-secondary-bg/90 border border-border-subtle rounded-card p-4 hover:border-accent/50 transition"
            >
              <div className="flex items-center justify-between mb-2">
                <h2 className="font-medium text-text-primary text-sm">{snippet.title}</h2>
                <ArrowRight className="w-4 h-4 text-text-muted group-hover:text-accent group-hover:translate-x-0.5 transition" />
              </div>
              <pre className="bg-primary-bg border border-border-subtle rounded-input p-3 text-xs font-mono text-text-secondary overflow-hidden whitespace-pre-wrap leading-relaxed max-h-32">
                {snippet.code}
              </pre>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}