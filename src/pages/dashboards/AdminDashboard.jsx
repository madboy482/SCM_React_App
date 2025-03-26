import React from 'react';
import { 
  Search, 
  Bell, 
  User, 
  ArrowLeft
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import BottomNavigation from '../../components/BottomNavigation';

const CardButton = ({ children, className = '', onClick }) => (
  <div 
    className={`bg-white shadow-md rounded-xl p-4 flex items-center justify-center text-center transition-all duration-300 hover:bg-primary-purple hover:text-white hover:shadow-lg cursor-pointer ${className}`}
    onClick={onClick}
  >
    {children}
  </div>
);

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    // Navigate to login page with userType set to Admin
    navigate('/login', { state: { userType: 'Admin' } });
  };
  
  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <div className="min-h-screen bg-[#F0F0FA] flex flex-col">
      {/* Top Navigation */}
      <div className="p-4 bg-white shadow-sm flex justify-between items-center">
        <div className="flex items-center">
          <button 
            onClick={handleBack}
            className="p-2 mr-2 text-gray-600 hover:text-primary-purple"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div className="text-xl font-semibold text-primary-purple">
            Admin Dashboard
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Bell className="text-gray-500 hover:text-primary-purple cursor-pointer" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full h-3 w-3 flex items-center justify-center text-[8px]">
              3
            </span>
          </div>
          <User className="text-gray-500 hover:text-primary-purple cursor-pointer" />
        </div>
      </div>

      {/* Search Bar */}
      <div className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search Documents..." 
            className="w-full pl-10 pr-4 py-2 bg-white rounded-xl border-none focus:ring-2 focus:ring-primary-purple"
          />
        </div>
      </div>

      {/* Create Section */}
      <div className="px-4 mb-4">
        <h2 className="text-lg font-semibold mb-3 text-primary-purple">Create</h2>
        <div className="grid grid-cols-3 gap-4">
          <CardButton onClick={() => handleNavigate('/Parties-Inventory')}>Items</CardButton>
          <CardButton onClick={() => handleNavigate('/parties')}>Parties</CardButton>
          <CardButton>Purchase</CardButton>
        </div>
      </div>

      {/* View Transactions */}
      <div className="px-4 mb-4">
        <CardButton className="bg-primary-purple text-black hover:bg-purple-700">
          View all Transactions
        </CardButton>
      </div>

      {/* Manage Section */}
      <div className="px-4 mb-4">
        <h2 className="text-lg font-semibold mb-3 text-primary-purple">Manage</h2>
        <div className="grid grid-cols-2 gap-4">
          <CardButton>Payment</CardButton>
          <CardButton>Returns</CardButton>
          <CardButton>Access Reports</CardButton>
          <CardButton>Update Inventory</CardButton>
        </div>
      </div>

      {/* Financial Summary */}
      <div className="px-4 mb-4 grid grid-cols-2 gap-4">
        <div className="bg-red-100 rounded-xl p-4 text-center">
          <p className="text-sm text-red-600 font-medium">Overdue</p>
          <p className="font-bold text-lg text-red-700">₹12,110.00</p>
        </div>
        <div className="bg-green-100 rounded-xl p-4 text-center">
          <p className="text-sm text-green-600 font-medium">Total Paid</p>
          <p className="font-bold text-lg text-green-700">₹12,56,110.00</p>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
};

export default AdminDashboard;