type CardProps = {
  children: React.ReactNode;
};

export default function Card({ children }: CardProps) {
  return (
    <div className="p-6 border rounded-lg shadow-sm">
      {children}
    </div>
  );
}