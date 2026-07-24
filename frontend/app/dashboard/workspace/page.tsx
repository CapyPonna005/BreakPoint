import ProblemPanel from "@/components/ProblemPanel";
import Workspace from "@/components/Workspace";

export default function WorkspacePage() {
  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <ProblemPanel />
      <Workspace />
    </div>
  );
}