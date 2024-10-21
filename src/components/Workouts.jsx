import React, { useState, useEffect } from 'react';
import { Clock, Flame, Plus } from 'lucide-react';
import { addWorkout, getUserWorkouts } from '../mockBackend';

const Workouts = ({ user }) => {
  const [workouts, setWorkouts] = useState([]);
  const [showAddWorkout, setShowAddWorkout] = useState(false);

  useEffect(() => {
    if (user) {
      const userWorkouts = getUserWorkouts(user.id);
      setWorkouts(userWorkouts);
    }
  }, [user]);

  const handleAddWorkout = (e) => {
    e.preventDefault();
    const newWorkout = addWorkout(
      user.id,
      e.target.type.value,
      parseInt(e.target.duration.value),
      parseInt(e.target.calories.value),
      e.target.date.value
    );
    setWorkouts([...workouts, newWorkout]);
    setShowAddWorkout(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Workouts</h2>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded-md flex items-center hover:bg-green-600"
          onClick={() => setShowAddWorkout(!showAddWorkout)}
        >
          <Plus className="mr-2" size={20} />
          Add Workout
        </button>
      </div>
      {showAddWorkout && (
        <form onSubmit={handleAddWorkout} className="bg-white p-6 rounded-lg shadow-md mb-6">
          <input type="text" name="type" placeholder="Workout Type" className="w-full p-2 mb-4 border rounded" required />
          <input type="number" name="duration" placeholder="Duration (minutes)" className="w-full p-2 mb-4 border rounded" required />
          <input type="number" name="calories" placeholder="Calories Burned" className="w-full p-2 mb-4 border rounded" required />
          <input type="date" name="date" className="w-full p-2 mb-4 border rounded" required />
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
            Add Workout
          </button>
        </form>
      )}
      <div className="bg-gradient-to-r from-green-400 to-blue-500 p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4 text-white">Workout History</h3>
        {workouts.map((workout) => (
          <div key={workout.id} className="bg-white p-4 rounded-md shadow mb-4 flex justify-between items-center">
            <div>
              <h4 className="text-lg font-semibold">{workout.type}</h4>
              <div className="flex items-center text-gray-600">
                <Clock className="mr-2" size={16} />
                <span>{workout.duration} minutes</span>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center justify-end text-orange-500">
                <Flame className="mr-2" size={16} />
                <span>{workout.calories} calories</span>
              </div>
              <div className="text-sm text-gray-500">{workout.date}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Workouts;