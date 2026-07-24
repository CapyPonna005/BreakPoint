import Card from "@/components/Card";

const activity = [
  { snippet: "Fix the off-by-one loop", mode: "Bug-Fix", result: "Passed" },
  { snippet: "Complete the binary search", mode: "Fill-in-the-Blank", result: "Passed" },
  { snippet: "Fix the null pointer check", mode: "Bug-Fix", result: "Failed" },
];

export default function RecentActivity() {
  return (
    <Card>
      <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
      <ul className="flex flex-col gap-3">
        {activity.map((item) => (
          <li
            key={item.snippet}
            className="flex items-center justify-between text-sm"
          >
            <div>
              <p className="font-medium">{item.snippet}</p>
              <p className="text-gray-500">{item.mode}</p>
            </div>
            <span
              className={
                item.result === "Passed" ? "text-green-600" : "text-red-600"
              }
            >
              {item.result}
            </span>
          </li>
        ))}
      </ul>
    </Card>
  );
}