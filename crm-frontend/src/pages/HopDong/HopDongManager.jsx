import React, { useState, useEffect } from 'react';
import { fetchContracts } from '../../services/api';

function HopDongManager() {
    const [contracts, setContracts] = useState([]);

    useEffect(() => {
        fetchContracts().then(data => setContracts(data || [])).catch(console.error);
    }, []);

    return (
        <section className="view">
            <header><h2>Quản lý Hợp Đồng</h2></header>
            <div className="table-container mt-4">
                <table>
                    <thead>
                        <tr>
                            <th>Mã HĐ</th>
                            <th>Khách hàng</th>
                            <th>Ngày ký</th>
                            <th>Thời hạn</th>
                            <th>Trạng thái</th>
                        </tr>
                    </thead>
                    <tbody>
                        {contracts.map(c => (
                            <tr key={c.id}>
                                <td><code>{c.maHopDong}</code></td>
                                <td>{c.customer?.tenKhachHang || '—'}</td>
                                <td>{c.ngayKy || '—'}</td>
                                <td>{c.thoiHan} tháng</td>
                                <td><span className="badge">{c.trangThai}</span></td>
                            </tr>
                        ))}
                        {contracts.length === 0 && <tr><td colSpan="5" style={{textAlign:'center'}}>Chưa có dữ liệu</td></tr>}
                    </tbody>
                </table>
            </div>
        </section>
    );
}

export default HopDongManager;
