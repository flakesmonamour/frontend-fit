import React from 'react';
import { LogOut } from 'lucide-react';

const Header = ({ user, onLogout }) => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-600">Fitness Tracker</h1>
        <div className="flex items-center">
          <span className="mr-4">Welcome, {user.name}</span>
          <button
            onClick={onLogout}
            className="flex items-center bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            <LogOut className="mr-2" size={20} />
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;