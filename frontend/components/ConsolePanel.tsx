type ConsoleLine = {
  type: "log" | "error" | "success";
  message: string;
};

const lineColors: Record<ConsoleLine["type"], string> = {
  log: "text-text-muted",
  error: "text-red-400",
  success: "text-highlight",
};

type ConsolePanelProps = {
  lines: ConsoleLine[];
};

export default function ConsolePanel({ lines }: ConsolePanelProps) {
  return (
    <div className="bg-surface border border-border-subtle rounded-input p-4 font-mono text-sm h-40 overflow-y-auto">
      {lines.length === 0 ? (
        <p className="text-text-muted">Click "Run" to see output.</p>
      ) : (
        lines.map((line, index) => (
          <p key={index} className={lineColors[line.type]}>
            {line.message}
          </p>
        ))
      )}
    </div>
  );
}