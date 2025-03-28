import React, { useState } from 'react';
import { 
  ChevronLeft, 
  Search, 
  Filter, 
  Download, 
  X
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import BottomNavigation from '../../components/BottomNavigation';

const PRList = () => {
  const [filterOption, setFilterOption] = useState('Last 365 Days');
  const [showOpenChallan, setShowOpenChallan] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="bg-[#F5F5F5] min-h-screen flex flex-col pb-16">
      <div className="bg-white shadow-sm px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <ChevronLeft 
            className="text-[#1D1D1D] cursor-pointer" 
            onClick={() => navigate(-1)}
          />
          <h1 className="text-xl font-semibold text-[#1D1D1D]">Purchase Return</h1>
        </div>
        <div className="flex items-center space-x-3">
          <Filter className="text-[#1D1D1D]" size={20} />
          <Download className="text-[#1D1D1D]" size={20} />
        </div>
      </div>

      <div className="p-4 bg-[#F5F5F5] flex-grow">
        <div className="relative mb-4">
          <input 
            type="text" 
            placeholder="Search Challans..." 
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
          <div className="flex items-center space-x-2">
            <span className="text-sm text-[#1D1D1D]">Show Open Challans</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                checked={showOpenChallan}
                onChange={() => setShowOpenChallan(!showOpenChallan)}
                className="sr-only peer"
              />
              <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#3460DC]"></div>
            </label>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center justify-center">
          <div className="bg-[#F5F5F5] rounded-full p-4 mb-4">
            <X className="text-[#3460DC] w-12 h-12" />
          </div>
          <p className="text-[#666666] text-center mb-4">
            No Transactions Matching the current filter
          </p>
          <button 
            className="bg-[#3460DC] text-white px-4 py-2 rounded"
            onClick={() => navigate('/create-purchase-return')}
          >
            Create Purchase Return
          </button>
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default PRList;