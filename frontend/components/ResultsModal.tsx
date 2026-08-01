import { X } from "lucide-react";
import ScoreCard from "@/components/ScoreCard";
import AIFeedbackCard from "@/components/AIFeedbackCard";
import Tooltip from "@/components/Tooltip";

type NoteSeverity = "critical" | "suggestion";

type FeedbackNote = {
  severity: NoteSeverity;
  text: string;
};

type ResultsModalProps = {
  challenge: string;
  score: string;
  testsPassed: number;
  testsTotal: number;
  time: string;
  feedback: string;
  notes?: FeedbackNote[];
  onClose: () => void;
};

export default function ResultsModal({
  challenge,
  score,
  testsPassed,
  testsTotal,
  time,
  feedback,
  notes = [],
  onClose,
}: ResultsModalProps) {
  return (
    <div className="fixed inset-0 z-50 bg-primary-bg/80 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="flex justify-end mb-2">
          <Tooltip label="Close">
            <button
              onClick={onClose}
              className="text-text-muted hover:text-text-primary transition cursor-pointer"
              aria-label="Close results"
            >
              <X className="w-5 h-5" />
            </button>
          </Tooltip>
        </div>
        <div className="flex flex-col gap-4">
          <ScoreCard
            challenge={challenge}
            score={score}
            testsPassed={testsPassed}
            testsTotal={testsTotal}
            submittedAt={time}
          />
          <AIFeedbackCard feedback={feedback} notes={notes} />
        </div>
      </div>
    </div>
  );
}