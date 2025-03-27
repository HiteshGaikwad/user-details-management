import React from 'react';
import { useNavigate } from 'react-router-dom';
import UserDetailCard from '../config/UserDetailCard';
import { toast } from 'react-toastify';

const StudentPage = () => {
  const studentData = JSON.parse(atob(sessionStorage.getItem('user')));
  const navigate = useNavigate();

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      sessionStorage.removeItem('user'); // Remove the user data
      sessionStorage.removeItem('userType'); 
      const notify = toast.success("You’ve been logged out successfully.!");
      // Redirect to login or home page after logout
      navigate('/');
      notify()
    }
  };

  return (
    <div className='bg-gradient-to-r to-red-200 h-screen'>
      <div className="relative">
        <h1 className="text-5xl font-semibold text-center pt-10">Student Details</h1>
        {/* Log out button */}
        <button
          onClick={handleLogout}
          className="absolute right-10 top-[50%] transform -translate-y-1/2 bg-red-600 text-white font-semibold px-6 py-2 rounded-lg shadow-lg hover:bg-red-700 transition-all duration-300"
        >
          Log Out
        </button>
      </div>
      <div className="h-[80%]  w-screen border-0 border-black flex flex-col items-center justify-center ">
      <div className="flex flex-col pl-10 pt-10 shadow-lg shadow-red-300 w-1/2 rounded-lg bg-white">

        <UserDetailCard studentData={studentData} />
      </div>
      </div>
      </div>
  );
};

export default StudentPage;
