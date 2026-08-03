import Link from "next/link";

export default function Hero() {
  return (
    <section className="w-full bg-primary-bg px-4 py-20 sm:py-28">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="text-center lg:text-left">
          <span className="inline-block text-xs font-medium px-3 py-1 bg-accent/15 text-accent rounded-badge mb-5">
            Debug real code. Learn real skills.
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-text-primary leading-tight mb-5">
            Find the bug.
            <br />
            <span className="bg-gradient-to-r from-accent to-highlight bg-clip-text text-transparent">
              Fix your future.
            </span>
          </h1>
          <p className="text-lg text-text-secondary max-w-md mx-auto lg:mx-0 mb-8">
            BreakPoint turns debugging into your training ground — practice on
            real, broken code and get AI feedback that teaches you to think
            like a professional developer.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
            <Link
              href="/register"
              className="bg-accent text-white px-6 py-3 rounded-button font-medium hover:brightness-110 active:brightness-90 transition cursor-pointer text-center"
            >
              Start Practicing
            </Link>

            <Link
              href="#how-it-works"
              className="bg-secondary-bg border border-border-subtle text-text-primary px-6 py-3 rounded-button font-medium hover:bg-primary-bg transition cursor-pointer text-center"
            >
              See How It Works
            </Link>
          </div>
        </div>

        <div className="p-[1px] rounded-card bg-gradient-to-br from-white/15 to-transparent">
          <div className="rounded-card bg-surface p-4 shadow-lg">
            <div className="flex items-center gap-1.5 mb-3">
              <span className="w-3 h-3 rounded-full bg-red-400/70" />
              <span className="w-3 h-3 rounded-full bg-highlight/70" />
              <span className="w-3 h-3 rounded-full bg-green-400/70" />
            </div>
            <pre className="font-mono text-sm leading-relaxed overflow-x-auto">
              <code>
                <span className="text-text-muted">1</span>
                {"  "}
                <span className="text-purple-300">function</span>{" "}
                <span className="text-highlight">printNumbers</span>
                <span className="text-text-secondary">(n) {"{"}</span>
                {"\n"}
                <span className="text-text-muted">2</span>
                {"  "}
                <span className="text-purple-300">for</span>
                <span className="text-text-secondary"> (</span>
                <span className="text-purple-300">let</span>
                <span className="text-text-secondary"> i = 1; i {"<="} n; i++) {"{"}</span>
                {"\n"}
                <span className="text-text-muted">3</span>
                {"    "}
                <span className="text-highlight">console</span>
                <span className="text-text-secondary">.log(i);</span>
                {"\n"}
                <span className="text-text-muted">4</span>
                {"  "}
                <span className="text-text-secondary">{"}"}</span>
                {"\n"}
                <span className="text-text-muted">5</span>
                <span className="text-text-secondary">{"}"}</span>
              </code>
            </pre>
            <div className="mt-3 pt-3 border-t border-border-subtle flex items-center gap-2 text-xs text-accent">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              Bug detected on line 2
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}