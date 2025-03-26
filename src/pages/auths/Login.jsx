import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Get userType from location state if available, default to 'Admin'
  const [userType, setUserType] = useState(location.state?.userType || 'Admin');

  const [formData, setFormData] = useState({
    fullName: '',
    password: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ ...formData, role: userType });

    // Redirect based on user role
    if (userType === 'Admin') {
      navigate('/admin-dashboard');
    } else if (userType === 'Supplier') {
      navigate('/supplier-dashboard');
    } else if (userType === 'Customer') {
      navigate('/customer-dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-background-light flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-xl shadow-md p-6 relative">
        <h2 className="text-2xl font-bold text-center mb-6">Welcome Back</h2>

        {/* Display selected role from registration */}
        <div className="mb-6 text-center">
          <div className="px-4 py-2 bg-primary-purple text-white rounded-full inline-block">
            Role: {userType}
          </div>
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

          <button
            type="submit"
            className="w-full bg-primary-purple text-white py-2 rounded-lg hover:bg-purple-700 transition-colors"
          >
            Login
          </button>

          <div className="mt-4 text-center">
            <p className="text-gray-600">
              Don't have an account?
              <Link to="/register" className="text-primary-purple ml-1 hover:underline">
                Register here
              </Link>
            </p>
            <Link to="/forgot-password" className="text-primary-purple text-sm hover:underline block mt-2">
              Forgot Password?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
