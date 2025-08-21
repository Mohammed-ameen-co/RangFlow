import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../api';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';
import { SyncLoader } from 'react-spinners';

export default function JoinTeam() {
  const [status, setStatus] = useState('Processing your invitation...');
  const location = useLocation();
  const navigate = useNavigate();
  const { user, login } = useAuth(); 
  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const token = query.get('token');

    if (user && user.team) {
      toast.info('You are already part of a team.');
      navigate('/dashboard');
      return;
    }

    if (!token) {
      setStatus('Invalid or missing invitation token.');
      toast.error('Invalid or missing invitation token.');
      return;
    }

    const acceptInvitation = async () => {
      try {
        const res = await api.get(`/teams/accept-invitation/${token}`);
        setStatus(res.data.message);
        toast.success(res.data.message);

        // Invitation accept hone ke baad, user ke data ko update karein
        // yahan hum backend se updated user data fetch kar sakte hain ya
        // login function ko call karke naya token le sakte hain
        const updatedUser = await api.get('/auth/me');
        login(updatedUser.data.user);
        
        setTimeout(() => {
          navigate('/team-dashboard'); 
        }, 2000);

      } catch (error) {
        const errorMessage = error.response?.data?.message || 'Failed to accept invitation.';
        setStatus(errorMessage);
        toast.error(errorMessage);
        
        if (error.response?.data?.action === 'register') {
          navigate(`/register?token=${token}`);
        } else {
          setTimeout(() => {
            navigate('/dashboard');
          }, 3000);
        }
      }
    };

    if (token) {
      acceptInvitation();
    }
  }, [location, navigate, user, login]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white p-4 text-center">
      <h1 className="text-3xl font-bold mb-4">Team Invitation</h1>
      <SyncLoader color="#6d28d9" />
      <p className="mt-6 text-xl">{status}</p>
    </div>
  );
}