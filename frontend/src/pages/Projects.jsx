import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import Navbar from '../components/Navbar';

const Projects = () => {
  const { user } = useAuth();
  const [projects, setProjects] = useState([]);
  const [newProjectName, setNewProjectName] = useState('');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data } = await api.get('/projects');
        setProjects(data);
      } catch (error) {
        console.error('Failed to fetch projects', error);
      }
    };
    fetchProjects();
  }, []);

  const handleCreateProject = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post('/projects', { name: newProjectName, description: 'New project' });
      setProjects([...projects, data]);
      setNewProjectName('');
    } catch (error) {
      console.error('Failed to create project', error);
    }
  };

  const handleDeleteProject = async (id) => {
    if (window.confirm('Are you sure you want to delete this project? All associated tasks will also be deleted.')) {
      try {
        await api.delete(`/projects/${id}`);
        setProjects(projects.filter(p => p._id !== id));
        alert('Project deleted successfully');
      } catch (error) {
        console.error('Failed to delete project', error);
        alert('Could not delete project');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="p-8 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Projects</h1>
        
        {user?.role === 'Admin' && (
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 mb-8">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">Create Project</h2>
            <form onSubmit={handleCreateProject} className="flex gap-4">
              <input 
                type="text" 
                placeholder="Project Name" 
                className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={newProjectName}
                onChange={(e) => setNewProjectName(e.target.value)}
                required
              />
              <button type="submit" className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700">
                Create
              </button>
            </form>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map(project => (
            <div key={project._id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-xl text-gray-800">{project.name}</h3>
                {user?.role === 'Admin' && (
                  <button 
                    onClick={() => handleDeleteProject(project._id)}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50 px-2 py-1 rounded transition-colors text-sm font-medium"
                  >
                    Delete
                  </button>
                )}
              </div>
              <p className="text-gray-600 mb-4">{project.description}</p>
              <div className="text-sm text-gray-500">
                Created By: {project.createdBy?.name || 'Unknown'}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
