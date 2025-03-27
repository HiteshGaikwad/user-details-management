import React, { useState } from 'react';
import { userData } from '../config/userData';
import { useNavigate } from 'react-router-dom';
import UserDetailCard from '../config/UserDetailCard';
import { toast } from 'react-toastify';

const AdminPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [subjectSearchTerm, setSubjectSearchTerm] = useState(''); // For Subject search
  const [selectedStudent, setSelectedStudent] = useState(null); // State to store selected student
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility state
  
  const navigate = useNavigate();
  
  // Filter students based on the Student Name and Subjects
  const students = userData.filter(user => 
    user.UserType === 'student' &&
    user.UserName.toLowerCase().includes(searchTerm.toLowerCase()) &&
    user.Subjects.some(subject => subject.toLowerCase().includes(subjectSearchTerm.toLowerCase()))
  );

  // Handle logout
  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      sessionStorage.removeItem('user'); // Clear session storage
      sessionStorage.removeItem('userType'); // Clear session storage
      const notify = toast.success("You’ve been logged out successfully.!");
      navigate('/'); // Redirect to login page
      notify();
    }
  };

  // Open modal with selected student details
  const handleDetailsClick = (student) => {
    setSelectedStudent(student);
    setIsModalOpen(true);
  };

  // Close the modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedStudent(null); // Clear selected student
  };

  return (
    <>
      <div className="relative">
        <h1 className="text-5xl font-bold text-center pt-10">Students List</h1>
        
        {/* Log out button */}
        <button
          onClick={handleLogout}
          className="absolute right-10 top-10 transform -translate-y-1/2 bg-red-600 text-white font-semibold px-6 py-2 rounded-lg shadow-lg hover:bg-red-700 transition-all duration-300"
        >
          Log Out
        </button>
      </div>

      <div className="h-[90%] w-screen border-0 border-black flex flex-col items-center justify-center overflow-x-auto">
        <table className="border-2 border-black mt-10 w-[85%] border-collapse rounded-lg">
          <thead>
            <tr className="border-2 border-black text-center h-16 text-xl rounded-lg">
              <th className="border border-gray-600 w-[70px]">Sr. No</th>
              <th className="border border-gray-600 w-[400px]">
                <div className="flex items-center justify-between px-4">
                  <p>Student Name</p>
                  <input
                    className="p-2 border-2 rounded-md w-[60%] font-semibold"
                    placeholder="Search by name"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </th>
              <th className="border border-gray-600 w-64">Email</th>
              <th className="border border-gray-600 w-[400px]">
                <div className="flex items-center justify-between px-4">
                  <p>Subjects</p>
                  <input
                    className="p-2 border-2 rounded-md w-[70%] font-semibold"
                    placeholder="Search by subject"
                    value={subjectSearchTerm}
                    onChange={(e) => setSubjectSearchTerm(e.target.value)}
                  />
                </div>
              </th>
              <th className="border border-gray-600">Details</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => {
              return (
                <tr key={student?.UserName} className="border-2 border-black text-center text-lg font-semibold">
                  <td className="border border-gray-600">{index + 1}</td>
                  <td className="border border-gray-600 h-14">{student?.UserName}</td>
                  <td className="border border-gray-600">{student?.Email}</td>
                  <td className="border border-gray-600">{student?.Subjects.join(', ')}</td>
                  <td className="border border-gray-600">
                    <button
                      className="p-2 m-2 bg-blue-400 rounded-md cursor-pointer hover:bg-blue-500 text-white font-semibold"
                      onClick={() => handleDetailsClick(student)} // Open modal with selected student details
                    >
                      Details
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Modal for student details */}
      {isModalOpen && selectedStudent && (
        <div className="fixed inset-0 bg-gray-300 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-2xl w-1/2 shadow-2xl shadow-gray-500">
            <div className='flex justify-between items-center'>
            <h2 className="text-3xl font-bold mb-4">Student Details</h2>
            <button
              className="p-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700"
              onClick={closeModal} // Close modal
            >
              Close
            </button> </div>
            <UserDetailCard studentData={selectedStudent} />
          </div>
        </div>
      )}
    </>
  );
};

export default AdminPage;
