import React, { useState } from 'react';
import { 
  ChevronLeft, 
  Calendar as CalendarIcon, 
  Search,
  Settings,
  Plus
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import BottomNavigation from '../../components/BottomNavigation';

const DeliveryChallan = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeView, setActiveView] = useState('list');
  const [challanDate, setChallanDate] = useState(new Date());
  const [items, setItems] = useState([]);

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
          <h1 className="text-xl font-semibold text-[#1D1D1D]">Delivery Challans</h1>
        </div>
      </div>

      <div className="p-4 flex-grow">
        <div className="relative mb-4">
          <input 
            type="text" 
            placeholder="Search Challans..." 
            className="w-full border border-[#D9D9D9] rounded px-3 py-2 text-sm pl-10"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#666666]" size={20} />
        </div>

        <div className="flex space-x-2 mb-4">
          <button className="border border-[#D9D9D9] bg-white rounded px-3 py-1 text-sm">Last 365 days</button>
          <button className="border border-[#D9D9D9] bg-white rounded px-3 py-1 text-sm">Show Open Challans</button>
        </div>

        <div className="text-center py-16 bg-white rounded-lg shadow-md">
          <div className="flex justify-center mb-4">
            <div className="bg-[#F5F5F5] w-16 h-16 rounded-full flex items-center justify-center">
              <span className="text-2xl text-[#666666]">✕</span>
            </div>
          </div>
          <p className="text-[#666666]">No Transactions Matching the current filter</p>
        </div>

        <button 
          className="w-full mt-4 bg-[#3460DC] text-white py-2 rounded-lg"
          onClick={() => setActiveView('create')}
        >
          Create Delivery Challan
        </button>
      </div>

      <div className="text-xs text-gray-500 text-right mt-2 px-4">
        <p>Last updated: 2025-03-28 16:53:53</p>
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
          <h1 className="text-xl font-semibold text-[#1D1D1D]">Create Delivery Challan</h1>
        </div>
        <div className="flex items-center space-x-3">
          <button className="text-[#3460DC] text-sm">PDF</button>
          <Settings className="text-[#1D1D1D]" size={20} />
        </div>
      </div>

      <div className="p-4 flex-grow">
        <div className="bg-[#E6F7EF] p-3 rounded-lg mb-4 shadow-sm">
          <div className="flex justify-between">
            <div>
              <p className="font-semibold text-[#1D1D1D]">JOY HOMES</p>
              <p className="text-sm text-[#666666]">Hyderabad, Telangana</p>
            </div>
            <button className="border border-[#D9D9D9] bg-white rounded px-3 py-1 text-xs">Change Party</button>
          </div>
          <div className="flex justify-between mt-2">
            <div>
              <p className="text-sm font-semibold text-[#1D1D1D]">Ship to</p>
              <p className="text-sm text-[#666666]">SRM, Chennai, Tamil Nadu</p>
            </div>
            <button className="border border-[#D9D9D9] bg-white rounded px-3 py-1 text-xs">Change Shipping Address</button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="text-[#666666] text-sm mb-2 block">Challan No.</label>
            <input 
              type="text" 
              defaultValue="1" 
              className="w-full border border-[#D9D9D9] rounded px-3 py-2 text-sm"
              readOnly 
            />
          </div>
          <div>
            <label className="text-[#666666] text-sm mb-2 block">Challan Date</label>
            <div className="relative">
              <input 
                type="text" 
                value={formatDate(challanDate)}
                onChange={(e) => {}} // Add date picker functionality if needed
                className="w-full border border-[#D9D9D9] rounded px-3 py-2 text-sm pl-10"
              />
              <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#666666]" size={20} />
            </div>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <label className="text-[#666666] text-sm block">Items/Services</label>
            <button 
              onClick={() => setItems([...items, { id: Date.now() }])}
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

        <div className="flex space-x-4 mb-4">
          <button 
            className="w-1/2 border border-[#3460DC] text-[#3460DC] rounded py-2 text-sm"
            onClick={() => {
              // Clear form and stay on create view
              setItems([]);
              setChallanDate(new Date());
            }}
          >
            Save & New
          </button>
          <button 
            className="w-1/2 bg-[#3460DC] text-white rounded py-2 text-sm"
            onClick={() => {
              // Save and go back to list view
              setActiveView('list');
            }}
          >
            Save
          </button>
        </div>

        <div className="flex justify-between mb-4">
          <button className="text-[#3460DC] text-sm">+ Add Notes</button>
          <button className="text-[#3460DC] text-sm">+ Add Additional Charges</button>
        </div>

        <div className="text-center mb-4">
          <p className="text-[#666666]">SUBTOTAL: ₹0 ₹0 ₹0</p>
        </div>
      </div>

      <div className="text-xs text-gray-500 text-right mt-2 px-4">
        <p>Last updated: 2025-03-28 16:53:53</p>
        <p>User: krishh-kumarr</p>
      </div>

      <BottomNavigation />
    </div>
  );

  return activeView === 'list' ? renderListView() : renderCreateView();
};

export default DeliveryChallan;