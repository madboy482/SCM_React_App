import React from 'react';
import { 
  Search, 
  Bell, 
  User, 
  PlusCircle,
  ArrowLeft 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import BottomNavigation from '../../components/BottomNavigation';

const SupplierDashboard = () => {
  const navigate = useNavigate();
  const currentDate = '2025-03-28 17:08:46'; // Updated with current date and time

  const handleBack = () => {
    // Navigate to login page with userType set to Supplier
    navigate('/login', { state: { userType: 'Supplier' } });
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
          <div className="font-bold text-lg text-[#1D1D1D]">Supplier Dashboard</div>
        </div>
        <div className="flex items-center space-x-4">
          <Bell className="text-[#1D1D1D] hover:text-[#3460DC] cursor-pointer" />
          <User className="text-[#1D1D1D] hover:text-[#3460DC] cursor-pointer" />
        </div>
      </div>

      <div className="p-4 flex-grow">
        <div className="mb-6 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-[#666666]" />
          </div>
          <input 
            type="text" 
            placeholder="Search Documents..." 
            className="w-full pl-10 px-4 py-2 border border-[#D9D9D9] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3460DC]"
          />
        </div>

        {/* View Purchase Orders */}
        <div className="mb-6">
          <button 
            className="w-full bg-[#3460DC] text-white shadow rounded-lg p-4 text-center hover:bg-[#2A4DB3] transition duration-300"
            onClick={() => navigate('/purchase-orders', { state: { from: '/supplier-dashboard' } })}
          >
            View Purchase Orders
          </button>
        </div>

        {/* Upload Section */}
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-3 text-[#1D1D1D]">Upload</h2>
          <div className="grid grid-cols-2 gap-4">
            <div 
              className="bg-white shadow rounded-lg p-4 flex items-center justify-center hover:shadow-md transition duration-300 hover:bg-[#3460DC] hover:text-white cursor-pointer"
              onClick={() => navigate('/delivery-challan', { state: { from: '/supplier-dashboard' } })}
            >
              <PlusCircle className="mr-2" />
              Delivery Challan
            </div>
            <div 
              className="bg-white shadow rounded-lg p-4 flex items-center justify-center hover:shadow-md transition duration-300 hover:bg-[#3460DC] hover:text-white cursor-pointer"
              onClick={() => navigate('/create-purchase-invoice', { state: { from: '/supplier-dashboard' } })}
            >
              <PlusCircle className="mr-2" />
              Purchase Invoice
            </div>
          </div>
        </div>

        {/* View Section */}
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-3 text-[#1D1D1D]">View</h2>
          <div className="grid grid-cols-2 gap-4">
            <button 
              className="bg-white shadow rounded-lg p-4 text-center hover:shadow-md transition duration-300 hover:bg-[#3460DC] hover:text-white"
              onClick={() => navigate('/payment-out', { state: { from: '/supplier-dashboard' } })}
            >
              Payment Status
            </button>
            <button 
              className="bg-white shadow rounded-lg p-4 text-center hover:shadow-md transition duration-300 hover:bg-[#3460DC] hover:text-white"
              onClick={() => navigate('/debit-notes', { state: { from: '/supplier-dashboard' } })}
            >
              Debit Notes
            </button>
            <button 
              className="bg-white shadow rounded-lg p-4 text-center hover:shadow-md transition duration-300 hover:bg-[#3460DC] hover:text-white"
              onClick={() => navigate('/purchase-return-list', { state: { from: '/supplier-dashboard' } })}
            >
              Purchase Returns
            </button>
          </div>
        </div>

        {/* Financial Summary */}
        <div className="mb-6 grid grid-cols-2 gap-4">
          <div className="bg-red-100 rounded-lg p-4 text-center shadow-sm">
            <p className="text-sm text-red-600 font-medium">Overdue</p>
            <p className="font-bold text-lg text-red-700">₹12,110.00</p>
          </div>
          <div className="bg-green-100 rounded-lg p-4 text-center shadow-sm">
            <p className="text-sm text-green-600 font-medium">Total Paid</p>
            <p className="font-bold text-lg text-green-700">₹12,56,110.00</p>
          </div>
        </div>

        {/* User Info */}
        <div className="text-xs text-gray-500 text-right mt-2">
          <p>Last updated: {currentDate}</p>
          <p>User: krishh-kumarr</p>
        </div>
      </div>
        
      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
};

export default SupplierDashboard;