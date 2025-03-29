import React, { useState } from 'react';
import { ChevronLeft, Plus, Calendar } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import BottomNavigation from '../../components/BottomNavigation';

const CreatePurchaseOrder = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [poDate, setPODate] = useState(new Date());
  const [validTill, setValidTill] = useState(new Date());
  const [items, setItems] = useState([]);

  const formatDate = (date) => {
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  };

  const handleBack = () => {
    if (location.state && location.state.from) {
      navigate(location.state.from); // Go back to previous page
    } else {
      navigate('/admin-dashboard'); // Fallback if no from route is available
    }
  };

  const handleAddItem = () => {
    // Logic to add new item
    setItems([...items, { id: Date.now() }]);
  };

  return (
    <div className="bg-[#F5F5F5] min-h-screen flex flex-col pb-16">
      <div className="bg-white shadow-sm px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <ChevronLeft 
            className="text-[#1D1D1D] cursor-pointer" 
            onClick={handleBack}
          />
          <h1 className="text-xl font-semibold text-[#1D1D1D]">Create Purchase Order</h1>
        </div>
        <div className="flex items-center space-x-3">
          <button className="text-[#3460DC] text-sm">PDF</button>
          <button className="text-[#3460DC] text-sm">
            <span className="material-icons">settings</span>
          </button>
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
              <label className="text-[#666666] text-sm mb-2 block">PO No.</label>
              <input 
                type="text" 
                defaultValue="1" 
                className="w-full border border-[#D9D9D9] rounded px-3 py-2 text-sm"
                readOnly
              />
            </div>
            <div>
              <label className="text-[#666666] text-sm mb-2 block">PO Date</label>
              <div className="relative">
                <input 
                  type="text" 
                  value={formatDate(poDate)}
                  onChange={(e) => {}} // Add date picker functionality if needed
                  className="w-full border border-[#D9D9D9] rounded px-3 py-2 text-sm pl-10"
                />
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#666666]" size={20} />
              </div>
            </div>
            <div>
              <label className="text-[#666666] text-sm mb-2 block">Valid Till</label>
              <div className="relative">
                <input 
                  type="text" 
                  value={formatDate(validTill)}
                  onChange={(e) => {}} // Add date picker functionality if needed
                  className="w-full border border-[#D9D9D9] rounded px-3 py-2 text-sm pl-10"
                />
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#666666]" size={20} />
              </div>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-[#666666] text-sm block">Items/Services</label>
              <button 
                onClick={handleAddItem}
                className="text-[#3460DC] text-sm flex items-center"
              >
                <Plus size={16} /> Add Item
              </button>
            </div>
            <div className="border border-dashed border-[#3460DC] rounded p-3">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-sm text-[#666666]">
                    <th className="py-1">NO</th>
                    <th className="py-1">ITEMS/SERVICES</th>
                    <th className="py-1">QTY</th>
                    <th className="py-1">TAX</th>
                    <th className="py-1">AMOUNT</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, index) => (
                    <tr key={item.id} className="text-sm">
                      <td className="py-2">{index + 1}</td>
                      <td className="py-2"></td>
                      <td className="py-2"></td>
                      <td className="py-2"></td>
                      <td className="py-2"></td>
                    </tr>
                  ))}
                  {items.length === 0 && (
                    <tr>
                      <td colSpan={5} className="text-center py-2 text-[#3460DC]">
                        + Add Item
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
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
                navigate('/create-po', { state: { from: location.state?.from } });
              }}
            >
              Save & New
            </button>
            <button 
              className="w-1/2 bg-[#3460DC] text-white rounded py-2 text-sm"
              onClick={() => {
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

export default CreatePurchaseOrder;