import React from 'react';
import { Home, FileText, CreditCard, BarChart } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const BottomNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Determine the user role based on the current URL
  const getUserDashboardPath = () => {
    if (location.pathname.includes('customer-dashboard')) return '/customer-dashboard';
    if (location.pathname.includes('supplier-dashboard')) return '/supplier-dashboard';
    return '/admin-dashboard'; // Default to admin dashboard
  };

  // Determine the active tab based on the current route
  const getActiveTab = () => {
    const path = location.pathname;
    if (path.includes('invoice') || path.includes('purchase-orders') || path.includes('create-purchase-invoice')) return 'invoices';
    if (path.includes('payment')) return 'payments';
    if (path.includes('report')) return 'reports';
    return 'home'; // Default to home (which dynamically changes to the respective dashboard)
  };

  const navItems = [
    { icon: <Home size={20} />, label: 'Home', active: getActiveTab() === 'home', path: getUserDashboardPath() },
    { icon: <FileText size={20} />, label: 'Invoices', active: getActiveTab() === 'invoices', path: '/purchase-orders' },
    { icon: <CreditCard size={20} />, label: 'Payments', active: getActiveTab() === 'payments', path: '/payments' },
    { icon: <BarChart size={20} />, label: 'Reports', active: getActiveTab() === 'reports', path: '/reports' }
  ];

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white py-3 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] border-t border-gray-200 z-10">
      <div className="flex justify-around">
        {navItems.map((item, index) => (
          <button 
            key={index} 
            className={`flex flex-col items-center ${
              item.active 
                ? 'text-[#3460DC]' 
                : 'text-gray-500 hover:text-[#3460DC]'
            }`}
            onClick={() => handleNavigation(item.path)}
          >
            {item.icon}
            <span className="text-xs mt-1">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default BottomNavigation;
