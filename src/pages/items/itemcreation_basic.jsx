import React, { useState } from 'react';
import { ArrowLeft, Home, FileText, CreditCard, BarChart, PlusCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import BottomNavigation from '../../components/BottomNavigation';

const CreateItemForm = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('basic-details');
  const [formData, setFormData] = useState({
    itemType: 'Product',
    category: '',
    itemName: '',
    showInOnlineStore: false,
    salesPrice: '',
    withTax: false,
    gstTaxRate: 'None',
    measuringUnit: 'Pieces(PCS)',
    openingStock: '',
    enableBatching: false,
    customFields: {},
    itemCode: '',
    hsnCode: '',
    godown: '',
    asOfDate: '2025-03-16',
    pricingType: '',
    sellingPrice: ''
  });

  const sections = [
    { id: 'basic-details', label: 'Basic Details', icon: FileText },
    { id: 'stock-details', label: 'Stock Details', icon: BarChart, path: '/item_creation_stock' },
    { id: 'pricing-details', label: 'Pricing Details', icon: CreditCard, path: '/item_creation_pricing' },
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

  const handleSave = () => {
    // Here you would typically save the data to your backend or state management
    console.log('Saving form data:', formData);
    
    // Navigate to the next page (stock details) with the form data
    navigate('/item_creation_stock', { state: { formData } });
  };

  const renderActiveSection = () => {
    switch(activeSection) {
      case 'basic-details':
        return (
          <div className="bg-white rounded-lg p-4 space-y-4">
            <div className="space-y-2">
              <label className="block text-gray-800 font-medium">Item Type <span className="text-red-500">*</span></label>
              <div className="grid grid-cols-2 gap-2">
                {/* Added onClick handler to change itemType to 'Product' */}
                <div 
                  className={`border rounded-lg p-2 flex items-center cursor-pointer ${formData.itemType === 'Product' ? 'border-purple-500 bg-purple-50' : 'border-gray-300'}`}
                  onClick={() => setFormData({...formData, itemType: 'Product'})}
                >
                  <div className={`w-5 h-5 rounded-full border ${formData.itemType === 'Product' ? 'border-purple-500 bg-purple-500' : 'border-gray-400'} mr-2 flex items-center justify-center`}>
                    {formData.itemType === 'Product' && <div className="w-2 h-2 bg-white rounded-full"></div>}
                  </div>
                  <span>Product</span>
                </div>
                {/* Added onClick handler to change itemType to 'Service' */}
                <div 
                  className={`border rounded-lg p-2 flex items-center cursor-pointer ${formData.itemType === 'Service' ? 'border-purple-500 bg-purple-50' : 'border-gray-300'}`}
                  onClick={() => setFormData({...formData, itemType: 'Service'})}
                >
                  <div className={`w-5 h-5 rounded-full border ${formData.itemType === 'Service' ? 'border-purple-500 bg-purple-500' : 'border-gray-400'} mr-2 flex items-center justify-center`}>
                    {formData.itemType === 'Service' && <div className="w-2 h-2 bg-white rounded-full"></div>}
                  </div>
                  <span>Service</span>
                </div>
              </div>
            </div>
  
            <div className="space-y-1">
              <label className="block text-gray-800 font-medium">Category</label>
              <div className="relative">
                <select 
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg p-2 pr-8 appearance-none"
                >
                  <option value="">Select Category</option>
                  <option value="category1">Category 1</option>
                  <option value="category2">Category 2</option>
                </select>
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
  
            <div className="space-y-1">
              <label className="block text-gray-800 font-medium">Item Name <span className="text-red-500">*</span></label>
              <input 
                type="text" 
                name="itemName"
                value={formData.itemName}
                onChange={handleInputChange}
                placeholder="ex: Maggie 20gm" 
                className="w-full border border-gray-300 rounded-lg p-2"
              />
              {!formData.itemName && <p className="text-red-500 text-xs">Please enter the item name</p>}
            </div>
  
            <div className="flex items-center justify-between">
              <label className="block text-gray-800 font-medium">Show Item in Online Store</label>
              <div className="relative">
                <input 
                  type="checkbox" 
                  name="showInOnlineStore"
                  checked={formData.showInOnlineStore}
                  onChange={handleInputChange}
                  className="sr-only"
                  id="onlineStore"
                />
                <label 
                  htmlFor="onlineStore" 
                  className={`block w-12 h-6 rounded-full transition-colors duration-200 ease-in-out ${formData.showInOnlineStore ? 'bg-purple-500' : 'bg-gray-300'}`}
                >
                  <span 
                    className={`block w-5 h-5 mt-0.5 ml-0.5 bg-white rounded-full transition-transform duration-200 ease-in-out ${formData.showInOnlineStore ? 'transform translate-x-6' : ''}`}
                  ></span>
                </label>
              </div>
            </div>
  
            <div className="space-y-1">
              <label className="block text-gray-800 font-medium">Sales Price</label>
              <div className="flex">
                <div className="bg-gray-100 border border-gray-300 rounded-l-lg p-2 flex items-center">
                  <span className="text-gray-500">₹</span>
                </div>
                <input 
                  type="text" 
                  name="salesPrice"
                  value={formData.salesPrice}
                  onChange={handleInputChange}
                  placeholder="ex: ₹200" 
                  className="flex-grow border border-gray-300 rounded-r-lg p-2"
                />
              </div>
            </div>
  
            <div className="flex justify-end">
              {/* Modified "With Tax" to be clickable with state tracking */}
              <div 
                className={`border rounded-lg p-2 cursor-pointer ${formData.withTax ? 'bg-purple-50 border-purple-500 text-purple-700' : 'bg-gray-100 border-gray-300 text-gray-700'}`}
                onClick={() => setFormData({...formData, withTax: !formData.withTax})}
              >
                <span>With Tax</span>
              </div>
            </div>
  
            <div className="space-y-1">
              <label className="block text-gray-800 font-medium">GST Tax Rate(%)</label>
              <input 
                type="text" 
                name="gstTaxRate"
                value={formData.gstTaxRate}
                onChange={handleInputChange}
                placeholder="None" 
                className="w-full border border-gray-300 rounded-lg p-2"
              />
            </div>
  
            <div className="space-y-1">
              <label className="block text-gray-800 font-medium">Measuring Unit</label>
              <input 
                type="text" 
                name="measuringUnit"
                value={formData.measuringUnit}
                onChange={handleInputChange}
                placeholder="Pieces(PCS)" 
                className="w-full border border-gray-300 rounded-lg p-2"
              />
            </div>
  
            <div className="space-y-1">
              <label className="block text-gray-800 font-medium">Opening Stock</label>
              <div className="flex">
                <input 
                  type="text" 
                  name="openingStock"
                  value={formData.openingStock}
                  onChange={handleInputChange}
                  placeholder="ex: 150 PCS" 
                  className="flex-grow border border-gray-300 rounded-l-lg p-2"
                />
                <div className="bg-white border border-gray-300 rounded-r-lg p-2 flex items-center">
                  <span className="text-gray-700">PCS</span>
                </div>
              </div>
            </div>
  
            <div className="border border-gray-300 rounded-lg p-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="text-gray-800 font-medium mr-2">Enable Batching</span>
                  <div className="bg-purple-100 text-purple-600 rounded-full w-5 h-5 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <div className="relative">
                  <input 
                    type="checkbox" 
                    name="enableBatching"
                    checked={formData.enableBatching}
                    onChange={handleInputChange}
                    className="sr-only"
                    id="enableBatching"
                  />
                  <label 
                    htmlFor="enableBatching" 
                    className={`block w-12 h-6 rounded-full transition-colors duration-200 ease-in-out ${formData.enableBatching ? 'bg-purple-500' : 'bg-gray-300'}`}
                  >
                    <span 
                      className={`block w-5 h-5 mt-0.5 ml-0.5 bg-white rounded-full transition-transform duration-200 ease-in-out ${formData.enableBatching ? 'transform translate-x-6' : ''}`}
                    ></span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
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

      {/* Form Content */}
      <div className="flex-grow bg-white m-4 rounded-lg shadow-sm">
        {renderActiveSection()}
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

export default CreateItemForm;