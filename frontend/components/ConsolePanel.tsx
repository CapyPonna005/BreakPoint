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
  stdin: string;
  onStdinChange: (value: string) => void;
  onRun: () => void;
  running: boolean;
};

export default function ConsolePanel({
  lines,
  stdin,
  onStdinChange,
  onRun,
  running,
}: ConsolePanelProps) {
  return (
    <div className="bg-surface border border-border-subtle rounded-input font-mono text-sm overflow-hidden">
      <div className="p-4 h-32 overflow-y-auto whitespace-pre-wrap">
        {lines.length === 0 ? (
          <p className="text-text-muted">
            Type any input below (if your program needs it), then press Run.
          </p>
        ) : (
          lines.map((line, index) => (
            <p key={index} className={lineColors[line.type]}>
              {line.message}
            </p>
          ))
        )}
      </div>
      <div className="flex items-center gap-2 border-t border-border-subtle px-4 py-2">
        <span className="text-accent">&gt;</span>
        <input
          type="text"
          value={stdin}
          onChange={(e) => onStdinChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !running) onRun();
          }}
          disabled={running}
          placeholder="Input for your program (optional)"
          className="flex-1 bg-transparent text-text-primary placeholder:text-text-muted outline-none disabled:opacity-50"
        />
      </div>
    </div>
  );
}