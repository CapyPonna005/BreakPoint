type SectionTitleProps = {
  children: React.ReactNode;
  eyebrow?: string;
};

export default function SectionTitle({ children, eyebrow }: SectionTitleProps) {
  return (
    <div className="text-center mb-12">
      {eyebrow && (
        <span className="inline-block text-xs font-medium px-3 py-1 bg-accent/15 text-accent rounded-badge mb-3">
          {eyebrow}
        </span>
      )}
      <h2 className="text-3xl sm:text-4xl font-bold text-text-primary">
        {children}
      </h2>
      <div className="w-16 h-1 bg-gradient-to-r from-accent to-highlight rounded-badge mx-auto mt-4" />
    </div>
  );
}