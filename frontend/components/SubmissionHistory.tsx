import { Inbox } from "lucide-react";

type Submission = {
  challenge: string;
  date: string;
  result: "Passed" | "Failed";
};

type SubmissionHistoryProps = {
  submissions: Submission[];
};

export default function SubmissionHistory({ submissions }: SubmissionHistoryProps) {
  return (
    <div>
      <h2 className="text-lg font-semibold text-text-primary mb-3">History</h2>
      {submissions.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center py-10 border border-dashed border-border-subtle rounded-card">
          <Inbox className="w-8 h-8 text-text-muted mb-2" />
          <p className="text-text-secondary text-sm">No submissions yet</p>
          <p className="text-text-muted text-xs mt-1">
            Solve a challenge to see your history here.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {submissions.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-secondary-bg/90 border border-border-subtle rounded-card text-sm"
            >
              <span className="font-medium text-text-primary">{item.challenge}</span>
              <span className="text-text-muted">{item.date}</span>
              <span
                className={
                  item.result === "Passed" ? "text-highlight" : "text-red-400"
                }
              >
                {item.result}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}