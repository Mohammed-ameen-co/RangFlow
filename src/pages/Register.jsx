import React, { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { FaUsers, FaUser } from 'react-icons/fa';
import { API_URL } from '../config';

export default function Register() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const mode = query.get('mode');

  const { isAuthenticated, loading: authLoading } = useAuth();

  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, authLoading, navigate]);

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <p>Loading...</p>
      </div>
    );
  }

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [teamMode, setTeamMode] = useState('create');
  const [teamName, setTeamName] = useState('');
  const [inviteCode, setInviteCode] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState('');
  const [showInviteCode, setShowInviteCode] = useState(false); 
  const [generatedInviteCode, setGeneratedInviteCode] = useState(''); 
  const { setAuthInfo } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTeamModeChange = (e) => {
    setTeamMode(e.target.value);
  };

  const handleTeamNameChange = (e) => {
    setTeamName(e.target.value);
  };

  const handleInviteCodeChange = (e) => {
    setInviteCode(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsRegistering(true);
    setError('');

    try {
      if (mode === 'individual') {
        const response = await axios.post(`${API_URL}/auth/register`, {
          ...formData,
          mode: 'individual'
        });

        if (response.data.success) {
          alert(response.data.message);
          navigate('/login');
        }

      } else if (mode === 'team') {
        const registerResponse = await axios.post(`${API_URL}/auth/register`, {
          ...formData,
          mode: 'team',
          teamMode: teamMode,
          teamName: teamName,
          inviteCode: inviteCode,
        });

        if (registerResponse.data.success) {
          
          alert(registerResponse.data.message);
          if (teamMode === 'create' && registerResponse.data.inviteCode) {
            setGeneratedInviteCode(registerResponse.data.inviteCode);
            setShowInviteCode(true);
          } else {
            navigate('/login');
          }
        }
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setIsRegistering(false);
    }
  };

  if (!mode) {
    
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white p-4">
        <div className="bg-gray-800 p-8 rounded-lg shadow-xl w-full max-w-lg text-center space-y-6 border border-gray-700">
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">Register</h2>
          <p className="text-gray-400 text-lg">Choose your workflow:</p>
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
            <Link
              to="/register?mode=individual"
              className="flex-1 flex items-center justify-center space-x-2 bg-gray-700 hover:bg-gray-600 text-white px-6 py-4 rounded-lg font-bold transition-all duration-300 transform hover:scale-105 shadow-md"
            >
              <FaUser />
              <span>Work Individually</span>
            </Link>
            <Link
              to="/register?mode=team"
              className="flex-1 flex items-center justify-center space-x-2 bg-gray-700 hover:bg-gray-600 text-white px-6 py-4 rounded-lg font-bold transition-all duration-300 transform hover:scale-105 shadow-md"
            >
              <FaUsers />
              <span>Work with a Team</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }


  if (showInviteCode) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white p-4">
        <div className="bg-gray-800 p-8 rounded-lg shadow-xl w-full max-w-md space-y-6 border border-gray-700 text-center">
          <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
            Team Created Successfully! 🎉
          </h2>
          <p className="text-gray-400">
            Your team has been created. Share this invite code with your teammates to join.
          </p>
          <div className="bg-gray-700 p-4 rounded-lg">
            <p className="text-lg font-bold text-white">Invite Code:</p>
            <p className="text-2xl font-extrabold text-green-400 mt-2">{generatedInviteCode}</p>
          </div>
          <button
            onClick={() => navigate('/login')}
            className="w-full p-3 rounded-lg font-bold text-white bg-purple-600 hover:bg-purple-700 transition-colors duration-300"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white p-4">
      <div className="bg-gray-800 p-8 rounded-lg shadow-xl w-full max-w-md space-y-6 border border-gray-700">
        <h2 className="text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          Register to {mode === 'team' ? 'work with a team' : 'work individually'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div>
            <label className="block text-gray-400 mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-purple-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-400 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-purple-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-400 mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-purple-500"
              required
            />
          </div>
          {mode === 'team' && (
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <label className="flex items-center space-x-2 text-gray-300">
                  <input
                    type="radio"
                    name="teamMode"
                    value="create"
                    checked={teamMode === 'create'}
                    onChange={handleTeamModeChange}
                    className="form-radio text-purple-600 bg-gray-700 border-gray-600 focus:ring-purple-500"
                  />
                  <span>Create a new team</span>
                </label>
                <label className="flex items-center space-x-2 text-gray-300">
                  <input
                    type="radio"
                    name="teamMode"
                    value="join"
                    checked={teamMode === 'join'}
                    onChange={handleTeamModeChange}
                    className="form-radio text-purple-600 bg-gray-700 border-gray-600 focus:ring-purple-500"
                  />
                  <span>Join an existing team</span>
                </label>
              </div>
              {teamMode === 'create' ? (
                <div>
                  <label className="block text-gray-400 mb-1">Team Name</label>
                  <input
                    type="text"
                    value={teamName}
                    onChange={handleTeamNameChange}
                    className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-purple-500"
                    required
                  />
                </div>
              ) : (
                <div>
                  <label className="block text-gray-400 mb-1">Invite Code</label>
                  <input
                    type="text"
                    value={inviteCode}
                    onChange={handleInviteCodeChange}
                    className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-purple-500"
                    required
                  />
                </div>
              )}
            </div>
          )}
          <button
            type="submit"
            className="w-full p-3 rounded-lg font-bold text-white bg-purple-600 hover:bg-purple-700 transition-colors duration-300"
            disabled={isRegistering}
          >
            {isRegistering ? "Registering..." : "Register"}
          </button>
        </form>
        {error && <p className="text-red-500 text-center mt-4">{error}</p>}
        <p className="text-center text-gray-400 mt-4">
          Already have an account? <Link to="/login" className="text-purple-400 hover:text-purple-300">Login</Link>
        </p>
      </div>
    </div>
  );
}