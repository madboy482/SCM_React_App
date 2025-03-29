import React from 'react';
import { 
  ChevronLeft, 
  Calendar,
  Plus
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import BottomNavigation from '../../components/BottomNavigation';

const CreatePI = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F5F5F5] flex flex-col pb-16">
      <div className="bg-white shadow-sm px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <ChevronLeft 
            className="text-[#1D1D1D] cursor-pointer"
            onClick={() => navigate(-1)} 
          />
          <h1 className="text-xl font-semibold text-[#1D1D1D]">Create Purchase Invoice</h1>
        </div>
        <div className="flex items-center space-x-3">
          <button className="text-[#3460DC] text-sm">PDF</button>
        </div>
      </div>

      <div className="p-4 flex-grow">
        <div className="bg-white rounded-lg shadow-md p-4 space-y-4">
          <div>
            <label className="text-[#666666] text-sm mb-2 block">Bill From</label>
            <div className="border border-dashed border-[#3460DC] rounded p-3 text-center text-[#3460DC]">
              + Add Party
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[#666666] text-sm mb-2 block">Invoice Profile</label>
              <input 
                type="text" 
                defaultValue="VILVAHNRSI/PO" 
                className="w-full border border-[#D9D9D9] rounded px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="text-[#666666] text-sm mb-2 block">Invoice Number</label>
              <input 
                type="text" 
                defaultValue="2223" 
                className="w-full border border-[#D9D9D9] rounded px-3 py-2 text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[#666666] text-sm mb-2 block">Purchase Inv Date</label>
              <div className="relative">
                <input 
                  type="text" 
                  defaultValue="16 Mar 2025" 
                  className="w-full border border-[#D9D9D9] rounded px-3 py-2 text-sm pl-10"
                />
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#666666]" size={20} />
              </div>
            </div>
            <div>
              <label className="text-[#666666] text-sm mb-2 block">Due Date</label>
              <div className="relative">
                <input 
                  type="text" 
                  defaultValue="16 Mar 2025" 
                  className="w-full border border-[#D9D9D9] rounded px-3 py-2 text-sm pl-10"
                />
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#666666]" size={20} />
              </div>
            </div>
          </div>

          <div>
            <label className="text-[#666666] text-sm mb-2 block">Items/Services</label>
            <div className="border border-dashed border-[#3460DC] rounded p-3 flex justify-between items-center">
              <span className="text-[#3460DC]">No./ITEMS/SERVICES</span>
              <div className="flex items-center space-x-2">
                <span className="text-[#666666]">QTY</span>
                <span className="text-[#666666]">TAX</span>
                <span className="text-[#666666]">AMOUNT</span>
                <Plus className="text-[#3460DC]" size={20} />
              </div>
            </div>
          </div>

          <div className="flex justify-between bg-[#F5F5F5] p-3 rounded">
            <span className="text-[#666666]">SUBTOTAL</span>
            <div className="flex space-x-4">
              <span>₹0</span>
              <span>₹0</span>
              <span>₹0</span>
            </div>
          </div>

          <div className="flex space-x-4">
            <button 
              className="w-1/2 border border-[#3460DC] text-[#3460DC] rounded py-2 text-sm"
              onClick={() => {
                // Save logic here
                navigate('/create-purchase-invoice'); // Reset form
              }}
            >
              Save & New
            </button>
            <button 
              className="w-1/2 bg-[#3460DC] text-white rounded py-2 text-sm"
              onClick={() => {
                // Save logic here
                navigate('/purchase-orders');
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

export default CreatePI;