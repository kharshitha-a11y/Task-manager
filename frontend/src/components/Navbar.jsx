import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center space-x-8">
            <span className="text-xl font-bold text-blue-600">Team Task Manager</span>
            <div className="hidden md:flex space-x-4">
              <Link to="/" className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md font-medium">Dashboard</Link>
              <Link to="/projects" className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md font-medium">Projects</Link>
              <Link to="/tasks" className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md font-medium">Tasks</Link>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-gray-700 font-medium">Role: {user?.role}</span>
            <button 
              onClick={handleLogout}
              className="text-sm bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-4 rounded-lg transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
