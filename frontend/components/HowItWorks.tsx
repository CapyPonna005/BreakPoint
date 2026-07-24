import SectionTitle from "@/components/SectionTitle";
import Container from "@/components/Container";

const steps = [
  {
    number: "1",
    title: "Pick a Snippet",
    description: "Choose a bug-fix or fill-in-the-blank challenge from the library.",
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
    <section className="py-16">
      <Container>
        <SectionTitle>How BreakPoint Works</SectionTitle>
        <div className="flex flex-col sm:flex-row gap-6">
          {steps.map((step) => (
            <div key={step.number} className="flex-1 text-center p-6">
              <div className="text-2xl font-bold text-gray-400 mb-2">
                {step.number}
              </div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-500">{step.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}