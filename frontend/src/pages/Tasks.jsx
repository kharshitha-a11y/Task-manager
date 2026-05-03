import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import Navbar from '../components/Navbar';

const Tasks = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [newTaskProject, setNewTaskProject] = useState('');
  const [newTaskAssignee, setNewTaskAssignee] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: tasksData } = await api.get('/tasks');
        setTasks(tasksData);
        
        if (user?.role === 'Admin') {
          const { data: projectsData } = await api.get('/projects');
          setProjects(projectsData);
          
          const { data: usersData } = await api.get('/users');
          setUsers(usersData);
          
          if (projectsData.length > 0) setNewTaskProject(projectsData[0]._id);
          if (usersData.length > 0) setNewTaskAssignee(usersData[0]._id);
        }
      } catch (error) {
        console.error('Failed to fetch data', error);
      }
    };
    fetchData();
  }, [user]);

  const handleCreateTask = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post('/tasks', {
        title: newTaskTitle,
        description: newTaskDescription,
        project: newTaskProject,
        assignedTo: newTaskAssignee
      });
      // Re-fetch tasks to get populated fields
      const { data: tasksData } = await api.get('/tasks');
      setTasks(tasksData);
      
      setNewTaskTitle('');
      setNewTaskDescription('');
    } catch (error) {
      console.error('Failed to create task', error);
      alert('Could not create task');
    }
  };

  const updateStatus = async (taskId, newStatus) => {
    try {
      const { data } = await api.put(`/tasks/${taskId}/status`, { status: newStatus });
      setTasks(tasks.map(t => t._id === taskId ? data : t));
    } catch (error) {
      console.error('Failed to update task status', error);
      alert('Could not update task status');
    }
  };

  const handleDeleteTask = async (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await api.delete(`/tasks/${id}`);
        setTasks(tasks.filter(t => t._id !== id));
        alert('Task deleted successfully');
      } catch (error) {
        console.error('Failed to delete task', error);
        alert('Could not delete task');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="p-8 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Tasks</h1>
        
        {user?.role === 'Admin' && (
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 mb-8">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">Create Task</h2>
            <form onSubmit={handleCreateTask} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input 
                type="text" 
                placeholder="Task Title" 
                className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                required
              />
              <input 
                type="text" 
                placeholder="Description" 
                className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={newTaskDescription}
                onChange={(e) => setNewTaskDescription(e.target.value)}
              />
              <select 
                className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={newTaskProject}
                onChange={(e) => setNewTaskProject(e.target.value)}
                required
              >
                <option value="" disabled>Select Project</option>
                {projects.map(p => <option key={p._id} value={p._id}>{p.name}</option>)}
              </select>
              <select 
                className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={newTaskAssignee}
                onChange={(e) => setNewTaskAssignee(e.target.value)}
                required
              >
                <option value="" disabled>Select Assignee</option>
                {users.map(u => <option key={u._id} value={u._id}>{u.name} ({u.email})</option>)}
              </select>
              <div className="md:col-span-2">
                <button type="submit" className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700">
                  Create Task
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Project</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assigned To</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {tasks.map((task) => (
                <tr key={task._id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{task.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{task.project?.name || '-'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{task.assignedTo?.name || 'Unassigned'}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${task.status === 'Done' ? 'bg-green-100 text-green-800' : 
                        task.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-gray-100 text-gray-800'}`}>
                      {task.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex space-x-2 items-center">
                    <select 
                      className="border rounded text-xs p-1"
                      value={task.status}
                      onChange={(e) => updateStatus(task._id, e.target.value)}
                    >
                      <option value="To Do">To Do</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Done">Done</option>
                    </select>
                    {user?.role === 'Admin' && (
                      <button 
                        onClick={() => handleDeleteTask(task._id)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50 px-2 py-1 rounded transition-colors text-xs font-medium"
                      >
                        Delete
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Tasks;
