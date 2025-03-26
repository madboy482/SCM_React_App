import React, { useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import BottomNavigation from '../../components/BottomNavigation';

const AddressPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    billingAddress: '',
    sameAsBilling: false,
    shippingAddress: '',
    creditPeriod: '30 Days',
    creditLimit: '',
    customField: ''
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    
    setFormData(prev => {
      const newState = {
        ...prev,
        [name]: newValue
      };
      
      // If same as billing is checked, copy billing address to shipping address
      if (name === 'sameAsBilling' && checked) {
        newState.shippingAddress = prev.billingAddress;
      }
      
      return newState;
    });
  };

  const handleBack = () => {
    navigate('/create-party');
  };

  const handleSave = () => {
    console.log('Saving address:', formData);
    navigate('/parties');
  };

  const handleSaveAndNew = () => {
    console.log('Saving address and creating new:', formData);
    // Reset form or handle as needed
    setFormData({
      billingAddress: '',
      sameAsBilling: false,
      shippingAddress: '',
      creditPeriod: '30 Days',
      creditLimit: '',
      customField: ''
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
        <h1 className="font-bold text-lg text-primary-purple">Address</h1>
      </div>

      <div className="p-4 flex-grow">
        <div className="bg-white rounded-lg shadow-md p-4 space-y-4">
          <div>
            <label className="text-gray-600 text-sm mb-2 block">Billing Address</label>
            <textarea 
              name="billingAddress"
              value={formData.billingAddress}
              onChange={handleInputChange}
              placeholder="Enter Billing Address" 
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-purple"
              rows={3}
            />
          </div>

          <div>
            <label className="text-gray-600 text-sm mb-2 block">Shipping Address</label>
            <div className="flex items-center mb-2">
              <input 
                type="checkbox" 
                id="sameAsBilling" 
                name="sameAsBilling"
                checked={formData.sameAsBilling}
                onChange={handleInputChange}
                className="mr-2 h-4 w-4 text-primary-purple rounded focus:ring-primary-purple"
              />
              <label htmlFor="sameAsBilling" className="text-sm text-gray-800">
                Same as Billing Address
              </label>
            </div>
            <textarea 
              name="shippingAddress"
              value={formData.shippingAddress}
              onChange={handleInputChange}
              placeholder="Enter Shipping Address" 
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-purple"
              rows={3}
              disabled={formData.sameAsBilling}
            />
          </div>

          <div>
            <label className="text-gray-600 text-sm mb-2 block">Credit Period</label>
            <select 
              name="creditPeriod"
              value={formData.creditPeriod}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-purple"
            >
              <option>30 Days</option>
              <option>45 Days</option>
              <option>60 Days</option>
              <option>90 Days</option>
            </select>
          </div>

          <div>
            <label className="text-gray-600 text-sm mb-2 block">Credit Limit</label>
            <input 
              type="number" 
              name="creditLimit"
              value={formData.creditLimit}
              onChange={handleInputChange}
              placeholder="₹" 
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-purple"
            />
          </div>

          <div>
            <label className="text-gray-600 text-sm mb-2 block">Custom Field</label>
            <input 
              type="text" 
              name="customField"
              value={formData.customField}
              onChange={handleInputChange}
              placeholder="Custom Value" 
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-purple"
            />
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

export default AddressPage;