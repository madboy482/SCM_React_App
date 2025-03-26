// src/pages/auth/CreateAccount.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const CreateAccount = () => {
  const navigate = useNavigate();
  const [userType, setUserType] = useState('Admin');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add registration logic here
    console.log({...formData, userType});
    
    // Navigate to login with the selected role
    navigate('/login', { state: { userType } });
  };

  return (
    <div className="min-h-screen bg-background-light flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-xl shadow-md p-6 relative">
        <h2 className="text-2xl font-bold text-center mb-6">Create Account</h2>
        
        <div className="flex justify-center mb-6">
          {['Admin', 'Customer', 'Supplier'].map((type) => (
            <button
              key={type}
              type="button"
              className={`px-4 py-2 mx-1 rounded-full ${
                userType === type 
                  ? 'bg-primary-purple text-white' 
                  : 'bg-gray-200 text-gray-700'
              }`}
              onClick={() => setUserType(type)}
            >
              {type}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
            </div>
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              className="w-full pl-10 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-purple"
              value={formData.fullName}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-4 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
            </div>
            <input
              type="email"
              name="email"
              placeholder="Email address"
              className="w-full pl-10 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-purple"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-4 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
            </div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full pl-10 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-purple"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-4 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
            </div>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              className="w-full pl-10 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-purple"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              id="terms"
              className="mr-2"
              required
            />
            <label htmlFor="terms" className="text-sm">
              I agree to the Terms & Privacy Policy
            </label>
          </div>
          <button
            type="submit"
            className="w-full bg-primary-purple text-white py-2 rounded-lg hover:bg-purple-700 transition duration-300"
          >
            Register
          </button>
        </form>
        <div className="text-center mt-4">
          <Link to="/login" className="text-sm text-primary-purple">
            Already have an account? Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CreateAccount;