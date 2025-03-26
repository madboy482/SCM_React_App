import React from 'react';
import { 
  Search, 
  Bell, 
  User, 
  Home,
  FileText,
  CreditCard,
  BarChart2,
  ArrowLeft
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import BottomNavigation from '../../components/BottomNavigation';

const CustomerDashboard = () => {
  const navigate = useNavigate();
  const currentDate = '2025-03-25 13:47:54';
  const currentUser = 'madboy482';

  const handleBack = () => {
    // Navigate to login page with userType set to Customer
    navigate('/login', { state: { userType: 'Customer' } });
  };

  const renderTopBar = () => (
    <div className="p-4 bg-white shadow-sm flex justify-between items-center">
      <div className="flex items-center">
        <button 
          onClick={handleBack}
          className="p-2 mr-2 text-[#1D1D1D] hover:text-[#3460DC]"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div className="font-bold text-lg text-[#1D1D1D]">Customer Dashboard</div>
      </div>
      <div className="flex items-center space-x-4">
        <Bell className="text-[#1D1D1D] hover:text-[#3460DC] cursor-pointer" />
        <User className="text-[#1D1D1D] hover:text-[#3460DC] cursor-pointer" />
      </div>
    </div>
  );

  const renderSearchBar = () => (
    <div className="p-4 relative">
      <div className="absolute inset-y-0 left-0 pl-7 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-[#666666]" />
      </div>
      <input 
        type="text" 
        placeholder="Search Documents..." 
        className="w-full pl-10 px-4 py-2 border border-[#D9D9D9] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3460DC]"
      />
    </div>
  );

  const renderViewSection = () => (
    <div className="px-4 mb-6">
      <h2 className="text-xl font-bold mb-3 text-[#1D1D1D]">View</h2>
      <div className="grid grid-cols-2 gap-4">
        <button className="bg-white shadow rounded-lg p-4 text-center hover:shadow-md transition duration-300 hover:bg-[#3460DC] hover:text-white">
          Order Status
        </button>
        <button 
          className="bg-white shadow rounded-lg p-4 text-center hover:shadow-md transition duration-300 hover:bg-[#3460DC] hover:text-white"
          onClick={() => navigate('/proforma-invoice')}
        >
          Quotations/Proformas
        </button>
        <button className="bg-white shadow rounded-lg p-4 text-center hover:shadow-md transition duration-300 hover:bg-[#3460DC] hover:text-white">
          Invoices
        </button>
        <button className="bg-white shadow rounded-lg p-4 text-center hover:shadow-md transition duration-300 hover:bg-[#3460DC] hover:text-white">
          Payment History
        </button>
      </div>
    </div>
  );

  const renderRequestSection = () => (
    <div className="px-4 mb-6">
      <h2 className="text-xl font-bold mb-3 text-[#1D1D1D]">Request</h2>
      <div className="grid grid-cols-2 gap-4">
        <button className="bg-white shadow rounded-lg p-4 text-center hover:shadow-md transition duration-300 hover:bg-[#3460DC] hover:text-white">
          Request Returns
        </button>
        <button className="bg-white shadow rounded-lg p-4 text-center hover:shadow-md transition duration-300 hover:bg-[#3460DC] hover:text-white">
          View Credit Notes
        </button>
      </div>
    </div>
  );

  const renderFinancialSummary = () => (
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
  );

  return (
    <div className="min-h-screen bg-[#F5F5F5] flex flex-col pb-16">
      {renderTopBar()}
      
      <div className="flex-grow">
        {renderSearchBar()}
        {renderViewSection()}
        {renderRequestSection()}
        {renderFinancialSummary()}

        {/* User Info */}
        <div className="text-xs text-gray-500 text-right px-4 mt-2">
          <p>Last updated: {currentDate}</p>
          <p>User: {currentUser}</p>
        </div>
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default CustomerDashboard;