import { useState, useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
} from "recharts";

function expectedMax(M, w) {
  let sum = 0;
  for (let k = 1; k <= M; k++) {
    sum += k * (Math.pow(k / M, w) - Math.pow((k - 1) / M, w));
  }
  return sum;
}

export default function Calculator() {
  const [M, setM] = useState(30);
  const [w, setW] = useState(6);

  const singleMean = (M + 1) / 2;

  const data = useMemo(() => {
    return Array.from({ length: w }, (_, i) => {
      const rolls = i + 1;
      const ev = expectedMax(M, rolls);
      return {
        w: rolls,
        "E[max]": parseFloat(ev.toFixed(4)),
        "Single roll mean": parseFloat(singleMean.toFixed(4)),
        "Gain over single": parseFloat((ev - singleMean).toFixed(4)),
      };
    });
  }, [M, w, singleMean]);

  return (
    <div className="space-y-6">
      {/* Sliders */}
      <div className="bg-gray-900 rounded-xl p-5 space-y-5">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-300">
              Max Hit: <span className="text-white font-bold">{M}</span>
            </label>
            <span className="text-xs text-gray-500">
              Single roll mean:{" "}
              <span className="text-indigo-300 font-semibold">
                {singleMean.toFixed(3)}
              </span>
            </span>
          </div>
          <input
            type="range"
            min={2}
            max={100}
            value={M}
            onChange={(e) => setM(Number(e.target.value))}
            className="w-full accent-indigo-500"
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>2</span>
            <span>100</span>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-300">
              Number of Weaknesses:{" "}
              <span className="text-white font-bold">{w}</span>
            </label>
          </div>
          <input
            type="range"
            min={1}
            max={7}
            value={w}
            onChange={(e) => setW(Number(e.target.value))}
            className="w-full accent-emerald-500"
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>1</span>
            <span>7</span>
          </div>
        </div>
      </div>

      {/* Main chart */}
      <div className="bg-gray-900 rounded-xl p-5">
        <h2 className="text-sm font-semibold text-gray-300 mb-4">
          E[max] vs Single Roll Mean
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={data}
            margin={{ top: 4, right: 16, left: 0, bottom: 4 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis
              dataKey="w"
              label={{
                value: "Number of Weaknesses",
                position: "insideBottom",
                offset: -2,
                fill: "#9ca3af",
                fontSize: 12,
              }}
              tick={{ fill: "#9ca3af", fontSize: 11 }}
            />
            <YAxis domain={[1, M]} tick={{ fill: "#9ca3af", fontSize: 11 }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1f2937",
                border: "1px solid #374151",
                borderRadius: 8,
              }}
              labelStyle={{ color: "#e5e7eb", fontWeight: "bold" }}
              labelFormatter={(v) => `Weaknesses = ${v}`}
              formatter={(val, name) => [val.toFixed(4), name]}
            />
            <Legend wrapperStyle={{ fontSize: 12, paddingTop: 12 }} />
            <ReferenceLine
              y={M}
              stroke="#6b7280"
              strokeDasharray="4 4"
              label={{
                value: `Max (${M})`,
                fill: "#6b7280",
                fontSize: 11,
                position: "right",
              }}
            />
            <Line
              type="monotone"
              dataKey="E[max]"
              stroke="#818cf8"
              strokeWidth={2.5}
              dot={{ r: 3 }}
              activeDot={{ r: 5 }}
            />
            <Line
              type="monotone"
              dataKey="Single roll mean"
              stroke="#f59e0b"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Gain chart */}
      <div className="bg-gray-900 rounded-xl p-5">
        <h2 className="text-sm font-semibold text-gray-300 mb-4">
          Gain over Single Roll Mean
        </h2>
        <ResponsiveContainer width="100%" height={220}>
          <LineChart
            data={data}
            margin={{ top: 4, right: 16, left: 0, bottom: 4 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis
              dataKey="w"
              label={{
                value: "Number of Weaknesses",
                position: "insideBottom",
                offset: -2,
                fill: "#9ca3af",
                fontSize: 12,
              }}
              tick={{ fill: "#9ca3af", fontSize: 11 }}
            />
            <YAxis tick={{ fill: "#9ca3af", fontSize: 11 }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1f2937",
                border: "1px solid #374151",
                borderRadius: 8,
              }}
              labelStyle={{ color: "#e5e7eb", fontWeight: "bold" }}
              labelFormatter={(v) => `Weaknesses = ${v}`}
              formatter={(val) => [`+${val.toFixed(4)}`, "Gain"]}
            />
            <ReferenceLine y={0} stroke="#6b7280" />
            <Line
              type="monotone"
              dataKey="Gain over single"
              stroke="#34d399"
              strokeWidth={2.5}
              dot={{ r: 3 }}
              activeDot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Table */}
      <div className="bg-gray-900 rounded-xl p-5 overflow-x-auto">
        <h2 className="text-sm font-semibold text-gray-300 mb-3">Full Table</h2>
        <table className="w-full text-sm text-left">
          <thead>
            <tr className="text-gray-400 border-b border-gray-700">
              <th className="py-2 pr-6">Weaknesses</th>
              <th className="py-2 pr-6">E[max]</th>
              <th className="py-2 pr-6">Single mean</th>
              <th className="py-2">Gain</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr
                key={row.w}
                className="border-b border-gray-800 hover:bg-gray-800 transition-colors"
              >
                <td className="py-1.5 pr-6 text-gray-300">{row.w}</td>
                <td className="py-1.5 pr-6 text-indigo-300 font-mono">
                  {row["E[max]"].toFixed(4)}
                </td>
                <td className="py-1.5 pr-6 text-amber-300 font-mono">
                  {row["Single roll mean"].toFixed(4)}
                </td>
                <td className="py-1.5 text-emerald-400 font-mono">
                  +{row["Gain over single"].toFixed(4)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
