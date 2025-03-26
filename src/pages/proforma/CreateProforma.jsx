import React from 'react';
import { 
  ChevronLeft, 
  Plus
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import BottomNavigation from '../../components/BottomNavigation';

const CreateProforma = () => {
  const navigate = useNavigate();
  const currentDate = '2025-03-25 13:49:37';
  const currentUser = 'madboy482';

  const handleBack = () => {
    navigate('/proforma-invoice');
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5] flex flex-col pb-16">
      <div className="bg-white shadow-sm px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <ChevronLeft 
            className="text-[#1D1D1D] cursor-pointer" 
            onClick={handleBack}
          />
          <h1 className="text-xl font-semibold text-[#1D1D1D]">Create Proforma Invoice</h1>
        </div>
        <div className="flex items-center space-x-3">
          <button className="text-[#3460DC] text-sm">PDF</button>
        </div>
      </div>

      <div className="flex flex-col flex-grow">
        <div className="p-4 bg-[#F5F5F5]">
          <div className="bg-white rounded-lg shadow-md p-4 space-y-4">
            <div>
              <label className="text-[#666666] text-sm mb-2 block">Bill To</label>
              <div className="border border-dashed border-[#3460DC] rounded p-3 text-center text-[#3460DC]">
                <Plus className="mx-auto mb-1" size={18} />
                <p className="text-sm">+ Add Party</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[#666666] text-sm mb-2 block">Invoice No.</label>
                <input 
                  type="text" 
                  defaultValue="Proforma Invoice" 
                  className="w-full border border-[#D9D9D9] rounded px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="text-[#666666] text-sm mb-2 block">Date</label>
                <input 
                  type="date" 
                  defaultValue="2025-03-15" 
                  className="w-full border border-[#D9D9D9] rounded px-3 py-2 text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[#666666] text-sm mb-2 block">Payment Terms</label>
                <input 
                  type="text" 
                  defaultValue="30 days" 
                  className="w-full border border-[#D9D9D9] rounded px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="text-[#666666] text-sm mb-2 block">Expiry Date</label>
                <input 
                  type="date" 
                  defaultValue="2025-02-24" 
                  className="w-full border border-[#D9D9D9] rounded px-3 py-2 text-sm"
                />
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
                  navigate('/create-proforma-invoice'); // Reset form
                }}
              >
                Save & New
              </button>
              <button 
                className="w-1/2 bg-[#3460DC] text-white rounded py-2 text-sm"
                onClick={() => {
                  // Save logic here
                  navigate('/proforma-invoice');
                }}
              >
                Save
              </button>
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

export default CreateProforma;