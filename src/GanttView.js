// src/GanttView.js
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

export default function GanttView({ tasks }) {
  const data = tasks.map(t => ({
    name: `#${t.id} ${t.name}`,
    start: t.start.getTime(),
    duration: (t.end - t.start) / (1000 * 60 * 60 * 24) + 1,
  }));

  return (
    <ResponsiveContainer width="100%" height={tasks.length * 50}>
      <BarChart
        data={data}
        layout="vertical"                         {/* Vertical layout :contentReference[oaicite:16]{index=16} */}
        margin={{ top: 20, right: 20, left: 150, bottom: 20 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          type="number"
          domain={['dataMin', 'dataMax']}
          tickFormatter={ts => new Date(ts).toLocaleDateString()}
        />
        <YAxis type="category" dataKey="name" width={150} />
        <Tooltip
          labelFormatter={label => label}
          formatter={(value, name) =>
            name === 'start'
              ? new Date(value).toLocaleDateString()
              : `${value} days`
          }                                         {/* Custom Tooltip :contentReference[oaicite:17]{index=17} */}
        />
        <Bar dataKey="duration" barSize={20} />
      </BarChart>
    </ResponsiveContainer>
  );
}
