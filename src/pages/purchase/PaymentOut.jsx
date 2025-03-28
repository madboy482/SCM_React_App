import React, { useState } from 'react';
import { 
  ChevronLeft, 
  Calendar as CalendarIcon, 
  Search,
  Settings,
  ChevronDown
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import BottomNavigation from '../../components/BottomNavigation';

const PaymentOut = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeView, setActiveView] = useState('list');
  const [paymentDate, setPaymentDate] = useState(new Date());
  const [paymentEntries, setPaymentEntries] = useState([
    {
      date: '15 Mar 2025',
      partyName: 'N.RANGA RAO ANDO',
      company: 'SONS PRIVATE LIMITED',
      amount: '₹0.00'
    },
    {
      date: '15 Mar 2025',
      partyName: 'N.RANGA RAO ANDO',
      company: 'SONS PRIVATE LIMITED',
      amount: '₹0.00'
    },
    {
      date: '15 Mar 2025',
      partyName: 'N.RANGA RAO ANDO',
      company: 'SONS PRIVATE LIMITED',
      amount: '₹0.00'
    }
  ]);

  const handleBack = () => {
    if (activeView === 'create') {
      setActiveView('list');
    } else {
      if (location.state && location.state.from) {
        navigate(location.state.from);
      } else {
        navigate(-1);
      }
    }
  };

  const formatDate = (date) => {
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  };

  const renderListView = () => (
    <div className="bg-[#F5F5F5] min-h-screen flex flex-col pb-16">
      <div className="bg-white shadow-sm px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <ChevronLeft 
            className="text-[#1D1D1D] cursor-pointer" 
            onClick={handleBack}
          />
          <h1 className="text-xl font-semibold text-[#1D1D1D]">Payments Out</h1>
        </div>
      </div>

      <div className="p-4 flex-grow">
        <div className="relative mb-4">
          <input 
            type="text" 
            placeholder="Search payments..." 
            className="w-full border border-[#D9D9D9] rounded px-3 py-2 text-sm pl-10"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#666666]" size={20} />
        </div>

        <div className="flex space-x-2 mb-4 overflow-x-auto">
          <button className="border border-[#D9D9D9] bg-white rounded px-3 py-1 text-sm whitespace-nowrap">Last 30 days</button>
          <button className="border border-[#D9D9D9] bg-white rounded px-3 py-1 text-sm whitespace-nowrap">All status</button>
          <button className="border border-[#D9D9D9] bg-white rounded px-3 py-1 text-sm whitespace-nowrap">Sort by: Date</button>
        </div>

        <div className="space-y-2">
          {paymentEntries.map((entry, index) => (
            <div key={index} className="bg-white p-3 rounded-lg shadow-sm">
              <div className="flex justify-between">
                <div>
                  <p className="font-semibold text-[#1D1D1D]">{entry.partyName}</p>
                  <p className="text-sm text-[#666666]">{entry.company}</p>
                  <p className="text-xs text-[#999999]">{entry.date}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-[#3460DC]">{entry.amount}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button 
          className="w-full mt-4 bg-[#3460DC] text-white py-2 rounded-lg"
          onClick={() => setActiveView('create')}
        >
          Create Payment Out
        </button>
      </div>

      <div className="text-xs text-gray-500 text-right mt-2 px-4">
        <p>Last updated: 2025-03-28 17:08:46</p>
        <p>User: krishh-kumarr</p>
      </div>

      <BottomNavigation />
    </div>
  );

  const renderCreateView = () => (
    <div className="bg-[#F5F5F5] min-h-screen flex flex-col pb-16">
      <div className="bg-white shadow-sm px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <ChevronLeft 
            className="text-[#1D1D1D] cursor-pointer" 
            onClick={handleBack}
          />
          <h1 className="text-xl font-semibold text-[#1D1D1D]">Record Payment Out #6</h1>
        </div>
        <div className="flex items-center space-x-3">
          <Settings className="text-[#1D1D1D]" size={20} />
        </div>
      </div>

      <div className="p-4 flex-grow">
        <div className="space-y-4">
          <div>
            <label className="text-[#666666] text-sm mb-2 block">Party Name</label>
            <div className="relative">
              <select className="w-full border border-[#D9D9D9] rounded px-3 py-2 text-sm appearance-none">
                <option value="">Search Party by Name or Number</option>
                <option value="1">N.RANGA RAO ANDO</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#666666]" size={16} />
            </div>
          </div>

          <div>
            <label className="text-[#666666] text-sm mb-2 block">Enter Payment Amount</label>
            <input
              type="number"
              placeholder="0"
              className="w-full border border-[#D9D9D9] rounded px-3 py-2 text-sm"
            />
          </div>

          <div>
            <label className="text-[#666666] text-sm mb-2 block">Payment Date</label>
            <div className="relative">
              <input 
                type="text" 
                value={formatDate(paymentDate)}
                onChange={(e) => {}} // Add date picker functionality if needed
                className="w-full border border-[#D9D9D9] rounded px-3 py-2 text-sm pl-10"
              />
              <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#666666]" size={20} />
            </div>
          </div>

          <div>
            <label className="text-[#666666] text-sm mb-2 block">Payment Mode</label>
            <div className="relative">
              <select className="w-full border border-[#D9D9D9] rounded px-3 py-2 text-sm appearance-none">
                <option value="upi">UPI</option>
                <option value="bank">Bank Transfer</option>
                <option value="cash">Cash</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#666666]" size={16} />
            </div>
          </div>

          <div>
            <label className="text-[#666666] text-sm mb-2 block">Payment Deducted From</label>
            <div className="relative">
              <select className="w-full border border-[#D9D9D9] rounded px-3 py-2 text-sm appearance-none">
                <option value="">Select</option>
                <option value="account1">Account 1</option>
                <option value="account2">Account 2</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#666666]" size={16} />
            </div>
          </div>

          <div>
            <label className="text-[#666666] text-sm mb-2 block">Payment Out Number</label>
            <input 
              type="text" 
              defaultValue="6" 
              className="w-full border border-[#D9D9D9] rounded px-3 py-2 text-sm bg-gray-100"
              readOnly 
            />
          </div>

          <div>
            <label className="text-[#666666] text-sm mb-2 block">Notes</label>
            <input
              type="text"
              placeholder="Enter Notes"
              className="w-full border border-[#D9D9D9] rounded px-3 py-2 text-sm"
            />
          </div>
        </div>

        <div className="flex space-x-4 mt-6">
          <button 
            className="w-1/2 border border-[#3460DC] text-[#3460DC] rounded py-2 text-sm"
            onClick={() => setActiveView('list')}
          >
            Cancel
          </button>
          <button 
            className="w-1/2 bg-[#3460DC] text-white rounded py-2 text-sm"
            onClick={() => setActiveView('list')}
          >
            Save
          </button>
        </div>
      </div>

      <div className="text-xs text-gray-500 text-right mt-2 px-4">
        <p>Last updated: 2025-03-28 17:08:46</p>
        <p>User: krishh-kumarr</p>
      </div>

      <BottomNavigation />
    </div>
  );

  return activeView === 'list' ? renderListView() : renderCreateView();
};

export default PaymentOut;