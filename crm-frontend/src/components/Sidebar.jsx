import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import api from '../services/api';

function Sidebar() {
    const [backendOnline, setBackendOnline] = useState(false);

    useEffect(() => {
        const checkHealth = async () => {
            try {
                await api.get('/customers');
                setBackendOnline(true);
            } catch (e) {
                setBackendOnline(false);
            }
        };
        checkHealth();
        const interval = setInterval(checkHealth, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <aside className="sidebar">
            <div className="brand">
                <div className="logo"></div>
                <h1>CRM Online</h1>
            </div>
            <nav>
                <NavLink to="/dashboard" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                    <span className="icon">📊</span> Dashboard
                </NavLink>
                <NavLink to="/customers" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                    <span className="icon">👥</span> Khách hàng
                </NavLink>
                <NavLink to="/contracts" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                    <span className="icon">📜</span> Hợp đồng
                </NavLink>
                <NavLink to="/invoices" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                    <span className="icon">🧾</span> Hóa đơn
                </NavLink>
                <NavLink to="/receipts" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                    <span className="icon">💰</span> Thu & Chi
                </NavLink>
                <NavLink to="/inventory" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                    <span className="icon">📦</span> Thẻ kho
                </NavLink>
            </nav>
            <div className="status-badge" id="connection-status">
                {backendOnline ? (
                    <><span className="dot" style={{ background: '#22c55e' }}></span> Backend Online</>
                ) : (
                    <><span className="dot" style={{ background: '#a3a3a3' }}></span> Backend Offline</>
                )}
            </div>
        </aside>
    );
}

export default Sidebar;
