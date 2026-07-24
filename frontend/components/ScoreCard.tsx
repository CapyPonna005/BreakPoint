import Card from "@/components/Card";

type ScoreCardProps = {
  challenge: string;
  score: string;
  testsPassed: number;
  testsTotal: number;
  submittedAt: string;
};

export default function ScoreCard({
  challenge,
  score,
  testsPassed,
  testsTotal,
  submittedAt,
}: ScoreCardProps) {
  return (
    <Card>
      <p className="text-sm text-gray-500 mb-1">Last Submission</p>
      <h2 className="text-lg font-semibold mb-2">{challenge}</h2>
      <div className="flex items-center gap-4">
        <span className="text-2xl font-bold text-green-600">{score}</span>
        <span className="text-sm text-gray-500">
          {testsPassed}/{testsTotal} tests passed
        </span>
        <span className="text-sm text-gray-400">{submittedAt}</span>
      </div>
    </Card>
  );
}