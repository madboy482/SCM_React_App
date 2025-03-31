import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, PlusCircle, Info, Calendar, ChevronDown, FileText, CreditCard, BarChart, Home, X, AlertTriangle } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import BottomNavigation from '../../components/BottomNavigation';

const ItemCreationStock = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeSection, setActiveSection] = useState('stock-details');
  const [showCalendar, setShowCalendar] = useState(false);
  const [showWarningPopup, setShowWarningPopup] = useState(false);
  const calendarRef = useRef(null);
  const warningRef = useRef(null);
  
  // Initialize formData with data from location state if available
  const [formData, setFormData] = useState(() => {
    const previousData = location.state?.formData || {};
    return {
      ...previousData,
      itemCode: previousData.itemCode || 'ITM12367',
      hsnCode: previousData.hsnCode || '4010',
      measuringUnit: previousData.measuringUnit || 'Pieces(PCS)',
      godown: previousData.godown || '',
      openingStock: previousData.openingStock || '160',
      openingStockUnit: previousData.openingStockUnit || 'PCS',
      asOfDate: previousData.asOfDate || '16 Mar 2025',
      enableLowStockWarning: previousData.enableLowStockWarning || false,
      lowStockThreshold: previousData.lowStockThreshold || '10',
      description: previousData.description || '',
      images: previousData.images || []
    };
  });

  const sections = [
    { id: 'basic-details', label: 'Basic Details', icon: FileText, path: '/item_creation_basic' },
    { id: 'stock-details', label: 'Stock Details', icon: BarChart },
    { id: 'pricing-details', label: 'Pricing Details', icon: CreditCard, path: '/item_creation_pricing' },
    { id: 'custom-fields', label: 'Custom Fields', icon: Home, path: '/item_creation_fields' }
  ];

  // Current date for calendar initialization
  const currentDate = new Date();
  const [calendarState, setCalendarState] = useState({
    currentMonth: currentDate.getMonth(),
    currentYear: currentDate.getFullYear()
  });

  // Close popups when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setShowCalendar(false);
      }
      if (warningRef.current && !warningRef.current.contains(event.target)) {
        setShowWarningPopup(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [calendarRef, warningRef]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleBack = () => {
    navigate('/item_creation_basic', { state: { formData } });
  };

  const handleSave = () => {
    // Save form data and navigate to pricing details page
    console.log("Saving stock details:", formData);
    navigate('/item_creation_pricing', { state: { formData } });
  };

  const handleCancel = () => {
    navigate('/items');
  };

  const handleSectionClick = (sectionId, path) => {
    if (path) {
      navigate(path, { state: { formData } });
    } else {
      setActiveSection(sectionId);
    }
  };

  const handleFileSelect = () => {
    // Implement file selection logic
    console.log("File selection initiated");
  };

  const toggleLowStockWarning = () => {
    setShowWarningPopup(true);
    setFormData(prev => ({
      ...prev,
      enableLowStockWarning: !prev.enableLowStockWarning
    }));
  };

  // Calendar functions
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month, year) => {
    return new Date(year, month, 1).getDay();
  };

  const handlePrevMonth = () => {
    setCalendarState(prev => {
      let newMonth = prev.currentMonth - 1;
      let newYear = prev.currentYear;
      
      if (newMonth < 0) {
        newMonth = 11;
        newYear -= 1;
      }
      
      return {
        currentMonth: newMonth,
        currentYear: newYear
      };
    });
  };

  const handleNextMonth = () => {
    setCalendarState(prev => {
      let newMonth = prev.currentMonth + 1;
      let newYear = prev.currentYear;
      
      if (newMonth > 11) {
        newMonth = 0;
        newYear += 1;
      }
      
      return {
        currentMonth: newMonth,
        currentYear: newYear
      };
    });
  };

  const handleSelectDate = (day) => {
    const date = new Date(calendarState.currentYear, calendarState.currentMonth, day);
    const formattedDate = `${day} ${monthNames[calendarState.currentMonth].substring(0, 3)} ${calendarState.currentYear}`;
    
    setFormData(prev => ({
      ...prev,
      asOfDate: formattedDate
    }));
    
    setShowCalendar(false);
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(calendarState.currentMonth, calendarState.currentYear);
    const firstDay = getFirstDayOfMonth(calendarState.currentMonth, calendarState.currentYear);
    
    const days = [];
    // Empty cells for days before the first day of month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-8 w-8"></div>);
    }
    
    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(
        <div 
          key={`day-${day}`}
          onClick={() => handleSelectDate(day)}
          className="h-8 w-8 flex items-center justify-center rounded-full cursor-pointer hover:bg-purple-200"
        >
          {day}
        </div>
      );
    }
    
    return days;
  };

  const renderActiveSection = () => {
    if (activeSection === 'stock-details') {
      return (
        <div className="p-4 space-y-6">
          {/* Item Code */}
          <div className="space-y-2">
            <label className="text-gray-800 font-medium">Item Code</label>
            <div className="flex gap-2">
              <input 
                type="text"
                name="itemCode"
                value={formData.itemCode}
                onChange={handleInputChange}
                placeholder="ex: ITM12367"
                className="flex-grow p-3 border rounded-lg"
              />
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">
                Generate Barcode
              </button>
            </div>
          </div>
          
          {/* HSN Code */}
          <div className="space-y-2">
            <label className="text-gray-800 font-medium">HSN Code</label>
            <input 
              type="text"
              name="hsnCode"
              value={formData.hsnCode}
              onChange={handleInputChange}
              placeholder="Ex: 4010"
              className="w-full p-3 border rounded-lg"
            />
            <div className="text-blue-600 text-sm">Find HSN Code</div>
          </div>
          
          {/* Measuring Unit */}
          <div className="space-y-2">
            <label className="text-gray-800 font-medium">Measuring Unit</label>
            <div className="relative">
              <select
                name="measuringUnit"
                value={formData.measuringUnit}
                onChange={handleInputChange}
                className="w-full p-3 border rounded-lg appearance-none"
              >
                <option value="Pieces(PCS)">Pieces(PCS)</option>
                <option value="Kilograms(KG)">Kilograms(KG)</option>
                <option value="Liters(L)">Liters(L)</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
            </div>
            <div className="text-blue-600 text-sm">+ Alternative Unit</div>
          </div>
          
          {/* Godowns */}
          <div className="space-y-2">
            <label className="text-gray-800 font-medium">Godowns</label>
            <div className="relative">
              <select
                name="godown"
                value={formData.godown}
                onChange={handleInputChange}
                className="w-full p-3 border rounded-lg appearance-none"
              >
                <option value="">Select Godown</option>
                <option value="Warehouse A">Warehouse A</option>
                <option value="Warehouse B">Warehouse B</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
            </div>
          </div>
          
          {/* Opening Stock */}
          <div className="space-y-2">
            <label className="text-gray-800 font-medium">Opening Stock</label>
            <div className="flex gap-2">
              <input 
                type="text"
                name="openingStock"
                value={formData.openingStock}
                onChange={handleInputChange}
                placeholder="ex: 160 PCS"
                className="flex-grow p-3 border rounded-lg"
              />
              <div className="w-20 bg-white border rounded-lg flex items-center justify-center">
                {formData.openingStockUnit}
              </div>
            </div>
          </div>
          
          {/* As of Date with Calendar Dropdown */}
          <div className="space-y-2 relative">
            <label className="text-gray-800 font-medium">As of Date</label>
            <div className="relative">
              <input 
                type="text"
                name="asOfDate"
                value={formData.asOfDate}
                onChange={handleInputChange}
                className="w-full p-3 border rounded-lg pr-10"
                readOnly
              />
              <Calendar 
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer" 
                size={18} 
                onClick={() => setShowCalendar(!showCalendar)}
              />
            </div>
            
            {/* Calendar Dropdown */}
            {showCalendar && (
              <div 
                ref={calendarRef}
                className="absolute z-20 mt-2 bg-white shadow-lg rounded-lg p-4 w-full md:w-80"
              >
                <div className="flex justify-between items-center mb-4">
                  <button 
                    onClick={handlePrevMonth}
                    className="p-1 hover:bg-gray-100 rounded-full"
                  >
                    <ChevronDown className="transform rotate-90" size={20} />
                  </button>
                  <div className="font-medium">
                    {monthNames[calendarState.currentMonth]} {calendarState.currentYear}
                  </div>
                  <button 
                    onClick={handleNextMonth}
                    className="p-1 hover:bg-gray-100 rounded-full"
                  >
                    <ChevronDown className="transform -rotate-90" size={20} />
                  </button>
                </div>
                
                <div className="grid grid-cols-7 gap-1 text-center">
                  {/* Days of week header */}
                  {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
                    <div key={day} className="font-medium text-gray-500 text-xs mb-2">{day}</div>
                  ))}
                  
                  {/* Calendar days */}
                  {renderCalendar()}
                </div>
              </div>
            )}
          </div>
          
          {/* Enable low stock quantity warning */}
          <div className="flex items-center">
            <div 
              className="text-blue-600 text-sm mr-2 cursor-pointer"
              onClick={toggleLowStockWarning}
            >
              + Enable low stock quantity warning
            </div>
            <Info size={16} className="text-blue-600 cursor-pointer" onClick={toggleLowStockWarning} />
          </div>
          
          {/* Low Stock Warning Popup */}
          {showWarningPopup && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div 
                ref={warningRef}
                className="bg-white rounded-lg p-6 w-full max-w-md"
              >
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center">
                    <AlertTriangle size={24} className="text-yellow-500 mr-2" />
                    <h3 className="text-lg font-semibold">Low Stock Warning</h3>
                  </div>
                  <X 
                    size={20} 
                    className="cursor-pointer text-gray-500 hover:text-gray-700"
                    onClick={() => setShowWarningPopup(false)}
                  />
                </div>
                
                <div className="mb-6">
                  <p className="mb-4">
                    Low stock quantity warning is {formData.enableLowStockWarning ? 'now in action' : 'disabled'}.
                  </p>
                  
                  {formData.enableLowStockWarning && (
                    <div className="space-y-2">
                      <label className="text-gray-800 font-medium">Threshold Quantity</label>
                      <div className="flex gap-2">
                        <input 
                          type="number"
                          name="lowStockThreshold"
                          value={formData.lowStockThreshold}
                          onChange={handleInputChange}
                          className="flex-grow p-3 border rounded-lg"
                          min="1"
                        />
                        <div className="w-20 bg-white border rounded-lg flex items-center justify-center">
                          {formData.openingStockUnit}
                        </div>
                      </div>
                      <p className="text-sm text-gray-600">
                        You will receive notifications when stock falls below this threshold.
                      </p>
                    </div>
                  )}
                </div>
                
                <div className="flex justify-end space-x-2">
                  <button 
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50" 
                    onClick={() => setShowWarningPopup(false)}
                  >
                    Cancel
                  </button>
                  <button 
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                    onClick={() => setShowWarningPopup(false)}
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {/* Description */}
          <div className="space-y-2">
            <label className="text-gray-800 font-medium">Description</label>
            <div className="relative">
              <input 
                type="text"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Enter Description"
                className="w-full p-3 border rounded-lg pr-10"
              />
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
            </div>
          </div>
          
          {/* Image Upload */}
          <div className="border border-dashed border-gray-300 rounded-lg p-6 text-center">
            <div className="flex justify-center mb-2">
              <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                <PlusCircle className="text-gray-600" size={24} />
              </div>
            </div>
            <p className="text-gray-800 font-medium">Please select or drag and drop 5 files.</p>
            <p className="text-gray-600 text-sm mb-4">Maximum of 5 images in PNG or JPEG file size no more than 5 MB</p>
            <button 
              className="px-4 py-2 bg-blue-100 text-blue-600 rounded-lg"
              onClick={handleFileSelect}
            >
              Select File
            </button>
          </div>
        </div>
      );
    }
    return null;
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
          <button className="text-gray-600 hover:bg-gray-100 p-2 rounded" onClick={handleCancel}>Cancel</button>
          <button 
            className="bg-purple-600 text-white px-4 py-2 rounded flex items-center"
            onClick={handleSave}
          >
            <PlusCircle size={18} className="mr-2" />
            Save
          </button>
        </div>
      </div>

      {/* Section Navigation - Removed mt-4 to eliminate gap */}
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

export default ItemCreationStock;