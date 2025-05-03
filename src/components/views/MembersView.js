"use client";

import React, { useEffect, useState } from 'react';
import axiosInstance from '../../lib/axios';
import MemberHeroesView from './MemberHeroesView';
import { useLoader } from '../../context/LoaderContext';
import { useAuth } from '../../context/AuthContext';
import Swal from 'sweetalert2';
import ReactDOM from 'react-dom/client';
import { LoaderProvider } from '../../context/LoaderContext';
import { AuthProvider } from '../../context/AuthContext';

const ROLES = ['USER', 'VIEWER', 'MODERATOR', 'ADMIN'];

export default function MembersView() {
  const [members, setMembers] = useState([]);
  const { setIsLoading } = useLoader();
  const { user } = useAuth();

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.get('/api/guild/member/getAllMembers');
      setMembers(response.data);
    } catch (error) {
      console.error('Error fetching members:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRoleChange = async (memberNickname, newRole) => {
    setIsLoading(true);
    try {
      await axiosInstance.post('/api/guild/member/changeRole', {
        nickname: memberNickname,
        role: newRole
      });

      Swal.fire({
        title: 'Success!',
        text: 'User role has been updated',
        icon: 'success',
        timer: 1500,
        showConfirmButton: false
      })
      
      setMembers(prevMembers => 
        prevMembers.map(member => 
          member.nickname === memberNickname 
            ? { ...member, role: newRole }
            : member
        )
      );
    } catch (error) {
      console.error('Error updating role:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBanToggle = async (memberNickname, isCurrentlyBanned) => {
    const action = isCurrentlyBanned ? 'unban' : 'ban';
    const result = await Swal.fire({
      title: `Are you sure you want to ${action} this user?`,
      text: `This will ${action} ${memberNickname}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: isCurrentlyBanned ? '#10B981' : '#EF4444',
      cancelButtonColor: '#6B7280',
      confirmButtonText: `Yes, ${action} user`,
      cancelButtonText: 'Cancel'
    });

    if (result.isConfirmed) {
      setIsLoading(true);
      try {
        await axiosInstance.post('/api/guild/member/toggleBan', {
          nickname: memberNickname,
          ban: !isCurrentlyBanned
        });
        
        setMembers(prevMembers => 
          prevMembers.map(member => 
            member.nickname === memberNickname 
              ? { ...member, isBanned: !isCurrentlyBanned }
              : member
          )
        );

        Swal.fire({
          title: 'Success!',
          text: `User has been ${action}ed`,
          icon: 'success',
          timer: 1500,
          showConfirmButton: false
        });
      } catch (error) {
        console.error('Error toggling ban:', error);
        Swal.fire({
          title: 'Error!',
          text: 'Failed to update user status',
          icon: 'error'
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const showRoleChangeDialog = async (member) => {
    const { value: newRole } = await Swal.fire({
      title: 'Change User Role',
      html: `
        <div class="space-y-2" id="role-buttons">
          ${ROLES.map(role => `
            <button 
              class="w-full py-2 px-4 rounded-md text-white font-medium transition-colors
                ${role === member.role 
                  ? 'bg-blue-500 hover:bg-blue-600' 
                  : 'bg-gray-700 hover:bg-gray-600'
                }"
              data-role="${role}"
            >
              ${role}
            </button>
          `).join('')}
        </div>
      `,
      showCancelButton: true,
      confirmButtonColor: '#3B82F6',
      cancelButtonColor: '#6B7280',
      confirmButtonText: 'Cancel',
      cancelButtonText: 'Cancel',
      showConfirmButton: false,
      didOpen: () => {
        const buttons = document.querySelectorAll('#role-buttons button');
        buttons.forEach(button => {
          button.addEventListener('click', () => {
            Swal.close()
            handleRoleChange(member.nickname, button.dataset.role);
          });
        });
      }
    });
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-white">Guild Members</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {members.map((member) => (
          <div key={member.nickname} className="bg-gray-800/50 backdrop-blur-md rounded-xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">{member.nickname}</h2>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                member.isBanned ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'
              }`}>
                {member.isBanned ? 'Banned' : 'Active'}
              </span>
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <span className="text-gray-400">Name:</span>
                <span className="text-white">{member.fullName || 'Unknown'}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-gray-400">Location:</span>
                <span className="text-white">{member.location || 'Unknown'}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-gray-400">Timezone:</span>
                <span className="text-white">{member.timezone || 'Unknown'}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-gray-400">Role:</span>
                <span className="text-white">{member.role || 'Unknown'}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-gray-400">Confirm Code:</span>
                <span className="text-white">{member.confirmCode || 'Unknown'}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-gray-400">About:</span>
                <span className="text-white">{member.about || 'Unknown'}</span>
              </div>
            </div>

            <div className="pt-4 space-y-2">
              {user?.role === 'ADMIN' && (
                <div className="space-y-2">
                  <button
                    onClick={() => showRoleChangeDialog(member)}
                    className="w-full py-2 bg-blue-500/20 text-blue-400 rounded-md font-medium hover:bg-blue-500/30"
                  >
                    Change Role
                  </button>
                  
                  <button
                    onClick={() => handleBanToggle(member.nickname, member.isBanned)}
                    className={`w-full py-2 rounded-md font-medium ${
                      member.isBanned 
                        ? 'bg-green-500/20 text-green-400 hover:bg-green-500/30' 
                        : 'bg-red-500/20 text-red-400 hover:bg-red-500/30'
                    }`}
                  >
                    {member.isBanned ? 'Unban' : 'Ban'}
                  </button>
                </div>
              )}

              <button
                onClick={() => {
                  const dialog = Swal.fire({
                    title: `${member.nickname}'s Heroes`,
                    html: `<div id="member-heroes"></div>`,
                    width: '80%',
                    showConfirmButton: false,
                    didOpen: () => {
                      const container = document.getElementById('member-heroes');
                      if (container) {
                        const root = ReactDOM.createRoot(container);
                        root.render(
                          <LoaderProvider>
                            <AuthProvider>
                              <MemberHeroesView memberNickname={member.nickname} />
                            </AuthProvider>
                          </LoaderProvider>
                        );
                      }
                    }
                  });
                }}
                className="w-full py-2 bg-blue-500/20 text-blue-400 rounded-md font-medium hover:bg-blue-500/30"
              >
                View Heroes
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 