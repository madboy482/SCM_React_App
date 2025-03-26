import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Login, CreateAccount } from './pages/auths';
import { AdminDashboard, SupplierDashboard, CustomerDashboard } from './pages/dashboards';
import { PartiesPage, CreatePartyPage, AddressPage } from './pages/party';
import { POs, CreatePI, PRList, CreatePR } from './pages/purchase';
import { ProformaInvoice, CreateProforma } from './pages/proforma';
import { PartiesInventoryUI } from './pages/items';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<CreateAccount />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/supplier-dashboard" element={<SupplierDashboard />} />
          <Route path="/customer-dashboard" element={<CustomerDashboard />} />
          <Route path="/parties" element={<PartiesPage />} />
          <Route path="/create-party" element={<CreatePartyPage />} />
          <Route path="/party-address" element={<AddressPage />} />
          <Route path="/purchase-orders" element={<POs />} />
          <Route path="/create-purchase-invoice" element={<CreatePI />} />
          <Route path="/purchase-return-list" element={<PRList />} />
          <Route path="/create-purchase-return" element={<CreatePR />} />
          <Route path="/proforma-invoice" element={<ProformaInvoice />} />
          <Route path="/create-proforma-invoice" element={<CreateProforma />} />
          <Route path="/Parties-Inventory" element={<PartiesInventoryUI />} />
          <Route path="/" element={<CreateAccount />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
