import React, { useState, useEffect } from 'react';
import { fetchInvoices } from '../../services/api';

function HoaDonManager() {
    const [invoices, setInvoices] = useState([]);

    useEffect(() => {
        fetchInvoices().then(data => setInvoices(data || [])).catch(console.error);
    }, []);

    const fmt = (n) => Number(n || 0).toLocaleString('vi-VN');

    return (
        <section className="view">
            <header><h2>Quản lý Hóa Đơn</h2></header>
            <div className="table-container mt-4">
                <table>
                    <thead>
                        <tr>
                            <th>Mã HĐ</th>
                            <th>Khách hàng</th>
                            <th>Tổng tiền</th>
                            <th>Đã thu</th>
                            <th>Trạng thái</th>
                        </tr>
                    </thead>
                    <tbody>
                        {invoices.map(i => (
                            <tr key={i.id}>
                                <td><code>{i.maHoaDon}</code></td>
                                <td>{i.customer?.tenKhachHang || '—'}</td>
                                <td>{fmt(i.tongTien)}đ</td>
                                <td>{fmt(i.soTienDaThu)}đ</td>
                                <td><span className="badge">{i.trangThaiThanhToan}</span></td>
                            </tr>
                        ))}
                        {invoices.length === 0 && <tr><td colSpan="5" style={{textAlign:'center'}}>Chưa có dữ liệu</td></tr>}
                    </tbody>
                </table>
            </div>
        </section>
    );
}

export default HoaDonManager;
