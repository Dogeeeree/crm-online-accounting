import React, { useState, useEffect } from 'react';
import { fetchCustomers, fetchContracts, fetchInvoices, fetchReceipts, fetchProducts, fetchInventory } from '../../services/api';

function Dashboard() {
    const [stats, setStats] = useState({ customers: 0, contracts: 0, invoices: 0, receipts: 0, products: 0, inventory: 0, revenue: 0 });

    useEffect(() => {
        const loadStats = async () => {
            try {
                const [cRes, contRes, invRes, recRes, prodRes, invCardsRes] = await Promise.all([
                    fetchCustomers().catch(() => []),
                    fetchContracts().catch(() => []),
                    fetchInvoices().catch(() => []),
                    fetchReceipts().catch(() => []),
                    fetchProducts().catch(() => []),
                    fetchInventory().catch(() => [])
                ]);

                const revenue = invRes.reduce((sum, inv) => sum + Number(inv.tongTien || 0), 0);

                setStats({
                    customers: cRes.length || 0,
                    contracts: contRes.length || 0,
                    invoices: invRes.length || 0,
                    receipts: recRes.length || 0,
                    products: prodRes.length || 0,
                    inventory: invCardsRes.length || 0,
                    revenue
                });
            } catch (error) {
                console.error("Failed to load dashboard stats", error);
            }
        };
        loadStats();
    }, []);

    const fmt = (n) => Number(n || 0).toLocaleString('vi-VN');

    return (
        <section className="view">
            <header><h2>Dashboard</h2></header>
            <div className="stats-grid">
                <div className="stat-card">
                    <h3>Khách hàng</h3>
                    <p className="value">{stats.customers}</p>
                </div>
                <div className="stat-card">
                    <h3>Hợp đồng</h3>
                    <p className="value">{stats.contracts}</p>
                </div>
                <div className="stat-card">
                    <h3>Hóa đơn</h3>
                    <p className="value">{stats.invoices}</p>
                </div>
                <div className="stat-card">
                    <h3>Phiếu thu/chi</h3>
                    <p className="value">{stats.receipts}</p>
                </div>
                <div className="stat-card">
                    <h3>Sản phẩm</h3>
                    <p className="value">{stats.products}</p>
                </div>
                <div className="stat-card">
                    <h3>Giao dịch kho</h3>
                    <p className="value">{stats.inventory}</p>
                </div>
                <div className="stat-card stat-card-wide">
                    <h3>Tổng doanh thu (Hóa đơn)</h3>
                    <p className="value">{fmt(stats.revenue)}đ</p>
                </div>
            </div>
        </section>
    );
}

export default Dashboard;
