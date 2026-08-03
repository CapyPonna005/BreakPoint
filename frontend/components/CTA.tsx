import Link from "next/link";
import Container from "@/components/Container";

export default function CTA() {
  return (
    <section className="w-full bg-primary-bg py-20">
      <Container>
        <div className="p-[1px] rounded-card bg-gradient-to-br from-accent/40 to-highlight/40">
          <div className="rounded-card bg-gradient-to-br from-secondary-bg to-secondary-bg/70 p-10 sm:p-14 text-center relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-accent opacity-20 blur-3xl rounded-full pointer-events-none" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-highlight opacity-20 blur-3xl rounded-full pointer-events-none" />

            <h2 className="relative text-3xl sm:text-4xl font-bold text-text-primary mb-4">
              Ready to level up?
            </h2>
            <p className="relative text-text-secondary max-w-xl mx-auto mb-8">
              Practice curated challenges, or turn your own code into one — no setup required.
            </p>
            <Link
              href="/register"
              className="relative inline-block bg-accent text-white px-8 py-3 rounded-button font-medium hover:brightness-110 active:brightness-90 transition cursor-pointer"
            >
              Get Started
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}