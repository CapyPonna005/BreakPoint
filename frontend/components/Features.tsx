import Card from "@/components/Card";
import SectionTitle from "@/components/SectionTitle";
import Container from "@/components/Container";

const features = [
  {
    title: "Bug-Fix Mode",
    description: "Find and fix intentional bugs in real code snippets.",
  },
  {
    title: "Fill-in-the-Blank Mode",
    description: "Complete missing code to reinforce syntax and logic.",
  },
  {
    title: "AI-Graded Feedback",
    description: "Get instant, AI-powered evaluation of your solutions.",
  },
  {
    title: "Snippet Manager",
    description: "Save and organize code snippets you want to practice.",
  },
];

export default function Features() {
  return (
    <section className="py-16">
      <Container>
        <SectionTitle>Features</SectionTitle>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {features.map((feature) => (
            <Card key={feature.title}>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-500">{feature.description}</p>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}