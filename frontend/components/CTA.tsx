import Button from "@/components/Button";
import Container from "@/components/Container";

export default function CTA() {
  return (
    <section className="py-16 bg-gray-50">
      <Container>
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to level up?</h2>
          <p className="text-gray-500 mb-6 max-w-xl mx-auto">
            Start practicing with real bugs and real code — no setup required.
          </p>
          <Button>Get Started</Button>
        </div>
      </Container>
    </section>
  );
}