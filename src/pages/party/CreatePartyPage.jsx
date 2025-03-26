import React, { useState } from 'react';
import { ChevronLeft, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import BottomNavigation from '../../components/BottomNavigation';

const CreatePartyPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    partyName: '',
    mobileNumber: '',
    email: '',
    openingBalance: '0',
    balanceType: 'Collect',
    gstin: '',
    partyType: 'Customer',
    partyCategory: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleBack = () => {
    navigate('/parties');
  };

  const handleSave = () => {
    console.log('Saving party:', formData);
    navigate('/party-address');
  };

  const handleSaveAndNew = () => {
    console.log('Saving party and creating new:', formData);
    // Reset form or handle as needed
    setFormData({
      partyName: '',
      mobileNumber: '',
      email: '',
      openingBalance: '0',
      balanceType: 'Collect',
      gstin: '',
      partyType: 'Customer',
      partyCategory: ''
    });
  };

  return (
    <div className="min-h-screen bg-background-light flex flex-col">
      {/* Top Navigation */}
      <div className="p-4 bg-white shadow-sm flex items-center">
        <button 
          onClick={handleBack}
          className="p-2 mr-2 text-gray-600 hover:text-primary-purple"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <h1 className="font-bold text-lg text-primary-purple">Create Party</h1>
      </div>

      <div className="p-4 flex-grow">
        <div className="bg-white rounded-lg shadow-md p-4 space-y-4">
          <div>
            <label className="text-gray-600 text-sm mb-2 block">Party Name*</label>
            <div className="relative">
              <input 
                type="text" 
                name="partyName"
                value={formData.partyName}
                onChange={handleInputChange}
                placeholder="Enter Party Name" 
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-purple"
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            </div>
          </div>

          <div>
            <label className="text-gray-600 text-sm mb-2 block">Mobile Number</label>
            <input 
              type="tel" 
              name="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleInputChange}
              placeholder="Enter Mobile Number" 
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-purple"
            />
          </div>

          <div>
            <label className="text-gray-600 text-sm mb-2 block">Email</label>
            <input 
              type="email" 
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter Email" 
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-purple"
            />
          </div>

          <div className="flex space-x-4">
            <div className="w-1/2">
              <label className="text-gray-600 text-sm mb-2 block">Opening Balance</label>
              <input
                type="number"
                name="openingBalance"
                value={formData.openingBalance}
                onChange={handleInputChange}
                placeholder="0"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-purple"
              />
            </div>
            <div className="w-1/2">
              <label className="text-gray-600 text-sm mb-2 block">To</label>
              <select 
                name="balanceType"
                value={formData.balanceType}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-purple"
              >
                <option>Collect</option>
                <option>Pay</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-gray-600 text-sm mb-2 block">GSTIN</label>
            <div className="flex">
              <input 
                type="text" 
                name="gstin"
                value={formData.gstin}
                onChange={handleInputChange}
                placeholder="29XXXXXXXXX414" 
                className="w-full border border-gray-300 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-purple"
              />
              <button className="bg-primary-purple text-white px-4 rounded-r-lg text-sm hover:bg-purple-700 transition-colors">
                Get Details
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Note: You can auto populate party details from GSTIN
            </p>
          </div>

          <div>
            <label className="text-gray-600 text-sm mb-2 block">Party Type*</label>
            <select 
              name="partyType"
              value={formData.partyType}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-purple"
            >
              <option>Customer</option>
              <option>Supplier</option>
              <option>Both</option>
            </select>
          </div>

          <div>
            <label className="text-gray-600 text-sm mb-2 block">Party Category*</label>
            <select 
              name="partyCategory"
              value={formData.partyCategory}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-purple"
            >
              <option value="">Select Category</option>
              <option value="retail">Retail</option>
              <option value="wholesale">Wholesale</option>
              <option value="distributor">Distributor</option>
            </select>
          </div>

          <div className="flex space-x-4 pt-4">
            <button 
              onClick={handleSaveAndNew}
              className="w-1/2 border border-primary-purple text-primary-purple rounded-lg py-2 text-sm hover:bg-purple-50 transition-colors"
            >
              Save & New
            </button>
            <button 
              onClick={handleSave}
              className="w-1/2 bg-primary-purple text-white rounded-lg py-2 text-sm hover:bg-purple-700 transition-colors"
            >
              Save
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
};

export default CreatePartyPage;