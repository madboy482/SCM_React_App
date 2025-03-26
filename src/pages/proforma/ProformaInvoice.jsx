import React, { useState } from 'react';
import { 
  ChevronLeft, 
  Search, 
  File, 
  Filter,
  Download
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import BottomNavigation from '../../components/BottomNavigation';

const ProformaInvoice = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('All');
  const [filterOption, setFilterOption] = useState('Last 365 Days');
  const currentDate = '2025-03-25 13:49:37';
  const currentUser = 'madboy482';

  const tabs = ['All', 'Draft', 'Pending', 'Paid'];

  const handleBack = () => {
    navigate('/customer-dashboard');
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5] flex flex-col pb-16">
      <div className="bg-white shadow-sm px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <ChevronLeft 
            className="text-[#1D1D1D] cursor-pointer" 
            onClick={handleBack}
          />
          <h1 className="text-xl font-semibold text-[#1D1D1D]">Proforma Invoice</h1>
        </div>
        <div className="flex items-center space-x-3">
          <Filter className="text-[#1D1D1D]" size={20} />
          <Download className="text-[#1D1D1D]" size={20} />
          <button 
            className="bg-[#3460DC] text-white px-3 py-1.5 rounded text-sm"
            onClick={() => navigate('/create-proforma-invoice')}
          >
            Create
          </button>
        </div>
      </div>

      <div className="flex flex-col flex-grow">
        <div className="p-4 bg-[#F5F5F5]">
          <div className="relative mb-4">
            <input 
              type="text" 
              placeholder="Search invoices..." 
              className="w-full border border-[#D9D9D9] rounded px-3 py-2 text-sm pl-10"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#666666]" size={20} />
          </div>

          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-2">
              <select 
                value={filterOption}
                onChange={(e) => setFilterOption(e.target.value)}
                className="text-sm text-[#1D1D1D] bg-transparent border border-[#D9D9D9] rounded px-2 py-1"
              >
                <option>Last 365 Days</option>
                <option>Last 30 Days</option>
                <option>Last 90 Days</option>
              </select>
              <div className="bg-[#E8F0FE] text-[#3460DC] px-2 py-0.5 rounded-full text-xs">
                Info
              </div>
            </div>
          </div>

          <div className="flex border-b bg-white rounded-t-lg">
            {tabs.map((tab) => (
              <button
                key={tab}
                className={`px-4 py-3 ${
                  activeTab === tab 
                    ? 'border-b-2 border-[#3460DC] text-[#3460DC] font-medium' 
                    : 'text-[#666666]'
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="bg-white rounded-b-lg shadow-md p-8 flex flex-col items-center justify-center">
            <div className="text-center">
              <div className="bg-[#F5F5F5] rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <File className="text-[#666666]" size={32} />
              </div>
              <p className="text-[#1D1D1D] mb-2">No proforma invoices found</p>
              <p className="text-[#666666] text-sm mb-4">
                Try adjusting your filters or create a new invoice
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md mt-4">
            <div className="flex border-b bg-[#F5F5F5]">
              <div className="w-1/2 p-4 border-r text-center">
                <p className="text-[#038D33] text-sm font-medium">TOTAL PENDING</p>
                <p className="text-[#1D1D1D] text-xl font-semibold">₹111,00</p>
                <p className="text-[#666666] text-xs">0 invoices</p>
              </div>
              <div className="w-1/2 p-4 text-center">
                <p className="text-[#D13838] text-sm font-medium">OVERDUE</p>
                <p className="text-[#1D1D1D] text-xl font-semibold">₹0.00</p>
                <p className="text-[#666666] text-xs">0 invoices</p>
              </div>
            </div>
          </div>
          
          <div className="text-xs text-gray-500 text-right mt-4">
            <p>Last updated: {currentDate}</p>
            <p>User: {currentUser}</p>
          </div>
        </div>
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default ProformaInvoice;