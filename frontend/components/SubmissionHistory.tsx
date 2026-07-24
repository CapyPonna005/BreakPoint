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
      <h2 className="text-lg font-semibold mb-3">History</h2>
      <div className="flex flex-col gap-2">
        {submissions.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 border rounded-lg text-sm"
          >
            <span className="font-medium">{item.challenge}</span>
            <span className="text-gray-500">{item.date}</span>
            <span
              className={
                item.result === "Passed" ? "text-green-600" : "text-red-600"
              }
            >
              {item.result}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}