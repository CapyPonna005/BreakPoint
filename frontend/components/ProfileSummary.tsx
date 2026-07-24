import Card from "@/components/Card";

export default function ProfileSummary() {
  return (
    <Card>
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-semibold">
          P
        </div>
        <div>
          <p className="font-semibold">Ponna</p>
          <p className="text-sm text-gray-500">BS Computer Science</p>
        </div>
      </div>
    </Card>
  );
}