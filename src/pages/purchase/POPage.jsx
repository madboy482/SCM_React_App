import React, { useState, useEffect } from 'react';
import { 
  ChevronLeft, 
  Search, 
  Filter, 
  Download, 
  Plus, 
  Calendar 
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import BottomNavigation from '../../components/BottomNavigation';

const POs = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [lastPage, setLastPage] = useState(-1); // Default fallback

  // On component mount, determine the previous page
  useEffect(() => {
    // Check if we have a state with 'from' path
    if (location.state && location.state.from) {
      setLastPage(location.state.from);
    } else {
      // If referrer exists in sessionStorage (set during navigation)
      const referrer = sessionStorage.getItem('referrer');
      if (referrer) {
        setLastPage(referrer);
      }
    }
  }, [location]);

  const handleBack = () => {
    navigate(lastPage);
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5] flex flex-col pb-16">
      <div className="bg-white shadow-sm px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <ChevronLeft 
            className="text-[#1D1D1D] cursor-pointer" 
            onClick={handleBack}
          />
          <h1 className="text-xl font-semibold text-[#1D1D1D]">Purchase Orders</h1>
          <div className="bg-[#E8F0FE] text-[#3460DC] px-2 py-0.5 rounded-full text-xs">
            2
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <select className="text-sm text-[#1D1D1D] bg-transparent mr-2">
            <option>Last 365 Days</option>
          </select>
          <Filter className="text-[#1D1D1D]" size={20} />
          <Download className="text-[#1D1D1D]" size={20} />
          <button 
            className="bg-[#3460DC] text-white px-3 py-1.5 rounded text-sm"
            onClick={() => navigate('/create-purchase-invoice')}
          >
            Create Purchase Invoice
          </button>
        </div>
      </div>

      <div className="p-4 flex-grow">
        <div className="relative mb-4">
          <input 
            type="text" 
            placeholder="Search orders..." 
            className="w-full border border-[#D9D9D9] rounded px-3 py-2 text-sm pl-10"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#666666]" size={20} />
        </div>

        <div className="bg-white rounded-lg shadow-md">
          <div className="flex border-b bg-[#F5F5F5]">
            <div className="w-1/2 p-4 border-r text-center">
              <p className="text-[#038D33] text-sm font-medium">Total Purchases</p>
              <p className="text-[#1D1D1D] text-xl font-semibold">₹12,56,110.00</p>
            </div>
            <div className="w-1/2 p-4 text-center">
              <p className="text-[#D13838] text-sm font-medium">Unpaid</p>
              <p className="text-[#1D1D1D] text-xl font-semibold">₹0.00</p>
            </div>
          </div>

          <div className="border-b px-4 py-2 bg-[#F5F5F5] text-[#666666] text-xs flex justify-between">
            <span>Date</span>
            <span>Delivery Challan</span>
            <span>Party Name</span>
            <span>AMOUNT</span>
            <span>Status</span>
          </div>

          {[
            { 
              date: '15 Mar 2025', 
              challan: 'VILVAHNRSI/PO001', 
              party: 'N.RANGA RAO ANDO', 
              amount: '₹0.00', 
              status: 'Pending' 
            },
            { 
              date: '15 Mar 2025', 
              challan: 'VILVAHNRSI/PO001', 
              party: 'SIGNS PRIVATE LIMITED', 
              amount: '₹0.00', 
              status: 'Pending' 
            }
          ].map((order, index) => (
            <div 
              key={index} 
              className={`flex justify-between p-4 ${index < 1 ? 'border-b' : ''}`}
            >
              <div className="flex flex-col">
                <p className="text-[#1D1D1D] text-sm">{order.date}</p>
                <p className="text-[#666666] text-xs">{order.challan}</p>
              </div>
              <p className="text-[#1D1D1D] text-sm">{order.party}</p>
              <p className="text-[#1D1D1D] text-sm font-medium">{order.amount}</p>
              <p className="text-[#3460DC] text-sm">{order.status}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="text-xs text-gray-500 text-right mt-2 px-4">
        <p>Last updated: 2025-03-28 16:42:26</p>
        <p>User: krishh-kumarr</p>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default POs;