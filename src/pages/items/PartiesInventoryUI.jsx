import React, { useState } from 'react';
import { Home, FileText, CreditCard, BarChart, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import BottomNavigation from '../../components/BottomNavigation';

const PartiesInventoryUI = () => {
  const navigate = useNavigate();
  const [path, setPath] = useState('/item_creation_basic');

  const handleClick = () => {
    if (path) {
      navigate(path);
    }
  };

  const [items, setItems] = useState([
    { 
      itemName: 'FCCAKE-FNN', 
      itemCode: '0023', 
      stock: '34 PAC', 
      sellingPrice: '₹75', 
      purchasePrice: '₹64.07', 
      mrp: '₹75' 
    },
    { 
      itemName: 'FCCAKE-CF', 
      itemCode: '0024', 
      stock: '34 PAC', 
      sellingPrice: '₹75', 
      purchasePrice: '₹64.07', 
      mrp: '₹75' 
    },
    { 
      itemName: 'FCCAKE-D', 
      itemCode: '0025', 
      stock: '34 PAC', 
      sellingPrice: '₹75', 
      purchasePrice: '₹64.07', 
      mrp: '₹75' 
    }
  ]);

  const handleBack = () => {
    // Navigate back to the previous page
    navigate('/admin-dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col pb-16">
      {/* Top Navigation Bar */}
      <div className="bg-white shadow-sm p-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <ArrowLeft 
            className="text-[#1D1D1D] cursor-pointer mr-2" 
            onClick={handleBack}
          />
          <span className="text-xl font-semibold text-purple-600">Items</span>
          <span className="bg-purple-100 text-purple-600 rounded-full px-2 py-1 text-xs">29</span>
        </div>
        <div className="flex items-center space-x-2">
          <button className="text-gray-600 hover:bg-gray-100 p-2 rounded">Reports</button>
          <button
            className="bg-purple-600 text-white px-4 py-2 rounded"
            onClick={handleClick}
          >
            + Create Item
          </button>
        </div>
      </div>

      {/* Filters and Summary */}
      <div className="p-4 bg-white m-4 rounded-lg shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <input 
            type="text" 
            placeholder="Search Item..." 
            className="border rounded px-3 py-2 w-full mr-4"
          />
          <div className="flex space-x-2">
            <select className="border rounded px-3 py-2">
              <option>Filter by: Select Categories</option>
            </select>
            <button className="border rounded px-3 py-2">Show Low Stock</button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="bg-gray-100 p-4 rounded">
            <span className="text-gray-600">Stock Value</span>
            <div className="text-2xl font-bold">29</div>
          </div>
          <div className="bg-yellow-100 p-4 rounded">
            <span className="text-gray-600">Low Stock</span>
            <div className="text-2xl font-bold text-yellow-700">0</div>
          </div>
          <div className="bg-red-100 p-4 rounded">
            <span className="text-gray-600">Items Expiring (30 days)</span>
            <div className="text-2xl font-bold text-red-700">3</div>
          </div>
        </div>

        {/* Bulk Action */}
        <div className="flex justify-between items-center">
          <select className="border rounded px-3 py-2">
            <option>Bulk Action</option>
          </select>
          <button
            className="bg-purple-600 text-white px-4 py-2 rounded"
            onClick={handleClick}
          >
            + Create Item
          </button>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="m-4 bg-white rounded-lg shadow-sm overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="p-3 text-left">Item Name</th>
              <th className="p-3 text-left">Item Code</th>
              <th className="p-3 text-left">Stock</th>
              <th className="p-3 text-left">Selling Price</th>
              <th className="p-3 text-left">Purchase Price</th>
              <th className="p-3 text-left">MRP</th>
              <th className="p-3 text-left">Wholesale Price</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="p-3">{item.itemName}</td>
                <td className="p-3">{item.itemCode}</td>
                <td className="p-3">{item.stock}</td>
                <td className="p-3">{item.sellingPrice}</td>
                <td className="p-3">{item.purchasePrice}</td>
                <td className="p-3">{item.mrp}</td>
                <td className="p-3">{item.mrp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Using the shared BottomNavigation component */}
      <BottomNavigation />
    </div>
  );
};

export default PartiesInventoryUI;