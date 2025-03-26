import React from 'react';
import { 
  ChevronLeft,
  Plus, 
  Calendar 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import BottomNavigation from '../../components/BottomNavigation';

const CreatePR = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-[#F5F5F5] min-h-screen flex flex-col pb-16">
      <div className="bg-white shadow-sm px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <ChevronLeft 
            className="text-[#1D1D1D] cursor-pointer" 
            onClick={() => navigate('/purchase-return-list')}
          />
          <h1 className="text-xl font-semibold text-[#1D1D1D]">Create Purchase Return</h1>
        </div>
        <div className="flex items-center space-x-3">
          <button className="text-[#3460DC] text-sm">PDF</button>
        </div>
      </div>

      <div className="p-4 bg-[#F5F5F5] flex-grow">
        <div className="bg-white rounded-lg shadow-md p-4 space-y-4">
          <div>
            <label className="text-[#666666] text-sm mb-2 block">Bill From</label>
            <div className="border border-dashed border-[#3460DC] rounded p-3 text-center text-[#3460DC]">
              + Add Party
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[#666666] text-sm mb-2 block">Purchase Return No</label>
              <input 
                type="text" 
                defaultValue="1" 
                className="w-full border border-[#D9D9D9] rounded px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="text-[#666666] text-sm mb-2 block">Purchase Return Date</label>
              <div className="relative">
                <input 
                  type="text" 
                  defaultValue="13 Mar 2025" 
                  className="w-full border border-[#D9D9D9] rounded px-3 py-2 text-sm pl-10"
                />
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#666666]" size={20} />
              </div>
            </div>
          </div>

          <div>
            <label className="text-[#666666] text-sm mb-2 block">Items/Services</label>
            <div className="border border-dashed border-[#3460DC] rounded p-3 flex justify-between items-center">
              <span className="text-[#3460DC]">NO./ITEMS/SERVICES</span>
              <div className="flex items-center space-x-2">
                <span className="text-[#666666]">QTY</span>
                <span className="text-[#666666]">TAX</span>
                <span className="text-[#666666]">AMOUNT</span>
                <Plus className="text-[#3460DC]" size={20} />
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2 mb-4">
            <div className="flex-grow border border-dashed border-[#3460DC] rounded p-3 text-center text-[#3460DC]">
              Scan Barcode
            </div>
          </div>

          <div className="flex space-x-4">
            <button 
              className="w-1/2 border border-[#3460DC] text-[#3460DC] rounded py-2 text-sm"
              onClick={() => {
                // Save logic here
                navigate('/create-purchase-return'); // Reset form
              }}
            >
              Save & New
            </button>
            <button 
              className="w-1/2 bg-[#3460DC] text-white rounded py-2 text-sm"
              onClick={() => {
                // Save logic here
                navigate('/purchase-return-list');
              }}
            >
              Save
            </button>
          </div>
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default CreatePR;