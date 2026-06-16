import { Link, useLocation } from "react-router-dom";

const tools = [{ path: "/tzhaar", label: "TzHaar-Ket-Breaker" }];

export default function Navbar() {
  const location = useLocation();

  return (
    <nav className="bg-gray-900 border-b border-gray-700 px-6 py-4">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <Link to="/" className="text-white font-bold text-lg tracking-tight">
          ⚔️ DarkBright's OSRS Tools
        </Link>
        <div className="flex gap-6">
          {tools.map((tool) => (
            <Link
              key={tool.path}
              to={tool.path}
              className={`text-sm transition-colors ${
                location.pathname === tool.path
                  ? "text-yellow-400 font-semibold"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              {tool.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
