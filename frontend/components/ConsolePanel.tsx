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
  running: boolean;
};

export default function ConsolePanel({ lines, stdin, onStdinChange, running }: ConsolePanelProps) {
  return (
    <div className="flex flex-col gap-3">
      {/* Output */}
      <div className="bg-surface border border-border-subtle rounded-input font-mono text-sm overflow-hidden">
        <div className="p-4 h-32 overflow-y-auto whitespace-pre-wrap">
          {lines.length === 0 ? (
            <p className="text-text-muted">Program output will appear here after you press Run.</p>
          ) : (
            lines.map((line, index) => (
              <p key={index} className={lineColors[line.type]}>
                {line.message}
              </p>
            ))
          )}
        </div>
      </div>

      {/* Input — separate from output, all input entered upfront before Run */}
      <div className="bg-surface border border-border-subtle rounded-input font-mono text-sm overflow-hidden">
        <div className="flex items-center justify-between px-4 pt-2">
          <span className="text-xs text-text-muted">Program Input (stdin)</span>
          <span className="text-xs text-text-muted">One value per line</span>
        </div>
        <textarea
          value={stdin}
          onChange={(e) => onStdinChange(e.target.value)}
          disabled={running}
          placeholder={"e.g.\n5\nhello\n42"}
          rows={3}
          className="w-full resize-y bg-transparent text-text-primary placeholder:text-text-muted outline-none disabled:opacity-50 px-4 py-2"
        />
      </div>
    </div>
  );
}