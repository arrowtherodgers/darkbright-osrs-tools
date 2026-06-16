import { Link } from "react-router-dom";

const tools = [
  {
    path: "/tzhaar",
    name: "TzHaar-Ket-Breaker",
    description:
      "Expected hit calculator for the new Raids 4 megarare. Compares rolling damage multiple times and taking the maximum.",
    tag: "Combat",
  },
];

export default function Home() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">
          DarkBright's OSRS Tools
        </h1>
        <p className="text-gray-400 mt-2">
          A collection of calculators and references for Old School RuneScape.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {tools.map((tool) => (
          <Link
            key={tool.path}
            to={tool.path}
            className="block bg-gray-900 border border-gray-700 rounded-xl p-5 hover:border-yellow-500 transition-colors group"
          >
            <div className="flex items-start justify-between mb-2">
              <h2 className="text-white font-semibold group-hover:text-yellow-400 transition-colors">
                {tool.name}
              </h2>
              <span className="text-xs bg-gray-800 text-gray-400 px-2 py-0.5 rounded-full">
                {tool.tag}
              </span>
            </div>
            <p className="text-gray-400 text-sm">{tool.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
