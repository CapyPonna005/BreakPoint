import { X } from "lucide-react";
import ScoreCard from "@/components/ScoreCard";
import AIFeedbackCard from "@/components/AIFeedbackCard";

type ResultsModalProps = {
  challenge: string;
  score: string;
  testsPassed: number;
  testsTotal: number;
  time: string;
  feedback: string;
  onClose: () => void;
};

export default function ResultsModal({
  challenge,
  score,
  testsPassed,
  testsTotal,
  time,
  feedback,
  onClose,
}: ResultsModalProps) {
  return (
    <div className="fixed inset-0 z-50 bg-primary-bg/80 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="flex justify-end mb-2">
          <button
            onClick={onClose}
            className="text-text-muted hover:text-text-primary transition cursor-pointer"
            aria-label="Close results"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="flex flex-col gap-4">
          <ScoreCard
            challenge={challenge}
            score={score}
            testsPassed={testsPassed}
            testsTotal={testsTotal}
            submittedAt={time}
          />
          <AIFeedbackCard feedback={feedback} />
        </div>
      </div>
    </div>
  );
}