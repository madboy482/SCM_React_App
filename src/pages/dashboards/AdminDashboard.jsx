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
    className={`bg-white shadow rounded-lg p-4 flex items-center justify-center text-center transition-all duration-300 hover:bg-[#3460DC] hover:text-white hover:shadow-lg cursor-pointer ${className}`}
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
    <div className="min-h-screen bg-[#F5F5F5] flex flex-col pb-16">
      {/* Top Navigation */}
      <div className="p-4 bg-white shadow-sm flex justify-between items-center">
        <div className="flex items-center">
          <button 
            onClick={handleBack}
            className="p-2 mr-2 text-[#1D1D1D] hover:text-[#3460DC]"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div className="font-bold text-lg text-[#1D1D1D]">
            Admin Dashboard
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Bell className="text-[#1D1D1D] hover:text-[#3460DC] cursor-pointer" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full h-3 w-3 flex items-center justify-center text-[8px]">
              3
            </span>
          </div>
          <User className="text-[#1D1D1D] hover:text-[#3460DC] cursor-pointer" />
        </div>
      </div>

      {/* Search Bar */}
      <div className="p-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-[#666666]" />
          </div>
          <input 
            type="text" 
            placeholder="Search Documents..." 
            className="w-full pl-10 px-4 py-2 border border-[#D9D9D9] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3460DC]"
          />
        </div>
      </div>

      {/* Create Section */}
      <div className="px-4 mb-6">
        <h2 className="text-xl font-bold mb-3 text-[#1D1D1D]">Create</h2>
        <div className="grid grid-cols-3 gap-4">
          <CardButton onClick={() => handleNavigate('/parties-inventory')}>Items</CardButton>
          <CardButton onClick={() => handleNavigate('/parties')}>Parties</CardButton>
          <CardButton>Purchase</CardButton>
        </div>
      </div>

      {/* View Transactions */}
      <div className="px-4 mb-6">
        <button 
          className="w-full bg-[#3460DC] text-white shadow rounded-lg p-4 text-center hover:bg-[#2A4DB3] transition duration-300"
          onClick={() => handleNavigate('/all-transactions')}
        >
          View all Transactions
        </button>
      </div>

      {/* Manage Section */}
      <div className="px-4 mb-6">
        <h2 className="text-xl font-bold mb-3 text-[#1D1D1D]">Manage</h2>
        <div className="grid grid-cols-2 gap-4">
          <CardButton onClick={() => handleNavigate('/payments')}>Payment</CardButton>
          <CardButton onClick={() => handleNavigate('/returns')}>Returns</CardButton>
          <CardButton onClick={() => handleNavigate('/reports')}>Access Reports</CardButton>
          <CardButton onClick={() => handleNavigate('/update-inventory')}>Update Inventory</CardButton>
        </div>
      </div>

      {/* Financial Summary */}
      <div className="px-4 mb-6 grid grid-cols-2 gap-4">
        <div className="bg-red-100 rounded-lg p-4 text-center shadow-sm">
          <p className="text-sm text-red-600 font-medium">Overdue</p>
          <p className="font-bold text-lg text-red-700">₹12,110.00</p>
        </div>
        <div className="bg-green-100 rounded-lg p-4 text-center shadow-sm">
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
