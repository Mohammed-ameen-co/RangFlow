import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../api';
import { FaUserPlus, FaEnvelope, FaLink, FaTasks, FaTrashAlt, FaUserShield, FaBan } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useTaskContext as useSidebarTaskContext } from '../context/TaskContext';
import { useNavigate } from 'react-router-dom';

export default function TeamDashboard() {
  const { user, setUser } = useAuth();
  const [inviteCode, setInviteCode] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(true);
  const [teamMembers, setTeamMembers] = useState([]);
  const [pendingInvitations, setPendingInvitations] = useState([]);
  const [tasksOverview, setTasksOverview] = useState({});
  const { open } = useSidebarTaskContext();
  const navigate = useNavigate();

  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [assignedToMember, setAssignedToMember] = useState('');
  const [teamProducts, setTeamProducts] = useState([]); 
  const [selectedProduct, setSelectedProduct] = useState(''); 
  const [newTaskCategory, setNewTaskCategory] = useState('Todo'); 
  const [newTaskDueDate, setNewTaskDueDate] = useState(''); 

  useEffect(() => {
    if (user && user.team) {
      fetchTeamData();
      fetchTeamTasks();
      fetchTeamProducts(); 
    } else {
      setLoading(false);
    }
  }, [user]);

  const fetchTeamData = async () => {
    setLoading(true);
    try {
      const teamResponse = await api.get(`/teams/${user.team._id}`);
//       const teamData = teamResponse.data.team;
//change this line
      const teamData = teamResponse.data?.team || {};
      
      setTeamMembers(teamData.members || []);// safe default add
      setPendingInvitations((teamData.invitations || []).filter(inv => !inv.accepted));// safe default add

      if (user.role === 'Owner' || user.role === 'Admin') {
        const inviteCodeResponse = await api.get(`/teams/${user.team._id}/invite-code`);
        setInviteCode(inviteCodeResponse.data.inviteCode);
      }
    } catch (error) {
      console.error('Error fetching team data:', error);
      toast.error('Failed to fetch team data.');
    } finally {
      setLoading(false);
    }
  };

  const fetchTeamTasks = async () => {
    try {
      const response = await api.get(`/teams/${user.team._id}/tasks`);
        //const tasks = response.data.tasks;
       //change this line
        const tasks = response.data?.tasks || [];
      const overview = tasks.reduce(
        (acc, task) => {
          acc[task.category] = (acc[task.category] || 0) + 1;
          return acc;
        },
        { 'To-Do': 0, 'In Progress': 0, 'Done': 0 }
      );
      setTasksOverview(overview);
    } catch (error) {
      console.error('Error fetching team tasks:', error);
    }
  };

  const fetchTeamProducts = async () => {
    try {
      const response = await api.get('/products/team-products');
      setTeamProducts(response.data);
      if (response.data.length > 0) {
        setSelectedProduct(response.data[0]._id);
      }
    } catch (error) {
      console.error('Error fetching team products:', error);
      toast.error('Failed to fetch team products.');
    }
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    if (!selectedProduct) {
      toast.error('Please select a product for the task.');
      return;
    }
    if (!newTaskDueDate) {
      toast.error('Please select a due date for the task.');
      return;
    }
    try {
      const taskData = {
        title: newTaskTitle,
        description: newTaskDescription,
        assignedTo: assignedToMember || null,
        product: selectedProduct, 
        category: newTaskCategory, 
        dueDate: newTaskDueDate, 
      };
      await api.post('/tasks/create-team-task', taskData);
      toast.success('Team task created successfully!');
      setNewTaskTitle('');
      setNewTaskDescription('');
      setAssignedToMember('');
      setNewTaskDueDate('');
      setNewTaskCategory('Todo');
      fetchTeamTasks();
    } catch (error) {
      console.error('Error creating team task:', error);
      toast.error(error.response?.data?.message || 'Failed to create team task.');
    }
  };

  const handleInvite = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post(`/teams/${user.team._id}/invite`, { email: email });
      toast.success(res.data.message);
      setEmail('');
      fetchTeamData(); 
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to send invitation.';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(inviteCode);
    toast.success('Invite code copied to clipboard!');
  };

  const handleRemoveMember = async (memberId) => {
    if (window.confirm('Are you sure you want to remove this member?')) {
      try {
        await api.delete(`/teams/${user.team._id}/member/${memberId}`);
        setTeamMembers(prevMembers => prevMembers.filter(m => m._id !== memberId));
        toast.success('Member removed successfully!');

        if (user._id === memberId) {
          const updatedUser = { ...user, team: null, role: 'Individual' };
          setUser(updatedUser);
        }
      } catch (error) {
        console.error('Error removing member:', error);
        toast.error('Failed to remove member.');
      }
    }
  };

  const handleMakeAdmin = async (memberId) => {
    if (window.confirm('Are you sure you want to make this member an Admin?')) {
      try {
        const res = await api.put(`/teams/${user.team._id}/member/${memberId}/make-admin`);
        toast.success(res.data.message);
        fetchTeamData();
      } catch (error) {
        console.error('Error making member admin:', error);
        const errorMessage = error.response?.data?.message || 'Failed to make member an admin.';
        toast.error(errorMessage);
      }
    }
  };

  const handleRevokeInvitation = async (emailToRevoke) => {
    if (window.confirm(`Are you sure you want to revoke the invitation for ${emailToRevoke}?`)) {
      try {
        await api.delete(`/teams/${user.team._id}/invitation/${emailToRevoke}`);
        toast.success(`Invitation for ${emailToRevoke} revoked successfully!`);
        setPendingInvitations(prevInvitations => 
          prevInvitations.filter(inv => inv.email !== emailToRevoke)
        );
      } catch (error) {
        console.error('Error revoking invitation:', error);
        const errorMessage = error.response?.data?.message || 'Failed to revoke invitation.';
        toast.error(errorMessage);
      }
    }
  };

  const handleDemoteAdmin = async (memberId) => {
    if (window.confirm('Are you sure you want to demote this admin to a member?')) {
        try {
            const res = await api.put(`/teams/${user.team._id}/member/${memberId}/demote-admin`);
            toast.success(res.data.message);
            fetchTeamData(); 
        } catch (error) {
            console.error('Error demoting admin:', error);
            const errorMessage = error.response?.data?.message || 'Failed to demote admin.';
            toast.error(errorMessage);
        }
    }
  };

  const handleDeleteTeam = async () => {
    if (window.confirm('WARNING: This will permanently delete the entire team, including all its tasks and members. Are you absolutely sure?')) {
      try {
        await api.delete(`/teams/${user.team._id}`);
        toast.success('Team deleted successfully.');
        setUser({ ...user, team: null, role: 'Individual' });
        navigate('/dashboard'); 
      } catch (error) {
        console.error('Error deleting team:', error);
        const errorMessage = error.response?.data?.message || 'Failed to delete team.';
        toast.error(errorMessage);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900 text-white">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500"></div>
        <p className="ml-4 text-xl">Loading...</p>
      </div>
    );
  }

  if (!user || !user.team || teamMembers.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900 text-white">
        <p className="text-xl">You are not part of a team. Create or join a team to access this dashboard.</p>
      </div>
    );
  }

  return (
    <div className={`pt-20 px-4 sm:px-6 transition-all duration-500 min-h-screen bg-gray-900 text-white ${open ? 'ml-64' : 'ml-20'}`}>
      <h1 className="text-4xl font-bold mb-8 text-center text-purple-400">Team Dashboard</h1>

      {(user.role === 'Owner' || user.role === 'Admin') && (
        <div className="bg-gray-800 rounded-lg p-6 mb-8 shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-3">
            <FaTasks /> Task Overview
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="bg-gray-700 p-4 rounded-md">
              <h3 className="text-lg font-bold">To-Do</h3>
              <p className="text-3xl mt-2 text-red-400">{tasksOverview['To-Do']}</p>
            </div>
            <div className="bg-gray-700 p-4 rounded-md">
              <h3 className="text-lg font-bold">In Progress</h3>
              <p className="text-3xl mt-2 text-yellow-400">{tasksOverview['In Progress']}</p>
            </div>
            <div className="bg-gray-700 p-4 rounded-md">
              <h3 className="text-lg font-bold">Done</h3>
              <p className="text-3xl mt-2 text-green-400">{tasksOverview['Done']}</p>
            </div>
          </div>
        </div>
      )}

      <div className="bg-gray-800 rounded-lg p-6 mb-8 shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 flex items-center gap-3">
          <FaTasks /> Create New Team Task
        </h2>
        <form onSubmit={handleCreateTask} className="space-y-4">
          <div>
            <label htmlFor="taskTitle" className="block text-sm font-medium text-gray-400">
              Task Title
            </label>
            <input
              type="text"
              id="taskTitle"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              placeholder="Enter task title"
              className="w-full p-3 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>
          <div>
            <label htmlFor="taskDescription" className="block text-sm font-medium text-gray-400">
              Description (Optional)
            </label>
            <textarea
              id="taskDescription"
              value={newTaskDescription}
              onChange={(e) => setNewTaskDescription(e.target.value)}
              placeholder="Describe the task..."
              rows="3"
              className="w-full p-3 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
            ></textarea>
          </div>
          <div>
            <label htmlFor="product" className="block text-sm font-medium text-gray-400">
              Select Product
            </label>
            <select
              id="product"
              value={selectedProduct}
              onChange={(e) => setSelectedProduct(e.target.value)}
              className="w-full p-3 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            >
              <option value="">Select a product</option>
              {teamProducts.map((product) => (
                <option key={product._id} value={product._id}>
                  {product.name}
                </option>
              ))}
            </select>
          </div>
          {/* select category field */}
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-400">
              Select Category
            </label>
            <select
              id="category"
              value={newTaskCategory}
              onChange={(e) => setNewTaskCategory(e.target.value)}
              className="w-full p-3 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            >
              <option value="Todo">Todo</option>
              <option value="InProgress">In Progress</option>
              <option value="Done">Done</option>
            </select>
          </div>
          {/*  field due date*/}
          <div>
            <label htmlFor="dueDate" className="block text-sm font-medium text-gray-400">
              Due Date
            </label>
            <input
              type="date"
              id="dueDate"
              value={newTaskDueDate}
              onChange={(e) => setNewTaskDueDate(e.target.value)}
              className="w-full p-3 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>
          <div>
            <label htmlFor="assignTo" className="block text-sm font-medium text-gray-400">
              Assign To (Optional)
            </label>
            <select
              id="assignTo"
              value={assignedToMember}
              onChange={(e) => setAssignedToMember(e.target.value)}
              className="w-full p-3 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="">Unassigned</option>
              {(teamMembers || []).map((member) => (
                <option key={member._id} value={member._id}>
                  {member.name}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-md transition-colors"
          >
            Create Task
          </button>
        </form>
      </div>
  
      {(user.role === 'Owner' || user.role === 'Admin') && (
        <>
          <div className="bg-gray-800 rounded-lg p-6 mb-8 shadow-lg">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-3">
              <FaLink /> Invite Code
            </h2>
            <div className="flex items-center space-x-4 bg-gray-700 p-4 rounded-md">
              <span className="font-mono text-xl tracking-widest text-pink-400">{inviteCode}</span>
              <button
                onClick={handleCopy}
                className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded transition-colors"
              >
                Copy
              </button>
            </div>
            <p className="mt-2 text-gray-400">
              Share this code with a new user to allow them to join your team during registration.
            </p>
          </div>

          <div className="bg-gray-800 rounded-lg p-6 mb-8 shadow-lg">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-3">
              <FaEnvelope /> Invite Member via Email
            </h2>
            <form onSubmit={handleInvite} className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter member's email"
                className="flex-1 p-3 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
              <button
                type="submit"
                className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-md transition-colors"
                disabled={loading}
              >
                {loading ? 'Sending...' : 'Send Invitation'}
              </button>
            </form>
          </div>

          {pendingInvitations.length > 0 && (
            <div className="bg-gray-800 rounded-lg p-6 mb-8 shadow-lg">
              <h2 className="text-2xl font-semibold mb-4 flex items-center gap-3">
                <FaEnvelope /> Pending Invitations
              </h2>
              <ul className="space-y-3">
                {(pendingInvitations || []).map((invitation) => (
                  <li key={invitation.email} className="flex items-center justify-between bg-gray-700 p-3 rounded-md">
                    <span className="text-lg">{invitation.email}</span>
                    <button
                      onClick={() => handleRevokeInvitation(invitation.email)}
                      className="text-red-500 hover:text-red-700 transition-colors"
                      title="Revoke Invitation"
                    >
                      <FaBan size={20} />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </>
      )}

      <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 flex items-center gap-3">
          <FaUserPlus /> Team Members
        </h2>
        <ul className="space-y-4">
          {teamMembers.length > 0 ? (
            teamMembers.map((member) => (
              <li key={member._id} className="flex items-center justify-between gap-4 bg-gray-700 p-4 rounded-md">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold text-lg">
                    {member.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold">{member.name}</p>
                    <p className="text-sm text-gray-400">{member.email}</p>
                    <p className={`text-xs font-bold mt-1 
                      ${member.role === 'Owner' ? 'text-pink-400' : member.role === 'Admin' ? 'text-blue-400' : 'text-green-400'}`}>
                      {member.role}
                    </p>
                </div>
                </div>
                <div className="flex items-center gap-3">
                  {user.role === 'Owner' && member.role === 'Member' && (
                    <button
                      onClick={() => handleMakeAdmin(member._id)}
                      className="text-yellow-400 hover:text-yellow-500 transition-colors"
                      title="Make Admin"
                    >
                      <FaUserShield size={20} />
                    </button>
                  )}
                  {user.role === 'Owner' && member.role === 'Admin' && user._id !== member._id && (
                    <button
                      onClick={() => handleDemoteAdmin(member._id)}
                      className="text-orange-400 hover:text-orange-500 transition-colors"
                      title="Demote to Member"
                    >
                      <FaUserShield size={20} className="transform rotate-180" /> 
                    </button>
                  )}
                  {user.role === 'Owner' && user._id !== member._id && (
                    <button
                      onClick={() => handleRemoveMember(member._id)}
                      className="text-red-500 hover:text-red-700 transition-colors"
                      title="Remove member"
                    >
                      <FaTrashAlt size={20} />
                    </button>
                  )}
                </div>
              </li>
            ))
          ) : (
            <p className="text-gray-400">No members found in this team.</p>
          )}
        </ul>

        {user.role === 'Owner' && (
          <div className="mt-8">
            <button
              onClick={handleDeleteTeam}
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-md transition-colors w-full"
            >
              Delete This Team
            </button>
          </div>
        )}
      </div>
    </div>
  );
}