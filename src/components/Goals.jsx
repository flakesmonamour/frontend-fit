import React, { useState, useEffect } from 'react';
import { Target, Plus, CheckCircle } from 'lucide-react';
import { addGoal, getUserGoals, completeGoal } from '../mockBackend'; // Adjust the path accordingly

const Goals = ({ userId }) => {
  const [goals, setGoals] = useState([]);
  const [description, setDescription] = useState('');
  const [target, setTarget] = useState('');
  const [frequency, setFrequency] = useState('weekly');
  const [completedMessage, setCompletedMessage] = useState('');

  useEffect(() => {
    setGoals(getUserGoals(userId));
  }, [userId]);

  const handleAddGoal = () => {
    if (description && target) {
      const newGoal = addGoal(userId, description, target, frequency);
      setGoals([...goals, newGoal]);
      setDescription('');
      setTarget('');
      setFrequency('weekly');
    } else {
      alert("Please fill out all fields.");
    }
  };

  const handleCompleteGoal = (goalId) => {
    const updatedGoal = completeGoal(goalId);
    setGoals(goals.map(goal => (goal.id === goalId ? updatedGoal : goal)));
    setCompletedMessage(`Goal "${updatedGoal.description}" completed!`); // Set completion message
    setTimeout(() => setCompletedMessage(''), 3000); // Clear message after 3 seconds
  };

  return (
    <div className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-white">Goals</h2>
      {completedMessage && (
        <div className="bg-green-500 text-white p-2 rounded mb-4">
          {completedMessage}
        </div>
      )}
      <div className="space-y-4">
        {goals.map((goal) => (
          <div key={goal.id} className={`bg-white p-4 rounded-md shadow flex items-center justify-between ${goal.completed ? 'line-through opacity-50' : ''}`}>
            <div className="flex items-center">
              <Target className="text-blue-500 mr-4" size={24} />
              <span className="text-lg">{goal.description} - {goal.target} {goal.frequency}</span>
            </div>
            {!goal.completed && (
              <button
                onClick={() => handleCompleteGoal(goal.id)}
                className="text-green-500 hover:text-green-700"
              >
                <CheckCircle size={24} />
              </button>
            )}
            <input
              type="checkbox"
              className="form-checkbox h-5 w-5 text-green-500"
              checked={goal.completed}
              readOnly
            />
          </div>
        ))}
      </div>
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-4 text-white">Add New Goal</h3>
        <div className="bg-white p-4 rounded-md shadow">
          <div className="grid grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Goal Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="col-span-1 p-2 border rounded"
            />
            <input
              type="number"
              placeholder="Target"
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              className="col-span-1 p-2 border rounded"
            />
            <select
              className="col-span-1 p-2 border rounded"
              value={frequency}
              onChange={(e) => setFrequency(e.target.value)}
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>
          <button
            onClick={handleAddGoal}
            className="mt-4 w-full bg-blue-500 text-white px-4 py-2 rounded-md flex items-center justify-center hover:bg-blue-600"
          >
            <Plus className="mr-2" size={20} />
            Add Goal
          </button>
        </div>
      </div>
    </div>
  );
};

export default Goals;
