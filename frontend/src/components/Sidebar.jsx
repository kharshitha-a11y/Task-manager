import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="w-64 bg-gray-800 text-white min-h-screen p-4">
      <h2 className="text-2xl font-bold mb-8">Menu</h2>
      <nav className="space-y-2">
        <Link to="/" className="block p-3 rounded hover:bg-gray-700">Dashboard</Link>
        <Link to="/projects" className="block p-3 rounded hover:bg-gray-700">Projects</Link>
        <Link to="/tasks" className="block p-3 rounded hover:bg-gray-700">Tasks</Link>
      </nav>
    </div>
  );
};

export default Sidebar;
