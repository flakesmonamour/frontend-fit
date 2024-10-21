import React, { useState, useEffect } from 'react';
import { Activity, BarChart3, Users } from 'lucide-react';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import Workouts from './components/Workouts';
import Goals from './components/Goals';
import Groups from './components/Groups';
import { loginUser, registerUser } from './mockBackend';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isSignUp, setIsSignUp] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = (email, password) => {
    const loggedInUser = loginUser(email, password);
    if (loggedInUser) {
      setIsLoggedIn(true);
      setUser(loggedInUser);
      localStorage.setItem('currentUser', JSON.stringify(loggedInUser));
    } else {
      alert('Invalid email or password');
    }
  };

  const handleSignUp = (name, email, password) => {
    const newUser = registerUser(name, email, password);
    setIsLoggedIn(true);
    setUser(newUser);
    localStorage.setItem('currentUser', JSON.stringify(newUser));
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard user={user} />;
      case 'workouts':
        return <Workouts user={user} />;
      case 'goals':
        return <Goals />;
      case 'groups':
        return <Groups user={user} />;
      default:
        return <Dashboard user={user} />;
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md w-96">
          <h1 className="text-2xl font-bold mb-4 text-center">Fitness Tracker</h1>
          {isSignUp ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSignUp(e.target.name.value, e.target.email.value, e.target.password.value);
              }}
            >
              <input
                type="text"
                name="name"
                placeholder="Name"
                className="w-full p-2 mb-4 border rounded"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="w-full p-2 mb-4 border rounded"
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="w-full p-2 mb-4 border rounded"
                required
              />
              <button
                type="submit"
                className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
              >
                Sign Up
              </button>
            </form>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleLogin(e.target.email.value, e.target.password.value);
              }}
            >
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="w-full p-2 mb-4 border rounded"
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="w-full p-2 mb-4 border rounded"
                required
              />
              <button
                type="submit"
                className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
              >
                Login
              </button>
            </form>
          )}
        </div>
        <div className="mt-4 flex space-x-4">
          <button
            onClick={() => setIsSignUp(false)}
            className={`px-4 py-2 rounded ${!isSignUp ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            Login
          </button>
          <button
            onClick={() => setIsSignUp(true)}
            className={`px-4 py-2 rounded ${isSignUp ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            Sign Up
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header user={user} onLogout={handleLogout} />
      <div className="container mx-auto px-4 py-8">
        <nav className="flex mb-8">
          <button
            className={`flex items-center mr-4 px-4 py-2 rounded-md ${
              activeTab === 'dashboard' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'
            }`}
            onClick={() => setActiveTab('dashboard')}
          >
            <BarChart3 className="mr-2" size={20} />
            Dashboard
          </button>
          <button
            className={`flex items-center mr-4 px-4 py-2 rounded-md ${
              activeTab === 'workouts' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'
            }`}
            onClick={() => setActiveTab('workouts')}
          >
            <Activity className="mr-2" size={20} />
            Workouts
          </button>
          <button
            className={`flex items-center mr-4 px-4 py-2 rounded-md ${
              activeTab === 'goals' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'
            }`}
            onClick={() => setActiveTab('goals')}
          >
            <BarChart3 className="mr-2" size={20} />
            Goals
          </button>
          <button
            className={`flex items-center px-4 py-2 rounded-md ${
              activeTab === 'groups' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'
            }`}
            onClick={() => setActiveTab('groups')}
          >
            <Users className="mr-2" size={20} />
            Groups
          </button>
        </nav>
        {renderContent()}
      </div>
    </div>
  );
}

export default App;
