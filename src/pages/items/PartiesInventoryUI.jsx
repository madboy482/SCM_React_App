import React, { useState, useEffect } from 'react';
import { Home, FileText, CreditCard, BarChart, ArrowLeft } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import BottomNavigation from '../../components/BottomNavigation';

const PartiesInventoryUI = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const newItemAdded = location.state?.newItemAdded || false;
  
  // Initialize items state with the example data
  const [items, setItems] = useState([
    { 
      itemName: 'FCCAKE-FNN', 
      itemCode: '0023', 
      stock: '34 PAC', 
      sellingPrice: '₹75', 
      purchasePrice: '₹64.07', 
      mrp: '₹75',
      wholesalePrice: '₹70'
    },
    { 
      itemName: 'FCCAKE-CF', 
      itemCode: '0024', 
      stock: '34 PAC', 
      sellingPrice: '₹75', 
      purchasePrice: '₹64.07', 
      mrp: '₹75',
      wholesalePrice: '₹70'
    },
    { 
      itemName: 'FCCAKE-D', 
      itemCode: '0025', 
      stock: '34 PAC', 
      sellingPrice: '₹75', 
      purchasePrice: '₹64.07', 
      mrp: '₹75',
      wholesalePrice: '₹70'
    }
  ]);
  
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [showLowStock, setShowLowStock] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState(null);

  // Load items from localStorage when component mounts or when new item is added
  useEffect(() => {
    const storedItems = localStorage.getItem('inventoryItems');
    if (storedItems) {
      const parsedItems = JSON.parse(storedItems);
      // Merge with existing example items rather than replacing them
      setItems(prevItems => {
        // Create a map of existing item codes to avoid duplicates
        const existingItemCodes = new Set(prevItems.map(item => item.itemCode));
        // Filter out any stored items that already exist in our initial data
        const newItems = parsedItems.filter(item => !existingItemCodes.has(item.itemCode));
        // Return the combined array
        return [...prevItems, ...newItems];
      });
    }
  }, [newItemAdded]);

  // Save items to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('inventoryItems', JSON.stringify(items));
  }, [items]);

  const handleCreateItem = () => {
    navigate('/item_creation_basic');
  };

  const handleBack = () => {
    navigate('/admin-dashboard');
  };
  
  // Function to handle item deletion
  const handleDeleteItem = (itemCode) => {
    // Filter out the item with the matching itemCode
    const updatedItems = items.filter(item => item.itemCode !== itemCode);
    
    // Get the name of the deleted item for the success message
    const deletedItem = items.find(item => item.itemCode === itemCode);
    
    // Update the state
    setItems(updatedItems);
    
    // Show success message
    setDeleteMessage(`${deletedItem.itemName} successfully deleted!`);
    
    // Clear the message after 3 seconds
    setTimeout(() => {
      setDeleteMessage(null);
    }, 3000);
  };
  
  // Filter items based on search term, category, and low stock
  const filteredItems = items.filter(item => {
    const matchesSearch = item.itemName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        item.itemCode.includes(searchTerm);
    const matchesCategory = filterCategory ? (item.category === filterCategory) : true;
    const matchesLowStock = showLowStock ? 
                          (parseInt(item.stock.split(' ')[0]) < 10) : true;
    
    return matchesSearch && matchesCategory && matchesLowStock;
  });
  
  // Calculate summary stats
  const totalItems = items.length;
  const lowStockItems = items.filter(item => parseInt(item.stock.split(' ')[0]) < 10).length;
  const expiringItems = 3; // Placeholder - you'd need actual expiry data

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
          <span className="bg-purple-100 text-purple-600 rounded-full px-2 py-1 text-xs">{totalItems}</span>
        </div>
        <div className="flex items-center space-x-2">
          <button className="text-gray-600 hover:bg-gray-100 p-2 rounded">Reports</button>
          <button
            className="bg-purple-600 text-white px-4 py-2 rounded"
            onClick={handleCreateItem}
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
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="flex space-x-2">
            <select 
              className="border rounded px-3 py-2"
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
            >
              <option value="">Filter by: Select Categories</option>
              <option value="food">Food</option>
              <option value="beverage">Beverage</option>
              <option value="dessert">Dessert</option>
            </select>
            <button 
              className={`border rounded px-3 py-2 ${showLowStock ? 'bg-purple-100 text-purple-600' : ''}`}
              onClick={() => setShowLowStock(!showLowStock)}
            >
              Show Low Stock
            </button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="bg-gray-100 p-4 rounded">
            <span className="text-gray-600">Stock Value</span>
            <div className="text-2xl font-bold">{totalItems}</div>
          </div>
          <div className="bg-yellow-100 p-4 rounded">
            <span className="text-gray-600">Low Stock</span>
            <div className="text-2xl font-bold text-yellow-700">{lowStockItems}</div>
          </div>
          <div className="bg-red-100 p-4 rounded">
            <span className="text-gray-600">Items Expiring (30 days)</span>
            <div className="text-2xl font-bold text-red-700">{expiringItems}</div>
          </div>
        </div>

        {/* Bulk Action */}
        <div className="flex justify-between items-center">
          <select className="border rounded px-3 py-2">
            <option>Bulk Action</option>
            <option>Delete Selected</option>
            <option>Update Stock</option>
            <option>Update Prices</option>
          </select>
          <button
            className="bg-purple-600 text-white px-4 py-2 rounded"
            onClick={handleCreateItem}
          >
            + Create Item
          </button>
        </div>
      </div>

      {/* Success messages */}
      {newItemAdded && (
        <div className="mx-4 mb-4 bg-green-100 text-green-700 p-3 rounded-lg flex justify-between items-center">
          <span>New item successfully added to inventory!</span>
          <button 
            className="text-green-700 font-bold"
            onClick={() => navigate('/parties-inventory', { state: { newItemAdded: false } })}
          >
            ×
          </button>
        </div>
      )}
      
      {deleteMessage && (
        <div className="mx-4 mb-4 bg-green-100 text-green-700 p-3 rounded-lg flex justify-between items-center">
          <span>{deleteMessage}</span>
          <button 
            className="text-green-700 font-bold"
            onClick={() => setDeleteMessage(null)}
          >
            ×
          </button>
        </div>
      )}

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
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.map((item, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="p-3">{item.itemName}</td>
                <td className="p-3">{item.itemCode}</td>
                <td className="p-3">{item.stock}</td>
                <td className="p-3">{item.sellingPrice}</td>
                <td className="p-3">{item.purchasePrice}</td>
                <td className="p-3">{item.mrp}</td>
                <td className="p-3">{item.wholesalePrice || item.mrp}</td>
                <td className="p-3">
                  <button className="text-blue-600 mr-2">Edit</button>
                  <button 
                    className="text-red-600"
                    onClick={() => handleDeleteItem(item.itemCode)}
                  >
                    Delete
                  </button>
                </td>
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