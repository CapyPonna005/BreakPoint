import SectionTitle from "@/components/SectionTitle";
import Container from "@/components/Container";

const steps = [
  {
    number: "1",
    title: "Choose or Create a Challenge",
    description: "Pick from our library, or paste/screenshot code you want to learn from.",
  },
  {
    number: "2",
    title: "Solve It",
    description: "Fix the bug or complete the missing code directly in the editor.",
  },
  {
    number: "3",
    title: "Get AI Feedback",
    description: "Submit your solution and get instant, AI-graded feedback.",
  },
];

export default function HowItWorks() {
  return (
    <section className="w-full bg-surface py-20">
      <Container>
        <SectionTitle eyebrow="The process">How BreakPoint Works</SectionTitle>
        <div className="flex flex-col sm:flex-row gap-6">
          {steps.map((step, index) => (
            <div key={step.number} className="flex-1 relative">
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent to-highlight flex items-center justify-center text-white font-bold text-lg mb-4">
                  {step.number}
                </div>
                <h3 className="text-lg font-semibold text-text-primary mb-2">
                  {step.title}
                </h3>
                <p className="text-text-muted text-sm max-w-xs">
                  {step.description}
                </p>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden sm:block absolute top-6 left-[calc(50%+2rem)] w-[calc(100%-4rem)] h-[2px] bg-gradient-to-r from-border-subtle to-transparent" />
              )}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}