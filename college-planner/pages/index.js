import { useState } from 'react';
import timetableData from '../timetable.json';

export default function Home() {
  const [selectedBatch, setSelectedBatch] = useState('');
  const [selectedDay, setSelectedDay] = useState('MON');

  const batches = Array.from(new Set(timetableData.map(e => e.batch))).sort();
  const days = ['MON','TUE','WED','THU','FRI','SAT'];

  const filtered = timetableData.filter(e =>
    (selectedBatch ? e.batch === selectedBatch : true) &&
    (selectedDay ? e.day === selectedDay : true)
  );

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-center">College Timetable Planner</h1>
      <div className="flex flex-wrap gap-4 justify-center mb-6">
        <select value={selectedBatch} onChange={e => setSelectedBatch(e.target.value)} className="border rounded p-2">
          <option value="">All Batches</option>
          {batches.map(b => <option key={b} value={b}>{b}</option>)}
        </select>
        <select value={selectedDay} onChange={e => setSelectedDay(e.target.value)} className="border rounded p-2">
          {days.map(d => <option key={d} value={d}>{d}</option>)}
        </select>
      </div>
      <div className="overflow-x-auto">
        <table className="border-collapse w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">Time</th>
              <th className="border p-2">Batch</th>
              <th className="border p-2">Course</th>
              <th className="border p-2">Room</th>
              <th className="border p-2">Teacher</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length > 0 ? (
              filtered.map((row, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="border p-2 text-center">{row.timeSlot}</td>
                  <td className="border p-2 text-center">{row.batch}</td>
                  <td className="border p-2">{row.courseName}</td>
                  <td className="border p-2 text-center">{row.room}</td>
                  <td className="border p-2">{row.teacher}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center p-4 text-gray-500">No classes found for selected filters</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
