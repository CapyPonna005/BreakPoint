import { AlertTriangle, Lightbulb } from "lucide-react";
import Card from "@/components/Card";

type NoteSeverity = "critical" | "suggestion";

type FeedbackNote = {
  severity: NoteSeverity;
  text: string;
};

type AIFeedbackCardProps = {
  feedback: string;
  notes?: FeedbackNote[];
};

const severityStyles: Record<
  NoteSeverity,
  { icon: typeof AlertTriangle; text: string; bg: string }
> = {
  critical: { icon: AlertTriangle, text: "text-red-400", bg: "bg-red-500/10" },
  suggestion: { icon: Lightbulb, text: "text-yellow-400", bg: "bg-yellow-500/10" },
};

export default function AIFeedbackCard({ feedback, notes = [] }: AIFeedbackCardProps) {
  return (
    <Card>
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xs font-medium px-2 py-1 bg-accent/15 text-accent rounded-badge">
          AI Feedback
        </span>
      </div>

      <p className="text-text-secondary text-sm leading-relaxed mb-3">{feedback}</p>

      {notes.length > 0 && (
        <ul className="flex flex-col gap-1.5">
          {notes.map((note, index) => {
            const style = severityStyles[note.severity];
            const Icon = style.icon;
            return (
              <li
                key={index}
                className={`flex items-start gap-2 text-sm rounded-input px-2.5 py-1.5 ${style.bg}`}
              >
                <Icon className={`w-4 h-4 mt-0.5 flex-shrink-0 ${style.text}`} />
                <span className={style.text}>{note.text}</span>
              </li>
            );
          })}
        </ul>
      )}
    </Card>
  );
}