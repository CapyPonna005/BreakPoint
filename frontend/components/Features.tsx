import { Bug, PenLine, Sparkles, Wand2 } from "lucide-react";
import SectionTitle from "@/components/SectionTitle";
import Container from "@/components/Container";

const features = [
  {
    icon: Bug,
    title: "Bug-Fix Mode",
    description: "Find and fix intentional bugs in real code snippets.",
    accent: "accent" as const,
  },
  {
    icon: PenLine,
    title: "Fill-in-the-Blank Mode",
    description: "Complete missing code to reinforce syntax and logic.",
    accent: "highlight" as const,
  },
  {
    icon: Sparkles,
    title: "AI-Graded Feedback",
    description: "Get instant, AI-powered evaluation of your solutions.",
    accent: "accent" as const,
  },
  {
    icon: Wand2,
    title: "Turn Any Code Into a Challenge",
    description:
      "Paste a snippet or upload a screenshot — our AI finds a realistic bug and builds a challenge around it, instantly.",
    accent: "highlight" as const,
  },
];

export default function Features() {
  return (
    <section className="w-full bg-primary-bg py-20">
      <Container>
        <SectionTitle eyebrow="What you'll practice">Features</SectionTitle>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon;
            const glowColor = feature.accent === "accent" ? "bg-accent" : "bg-highlight";
            const iconColor = feature.accent === "accent" ? "text-accent" : "text-highlight";

            return (
              <div
                key={feature.title}
                className="group relative p-[1px] rounded-card bg-gradient-to-br from-white/15 to-transparent hover:from-white/30 transition-all"
              >
                <div className="relative overflow-hidden rounded-card bg-gradient-to-br from-secondary-bg to-secondary-bg/70 p-6 h-full transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-lg">
                  <div
                    className={`absolute -top-6 -right-6 w-24 h-24 ${glowColor} opacity-20 blur-2xl rounded-full pointer-events-none`}
                  />
                  <div
                    className={`relative w-10 h-10 rounded-button bg-primary-bg flex items-center justify-center mb-4 ${iconColor}`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="relative text-lg font-semibold text-text-primary mb-2">
                    {feature.title}
                  </h3>
                  <p className="relative text-text-muted text-sm">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}