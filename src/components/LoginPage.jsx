import React, {  useState } from 'react';
import hidePassword from '../assets/eye-password-see-view-svgrepo-com.svg';
import showPassword from '../assets/eye-password-show-svgrepo-com.svg';
import { userData } from '../config/userData';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const errors = { email: '', password: '' };
const obj = { email: '', password: '' };

const LoginPage = () => {
  const [error, setError] = useState(errors);
  const [loginData, setLoginData] = useState(obj);
  const [view, setView] = useState(false);
  const navigate = useNavigate();

  const handleSubmitForm = (e) => {
    e.preventDefault();

    let newErrors = { ...error };

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (loginData?.email === '' || !emailRegex.test(loginData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (loginData?.password === '') {
      newErrors.password = 'Password is required';
    }

    if (newErrors.email || newErrors.password) {
      setError(newErrors);
    } else {
      const user = userData.find(
        (user) => user.Email === loginData.email && user.Password === btoa(loginData.password)
      );
      let notify;
      if (!user) {
         notify = toast.error("Invalid email or password!");
        
      } else {
        if (user.UserType === 'admin') {
            sessionStorage.setItem('userType', 'admin');
          navigate('/admin');
        } else {
          sessionStorage.setItem('user', btoa(JSON.stringify(user)));
          sessionStorage.setItem('userType', 'student');
          navigate('/student');
        }
        notify = toast.success("Login Successful!");
      }
      notify();
    }
  };

  


  return (
    <div className='h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 via-blue-200 to-indigo-300'>
      <div className='bg-white w-full max-w-md p-8 rounded-lg shadow-lg'>
        <h1 className='text-3xl font-bold text-center text-gray-800 mb-6'>Login</h1>
        <form onSubmit={(e) => handleSubmitForm(e)} className='flex flex-col'>

          {/* Email input */}
          <div className='mb-4'>
            <label htmlFor='email' className='block text-xl font-semibold text-gray-700 mb-2'>
              Email <span className='text-red-600'>*</span>
            </label>
            <input
              onChange={(e) => {
                setLoginData({ ...loginData, email: e.target.value });
                setError({ ...error, email: '' });
              }}
              id='email'
              placeholder='Enter your email'
              autoComplete='off'
              className='w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
            {error?.email && <p className='text-red-500 text-sm mt-1'>{error?.email}</p>}
          </div>

          {/* Password input */}
          <div className='mb-6 relative'>
            <label htmlFor='password' className='block text-xl font-semibold text-gray-700 mb-2'>
              Password <span className='text-red-600'>*</span>
            </label>
            <input
              onChange={(e) => {
                setLoginData({ ...loginData, password: e.target.value });
                setError({ ...error, password: '' });
              }}
              type={view ? 'text' : 'password'}
              id='password'
              placeholder='Enter your password'
              className='w-full p-3 pr-12 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
            <button
              type='button'
              onClick={() => setView(!view)}
              className='absolute right-4 top-16 transform -translate-y-1/2'
            >
              <img className='w-6' src={view ? hidePassword : showPassword} alt='toggle visibility' />
            </button>
            {error?.password && <p className='text-red-500 text-sm mt-1'>{error?.password}</p>}
          </div>

          {/* Submit button */}
          <button
            type='submit'
            className='w-full p-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500'
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
