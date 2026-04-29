import React, { useState, useEffect } from 'react';
import { fetchReceipts } from '../../services/api';

function ThuChiManager() {
    const [receipts, setReceipts] = useState([]);

    useEffect(() => {
        fetchReceipts().then(data => setReceipts(data || [])).catch(console.error);
    }, []);

    const fmt = (n) => Number(n || 0).toLocaleString('vi-VN');

    return (
        <section className="view">
            <header><h2>Quản lý Thu / Chi</h2></header>
            <div className="table-container mt-4">
                <table>
                    <thead>
                        <tr>
                            <th>Mã phiếu</th>
                            <th>Loại</th>
                            <th>Khách hàng</th>
                            <th>Số tiền</th>
                        </tr>
                    </thead>
                    <tbody>
                        {receipts.map(r => (
                            <tr key={r.id}>
                                <td><code>{r.maPhieu}</code></td>
                                <td><span className="badge">{r.loaiPhieu}</span></td>
                                <td>{r.customer?.tenKhachHang || '—'}</td>
                                <td>{fmt(r.soTien)}đ</td>
                            </tr>
                        ))}
                        {receipts.length === 0 && <tr><td colSpan="4" style={{textAlign:'center'}}>Chưa có dữ liệu</td></tr>}
                    </tbody>
                </table>
            </div>
        </section>
    );
}

export default ThuChiManager;
