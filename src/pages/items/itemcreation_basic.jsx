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
            <div className="p-4 space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Item Code</label>
              <div className="flex">
                <input 
                  type="text" 
                  name="itemCode"
                  value={formData.itemCode}
                  onChange={handleInputChange}
                  placeholder="Ex: ITM12367" 
                  className="flex-grow border rounded-l px-2 py-1"
                />
                <button className="bg-blue-500 text-white px-3 rounded-r">
                  Generate Barcode
                </button>
              </div>
            </div>
    
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">HSN Code</label>
              <input 
                type="text" 
                name="hsnCode"
                value={formData.hsnCode}
                onChange={handleInputChange}
                placeholder="Ex: 4010" 
                className="w-full border rounded px-2 py-1"
              />
            </div>
    
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Measuring Unit</label>
              <input 
                type="text" 
                name="measuringUnit"
                value={formData.measuringUnit}
                onChange={handleInputChange}
                placeholder="Pieces (PCS)" 
                className="w-full border rounded px-2 py-1"
              />
            </div>
    
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Godown</label>
              <input 
                type="text" 
                name="godown"
                value={formData.godown}
                onChange={handleInputChange}
                placeholder="Select Godown" 
                className="w-full border rounded px-2 py-1"
              />
            </div>
    
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Opening Stock</label>
              <div className="flex">
                <input 
                  type="text" 
                  name="openingStock"
                  value={formData.openingStock}
                  onChange={handleInputChange}
                  placeholder="ex: 100" 
                  className="flex-grow border rounded-l px-2 py-1"
                />
                <span className="bg-gray-100 border px-3 py-1 rounded-r flex items-center">PCS</span>
              </div>
            </div>
    
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">As of Date</label>
              <input 
                type="date" 
                name="asOfDate"
                value={formData.asOfDate}
                onChange={handleInputChange}
                className="w-full border rounded px-2 py-1"
              />
            </div>
    
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Pricing Type</label>
              <input 
                type="text" 
                name="pricingType"
                value={formData.pricingType}
                onChange={handleInputChange}
                placeholder="Select Pricing Type" 
                className="w-full border rounded px-2 py-1"
              />
            </div>
    
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Selling Price</label>
              <input 
                type="text" 
                name="sellingPrice"
                value={formData.sellingPrice}
                onChange={handleInputChange}
                placeholder="Enter Selling Price" 
                className="w-full border rounded px-2 py-1"
              />
            </div>
    
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Custom Fields</label>
              <input 
                type="text" 
                name="customFields"
                value={formData.customFields.value || ''}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  customFields: { ...prev.customFields, value: e.target.value }
                }))}
                placeholder="Enter Custom Fields" 
                className="w-full border rounded px-2 py-1"
              />
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