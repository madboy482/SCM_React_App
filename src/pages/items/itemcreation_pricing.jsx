import React, { useState } from 'react';
import { ArrowLeft, Home, FileText, CreditCard, BarChart, PlusCircle } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import BottomNavigation from '../../components/BottomNavigation';

const ItemCreationPricing = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const initialFormData = location.state?.formData || {
    itemType: 'Product',
    category: '',
    itemName: '',
    showInOnlineStore: false,
    salesPrice: '',
    withTax: false,
    purchasePrice: '',
    purchaseWithTax: false,
    maximumRetailPrice: '',
    gstTaxRate: 'None',
    measuringUnit: 'Pieces(PCS)',
    openingStock: '',
    enableBatching: false,
    customFields: {},
    showWholesaleRate: false,
    wholesaleRate: ''
  };
  
  const [formData, setFormData] = useState(initialFormData);
  const [activeSection, setActiveSection] = useState('pricing-details');

  const sections = [
    { id: 'basic-details', label: 'Basic Details', icon: FileText, path: '/item_creation_basic' },
    { id: 'stock-details', label: 'Stock Details', icon: BarChart, path: '/item_creation_stock' },
    { id: 'pricing-details', label: 'Pricing Details', icon: CreditCard },
    { id: 'custom-fields', label: 'Custom Fields', icon: Home, path: '/item_creation_fields' }
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleBack = () => {
    navigate('/parties-inventory');
  };

  const handleSectionClick = (sectionId, path) => {
    if (path) {
      // Navigate to the separate component
      navigate(path, { state: { formData } });
    } else {
      // Just change the active section within this component
      setActiveSection(sectionId);
    }
  };

  const toggleWholesaleRate = () => {
    setFormData(prev => ({
      ...prev,
      showWholesaleRate: !prev.showWholesaleRate
    }));
  };

  const handleSave = () => {
    // Save logic would go here - like API calls, etc.
    // For now, we'll just navigate to the custom fields page with the current form data
    navigate('/item_creation_fields', { state: { formData } });
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
          <span className="text-xl font-semibold text-purple-600">Create New Item</span>
        </div>
        <div className="flex items-center space-x-2">
          <button className="text-gray-600 hover:bg-gray-100 p-2 rounded">Cancel</button>
          <button 
            className="bg-purple-600 text-white px-4 py-2 rounded flex items-center"
            onClick={handleSave}
          >
            <PlusCircle size={18} className="mr-2" />
            Save
          </button>
        </div>
      </div>

      {/* Section Navigation */}
      <div className="bg-white shadow-sm flex justify-between p-2 mx-4 rounded-lg">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => handleSectionClick(section.id, section.path)}
            className={`flex flex-col items-center p-2 rounded-lg w-full ${
              activeSection === section.id 
                ? 'bg-purple-100 text-purple-600' 
                : 'text-gray-500 hover:bg-gray-100'
            }`}
          >
            <section.icon size={20} />
            <span className="text-xs mt-1">{section.label}</span>
          </button>
        ))}
      </div>

      {/* Form Content - Updated to match CreateItemForm style */}
      <div className="flex-grow bg-white m-4 rounded-lg shadow-sm">
        <div className="p-4 space-y-4">
          {/* Sales Price */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Sales Price</label>
            <div className="flex gap-4">
              <div className="flex-grow relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <span className="text-gray-700">₹</span>
                </div>
                <input 
                  type="text"
                  name="salesPrice"
                  value={formData.salesPrice}
                  onChange={handleInputChange}
                  placeholder="ex: ₹200"
                  className="w-full border rounded px-2 py-1 pl-8"
                />
              </div>
              <button
                className={`px-4 py-1 rounded border ${formData.withTax ? 'bg-purple-600 text-white' : 'bg-white text-black'}`}
                onClick={() => setFormData(prev => ({...prev, withTax: !prev.withTax}))}
              >
                With Tax
              </button>
            </div>
          </div>
          
          {/* Purchase Price */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Purchase Price</label>
            <div className="flex gap-4">
              <div className="flex-grow relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <span className="text-gray-700">₹</span>
                </div>
                <input 
                  type="text"
                  name="purchasePrice"
                  value={formData.purchasePrice}
                  onChange={handleInputChange}
                  placeholder="ex: ₹200"
                  className="w-full border rounded px-2 py-1 pl-8"
                />
              </div>
              <button
                className={`px-4 py-1 rounded border ${formData.purchaseWithTax ? 'bg-purple-600 text-white' : 'bg-white text-black'}`}
                onClick={() => setFormData(prev => ({...prev, purchaseWithTax: !prev.purchaseWithTax}))}
              >
                With Tax
              </button>
            </div>
          </div>
          
          {/* Maximum Retail Price */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Maximum Retail Price(MRP)</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <span className="text-gray-700">₹</span>
              </div>
              <input 
                type="text"
                name="maximumRetailPrice"
                value={formData.maximumRetailPrice}
                onChange={handleInputChange}
                placeholder="ex: ₹200"
                className="w-full border rounded px-2 py-1 pl-8"
              />
            </div>
          </div>
          
          {/* GST Tax Rate */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">GST Tax Rate(%)</label>
            <select
              name="gstTaxRate"
              value={formData.gstTaxRate}
              onChange={handleInputChange}
              className="w-full border rounded px-2 py-1 appearance-none"
            >
              <option value="None">None</option>
              <option value="5">5%</option>
              <option value="12">12%</option>
              <option value="18">18%</option>
              <option value="28">28%</option>
            </select>
          </div>
          
          {/* Wholesale Rate */}
          <button 
            className="text-purple-600 font-medium flex items-center mt-4"
            onClick={toggleWholesaleRate}
          >
            <span className="text-xl mr-1">+</span> Wholesale Rate
          </button>
          
          {formData.showWholesaleRate && (
            <div className="space-y-2 pl-6">
              <label className="block text-sm font-medium text-gray-700">Wholesale Rate</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <span className="text-gray-700">₹</span>
                </div>
                <input 
                  type="text"
                  name="wholesaleRate"
                  value={formData.wholesaleRate}
                  onChange={handleInputChange}
                  placeholder="ex: ₹180"
                  className="w-full border rounded px-2 py-1 pl-8"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation />

      {/* Custom Toggle Switch CSS */}
      <style jsx>{`
        .switch {
          position: relative;
          display: inline-block;
          width: 50px;
          height: 24px;
        }
        .slider {
          position: absolute;
          cursor: pointer;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          transition: .4s;
          border-radius: 34px;
        }
        .slider:before {
          position: absolute;
          content: "";
          height: 18px;
          width: 18px;
          left: 3px;
          bottom: 3px;
          background-color: white;
          transition: .4s;
          border-radius: 50%;
        }
        input:checked + .slider:before {
          transform: translateX(26px);
        }
      `}</style>
    </div>
  );
};

export default ItemCreationPricing;