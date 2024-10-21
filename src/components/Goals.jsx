import React from 'react';
import { Target, Plus } from 'lucide-react';

const Goals = () => {
  const goals = [
    { id: 1, description: '5 workouts weekly', completed: false },
    { id: 2, description: '2000 calories weekly', completed: false },
  ];

  return (
    <div className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-white">Goals</h2>
      <div className="space-y-4">
        {goals.map((goal) => (
          <div key={goal.id} className="bg-white p-4 rounded-md shadow flex items-center justify-between">
            <div className="flex items-center">
              <Target className="text-blue-500 mr-4" size={24} />
              <span className="text-lg">{goal.description}</span>
            </div>
            <input type="checkbox" className="form-checkbox h-5 w-5 text-green-500" checked={goal.completed} readOnly />
          </div>
        ))}
      </div>
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-4 text-white">Add New Goal</h3>
        <div className="bg-white p-4 rounded-md shadow">
          <div className="grid grid-cols-3 gap-4">
            <select className="col-span-1 p-2 border rounded" defaultValue="workout">
              <option value="workout">Workout</option>
              <option value="calories">Calories</option>
            </select>
            <input type="number" placeholder="Target" className="col-span-1 p-2 border rounded" />
            <select className="col-span-1 p-2 border rounded" defaultValue="weekly">
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>
          <button className="mt-4 w-full bg-blue-500 text-white px-4 py-2 rounded-md flex items-center justify-center hover:bg-blue-600">
            <Plus className="mr-2" size={20} />
            Add Goal
          </button>
        </div>
      </div>
    </div>
  );
};

export default Goals;