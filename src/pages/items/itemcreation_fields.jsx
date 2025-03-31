import React, { useState } from 'react';
import { ArrowLeft, Home, FileText, CreditCard, BarChart, PlusCircle } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import BottomNavigation from '../../components/BottomNavigation';

const ItemCreationFields = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const formData = location.state?.formData || {};

  const [activeSection, setActiveSection] = useState('custom-fields');
  // Ensure customFields is always an array
  const [customFields, setCustomFields] = useState(Array.isArray(formData.customFields) ? formData.customFields : []);
  const [showAddField, setShowAddField] = useState(false);
  const [newFieldName, setNewFieldName] = useState('');
  const [newFieldValue, setNewFieldValue] = useState('');

  const sections = [
    { id: 'basic-details', label: 'Basic Details', icon: FileText, path: '/item_creation_basic' },
    { id: 'stock-details', label: 'Stock Details', icon: BarChart, path: '/item_creation_stock' },
    { id: 'pricing-details', label: 'Pricing Details', icon: CreditCard, path: '/item_creation_pricing' },
    { id: 'custom-fields', label: 'Custom Fields', icon: Home }
  ];

  const handleBack = () => {
    navigate('/create-item', { state: { formData: { ...formData, customFields } } });
  };

  const handleSectionClick = (sectionId, path) => {
    if (path) {
      navigate(path, { state: { formData: { ...formData, customFields } } });
    } else {
      setActiveSection(sectionId);
    }
  };

  const handleAddField = () => {
    if (newFieldName.trim() !== '') {
      setCustomFields([...customFields, { name: newFieldName, value: newFieldValue }]);
      setNewFieldName('');
      setNewFieldValue('');
      setShowAddField(false);
    }
  };

  const handleRemoveField = (index) => {
    const updatedFields = [...customFields];
    updatedFields.splice(index, 1);
    setCustomFields(updatedFields);
  };

  const handleSave = () => {
    // Ensure customFields is an array before saving
    const finalCustomFields = Array.isArray(customFields) ? customFields : [];
    
    const updatedFormData = { ...formData, customFields: finalCustomFields };
    
    // Generate a unique item code if not already present
    const itemCode = updatedFormData.itemCode || generateItemCode();
    
    // Create a new item object combining all the data from different sections
    const newItem = {
      itemName: updatedFormData.itemName || 'Unnamed Item',
      itemCode: itemCode,
      stock: `${updatedFormData.stockQuantity || 0} ${updatedFormData.stockUnit || 'Units'}`,
      sellingPrice: `₹${updatedFormData.sellingPrice || 0}`,
      purchasePrice: `₹${updatedFormData.purchasePrice || 0}`,
      mrp: `₹${updatedFormData.mrp || 0}`,
      wholesalePrice: `₹${updatedFormData.wholesalePrice || 0}`,
      customFields: finalCustomFields
    };
    
    // Get existing items from localStorage or create an empty array
    let existingItems = [];
    try {
      const storedItems = localStorage.getItem('inventoryItems');
      existingItems = storedItems ? JSON.parse(storedItems) : [];
      // Ensure existingItems is an array
      if (!Array.isArray(existingItems)) {
        existingItems = [];
      }
    } catch (error) {
      console.error("Error parsing stored items:", error);
      existingItems = [];
    }
    
    // Add the new item to the array
    const updatedItems = [...existingItems, newItem];
    
    // Save the updated array back to localStorage
    try {
      localStorage.setItem('inventoryItems', JSON.stringify(updatedItems));
    } catch (error) {
      console.error("Error saving to localStorage:", error);
    }
    
    // Navigate to the inventory page
    navigate('/parties-inventory', { state: { newItemAdded: true } });
  };
  
  // Helper function to generate a random item code
  const generateItemCode = () => {
    return Math.floor(1000 + Math.random() * 9000).toString();
  };

  // Safely render the custom fields - defensive check
  const renderCustomFields = () => {
    if (!Array.isArray(customFields) || customFields.length === 0) {
      return null;
    }
    
    return customFields.map((field, index) => (
      <div key={index} className="p-3 border rounded-lg bg-purple-50">
        <div className="flex justify-between">
          <span className="font-medium">{field.name}</span>
          <button 
            className="text-red-500 text-sm"
            onClick={() => handleRemoveField(index)}
          >
            Remove
          </button>
        </div>
        <div className="text-gray-600 mt-1">{field.value}</div>
      </div>
    ));
  };

  // Check if we should show the empty state
  const showEmptyState = !Array.isArray(customFields) || customFields.length === 0;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col pb-16">
      {/* Top Navigation Bar */}
      <div className="bg-white shadow-sm p-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <ArrowLeft 
            className="text-[#1D1D1D] cursor-pointer mr-2" 
            onClick={handleBack}
          />
          <span className="text-xl font-semibold text-purple-600">Custom Fields</span>
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

      {/* Custom Fields Content */}
      <div className="flex-grow bg-white m-4 rounded-lg shadow-sm">
        {showEmptyState && !showAddField ? (
          <div className="h-full flex flex-col items-center justify-center p-4 bg-purple-50">
            <div className="w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center mb-4">
              <FileText size={32} className="text-gray-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">You don't have any custom fields create yet</h3>
            <button 
              className="mt-4 text-purple-600 border border-purple-300 bg-purple-50 hover:bg-purple-100 rounded-lg py-2 px-4 flex items-center"
              onClick={() => setShowAddField(true)}
            >
              <PlusCircle size={18} className="mr-2" />
              Create Custom fields
            </button>
          </div>
        ) : (
          <div className="p-4 space-y-4">
            {renderCustomFields()}
            
            {showAddField ? (
              <div className="p-4 border-2 border-purple-200 rounded-lg bg-purple-50">
                <h4 className="font-medium mb-3">Add Custom Field</h4>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Field Name</label>
                    <input 
                      type="text" 
                      value={newFieldName}
                      onChange={(e) => setNewFieldName(e.target.value)}
                      placeholder="Enter field name" 
                      className="w-full border rounded px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Field Value</label>
                    <input 
                      type="text" 
                      value={newFieldValue}
                      onChange={(e) => setNewFieldValue(e.target.value)}
                      placeholder="Enter field value" 
                      className="w-full border rounded px-3 py-2"
                    />
                  </div>
                  <div className="flex space-x-2 pt-2">
                    <button 
                      className="bg-purple-600 text-white px-4 py-2 rounded"
                      onClick={handleAddField}
                    >
                      Add Field
                    </button>
                    <button 
                      className="border border-gray-300 px-4 py-2 rounded"
                      onClick={() => setShowAddField(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <button 
                className="w-full border-2 border-dashed border-purple-300 rounded-lg p-3 text-purple-600 flex items-center justify-center hover:bg-purple-50"
                onClick={() => setShowAddField(true)}
              >
                <PlusCircle size={18} className="mr-2" />
                Add another custom field
              </button>
            )}
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
};

export default ItemCreationFields;