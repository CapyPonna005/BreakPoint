import ScoreCard from "@/components/ScoreCard";
import AIFeedbackCard from "@/components/AIFeedbackCard";
import SubmissionHistory from "@/components/SubmissionHistory";

const lastSubmission = {
  challenge: "Fix the Off-by-One Loop",
  score: "100%",
  testsPassed: 3,
  testsTotal: 3,
  submittedAt: "2 minutes ago",
};

const aiFeedback =
  "Great job! Your fix correctly adjusts the loop condition to prevent the extra iteration. Consider adding a comment explaining why '<' is used instead of '<=' to help future readers understand the boundary condition at a glance.";

const history: { challenge: string; date: string; result: "Passed" | "Failed" }[] = [
  { challenge: "Fix the Off-by-One Loop", date: "Today", result: "Passed" },
  { challenge: "Complete the Binary Search", date: "Yesterday", result: "Passed" },
  { challenge: "Fix the Null Pointer Check", date: "2 days ago", result: "Failed" },
];

export default function ResultsPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Results</h1>

      <div className="flex flex-col gap-4 mb-8">
        <ScoreCard
          challenge={lastSubmission.challenge}
          score={lastSubmission.score}
          testsPassed={lastSubmission.testsPassed}
          testsTotal={lastSubmission.testsTotal}
          submittedAt={lastSubmission.submittedAt}
        />
        <AIFeedbackCard feedback={aiFeedback} />
      </div>

      <SubmissionHistory submissions={history} />
    </div>
  );
}