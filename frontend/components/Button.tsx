type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
};

export default function Button({ children, onClick }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className="px-6 py-3 bg-accent text-text-primary rounded-button font-medium hover:brightness-110 active:brightness-90 transition cursor-pointer"
    >
      {children}
    </button>
  );
}