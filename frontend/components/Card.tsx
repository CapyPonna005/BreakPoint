type CardProps = {
  children: React.ReactNode;
};

export default function Card({ children }: CardProps) {
  return (
    <div className="p-8 bg-secondary-bg/90 border border-border-subtle rounded-card shadow-md">
      {children}
    </div>
  );
}