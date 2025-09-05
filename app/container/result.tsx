'use client';

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';

interface ResultProps {
  scores: Record<string, number>;
  onRestart?: () => void;
}

export const Result = (props: ResultProps) => {
  const entries = Object.entries(props.scores).sort((a, b) => b[1] - a[1]);
  const chartData = entries.map(([name, value]) => ({ name, value }));

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-6 px-4">
      <div className="w-full max-w-2xl">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <XAxis
              dataKey="name"
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value}`}
            />
            <Bar
              dataKey="value"
              fill="currentColor"
              radius={[4, 4, 0, 0]}
              className="fill-purple-600"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
      {props.onRestart && (
        <button
          type="button"
          className="rounded-md bg-gray-800 px-4 py-2 text-white hover:bg-gray-900"
          onClick={props.onRestart}
        >
          شروع مجدد
        </button>
      )}
    </div>
  );
};
