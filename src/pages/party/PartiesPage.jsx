import React, { useState } from 'react';
import { Search, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import BottomNavigation from '../../components/BottomNavigation';

const PartiesPage = () => {
  const navigate = useNavigate();

  const handleCreateParty = () => {
    navigate('/create-party');
  };

  const handlePartyClick = (partyId) => {
    // Navigate to party details page when implemented
    // For now, go to address page as an example
    navigate('/party-address');
  };

  return (
    <div className="min-h-screen bg-background-light flex flex-col">
      {/* Top Navigation */}
      <div className="p-4 bg-white shadow-sm flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <h1 className="font-bold text-lg text-primary-purple">Parties</h1>
          <div className="bg-purple-100 text-primary-purple px-2 py-0.5 rounded-full text-xs">
            29
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <select className="text-sm text-gray-800 bg-transparent border-none focus:ring-0">
            <option>Reports</option>
          </select>
          <button 
            className="bg-primary-purple text-white px-3 py-1.5 rounded text-sm flex items-center"
            onClick={handleCreateParty}
          >
            <Plus className="h-4 w-4 mr-1" />
            Create Party
          </button>
        </div>
      </div>

      <div className="p-4">
        {/* Search Bar */}
        <div className="mb-6 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input 
            type="text" 
            placeholder="Search Parties..." 
            className="w-full pl-10 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-purple"
          />
        </div>

        {/* Balance Summary */}
        <div className="bg-white rounded-lg shadow-md mb-4">
          <div className="flex border-b">
            <div className="w-1/2 p-4 border-r text-center">
              <p className="text-green-600 text-sm font-medium">To Collect</p>
              <p className="text-gray-800 text-xl font-semibold">₹12,56,110.00</p>
            </div>
            <div className="w-1/2 p-4 text-center">
              <p className="text-red-600 text-sm font-medium">To Pay</p>
              <p className="text-gray-800 text-xl font-semibold">₹0.00</p>
            </div>
          </div>

          {/* Party List */}
          <div>
            {[
              { id: 1, name: 'ABC Industries Limited', type: 'Seller', number: '9848800511', balance: '0.00' },
              { id: 2, name: 'TATA', type: 'Customer', number: '9848800511', balance: '0.00' },
              { id: 3, name: 'BD limited', type: 'Customer', number: '9848600511', balance: '0.00' }
            ].map((party, index, array) => (
              <div 
                key={party.id} 
                className={`flex justify-between p-4 ${
                  index < array.length - 1 ? 'border-b' : ''
                } hover:bg-purple-50 cursor-pointer transition-colors duration-200`}
                onClick={() => handlePartyClick(party.id)}
              >
                <div>
                  <p className="text-gray-800 font-medium">{party.name}</p>
                  <p className="text-gray-500 text-xs">{party.type}</p>
                  <p className="text-gray-500 text-xs">{party.number}</p>
                </div>
                <p className="text-gray-800 font-medium">₹{party.balance}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
};

export default PartiesPage;