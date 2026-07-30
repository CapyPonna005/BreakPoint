type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
};

export default function Button({ children, onClick }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className="px-4.5 py-2.5 bg-accent text-white rounded-button font-medium hover:brightness-110 active:brightness-90 transition cursor-pointer"
    >
      {children}
    </button>
  );
}