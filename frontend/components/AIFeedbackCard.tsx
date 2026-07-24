import Card from "@/components/Card";

type AIFeedbackCardProps = {
  feedback: string;
};

export default function AIFeedbackCard({ feedback }: AIFeedbackCardProps) {
  return (
    <Card>
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xs font-medium px-2 py-1 bg-purple-100 text-purple-700 rounded-full">
          AI Feedback
        </span>
      </div>
      <p className="text-gray-600 text-sm leading-relaxed">{feedback}</p>
    </Card>
  );
}