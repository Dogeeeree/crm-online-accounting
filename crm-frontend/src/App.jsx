import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard/Dashboard';
import KhachHangManager from './pages/KhachHang/KhachHangManager';
import HopDongManager from './pages/HopDong/HopDongManager';
import HoaDonManager from './pages/HoaDon/HoaDonManager';
import ThuChiManager from './pages/ThuChi/ThuChiManager';
import TheKhoManager from './pages/TheKho/TheKhoManager';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Sidebar />
        <main className="content">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/customers" element={<KhachHangManager />} />
            <Route path="/contracts" element={<HopDongManager />} />
            <Route path="/invoices" element={<HoaDonManager />} />
            <Route path="/receipts" element={<ThuChiManager />} />
            <Route path="/inventory" element={<TheKhoManager />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
