// src/App.js
import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import TaskBoard from './TaskBoard';
import GanttView from './GanttView';

function App() {
  const [tasks, setTasks] = useState([]);            // useState Hook :contentReference[oaicite:9]{index=9}
  const [view, setView] = useState('kanban');

  useEffect(() => {                                  // useEffect Hook :contentReference[oaicite:10]{index=10}
    Papa.parse('/predev_work.csv', {                 // Fetch & parse CSV :contentReference[oaicite:11]{index=11}
      download: true,
      header: true,                                  // Header row → keys by field name :contentReference[oaicite:12]{index=12}
      complete: ({ data }) => {
        // Filter out any blank rows, convert dates/IDs
        const parsed = data
          .filter(r => r['Task ID'])
          .map(r => ({
            id: +r['Task ID'],
            project: r['Project'],
            name: r['Task Name'],
            assignedTo: r['Assigned To'],
            start: new Date(r['Start Date']),
            end: new Date(r['End Date']),
            status: r['Status'],
            priority: r['Priority'],
            notes: r['Notes'],
          }));
        setTasks(parsed);
      }
    });
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <header>
        <h1>Web4 Pre-Dev Tracker</h1>
        <button onClick={() => setView('kanban')}>Kanban</button>
        <button onClick={() => setView('gantt')}>Gantt</button>
      </header>
      {view === 'kanban'
        ? <TaskBoard tasks={tasks} />
        : <GanttView tasks={tasks} />}
    </div>
  );
}

export default App;
