const links = [
  { label: "Overview", href: "/dashboard" },
  { label: "Practice", href: "/dashboard/practice" },
  { label: "Snippets", href: "/dashboard/snippets" },
];

export default function Sidebar() {
  return (
    <aside className="w-56 shrink-0 border-r min-h-screen p-4">
      <nav className="flex flex-col gap-2">
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="px-3 py-2 rounded-md text-gray-600 hover:bg-gray-100"
          >
            {link.label}
          </a>
        ))}
      </nav>
    </aside>
  );
}