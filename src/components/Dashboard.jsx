import React, { useEffect, useState } from 'react';
import { Activity, Flame, Target } from 'lucide-react';
import { getUserWorkouts } from '../mockBackend';

const Dashboard = ({ user }) => {
  const [totalWorkouts, setTotalWorkouts] = useState(0);
  const [totalCalories, setTotalCalories] = useState(0);

  useEffect(() => {
    if (user) {
      const workouts = getUserWorkouts(user.id);
      setTotalWorkouts(workouts.length);
      setTotalCalories(workouts.reduce((sum, workout) => sum + workout.calories, 0));
    }
  }, [user]);

  return (
    <div className="bg-purple-100 p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-purple-800">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow flex items-center">
          <Activity className="text-blue-500 mr-4" size={32} />
          <div>
            <h3 className="text-lg font-semibold">Total Workouts</h3>
            <p className="text-3xl font-bold">{totalWorkouts}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow flex items-center">
          <Flame className="text-orange-500 mr-4" size={32} />
          <div>
            <h3 className="text-lg font-semibold">Total Calories Burned</h3>
            <p className="text-3xl font-bold">{totalCalories}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow flex items-center">
          <Target className="text-green-500 mr-4" size={32} />
          <div>
            <h3 className="text-lg font-semibold">Completed Goals</h3>
            <p className="text-3xl font-bold">0</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;