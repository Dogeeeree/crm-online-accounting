import React, { useState, useEffect } from 'react';
import { fetchInvoices, createInvoice, fetchContracts, fetchCustomers } from '../../services/api';

function HoaDonManager() {
    const [invoices, setInvoices] = useState([]);
    const [contracts, setContracts] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({ maHoaDon: '', hopDongId: '', khachHangId: '', tongTien: '' });

    const loadData = async () => {
        try {
            const [invData, contData, custData] = await Promise.all([fetchInvoices(), fetchContracts(), fetchCustomers()]);
            setInvoices(invData || []);
            setContracts(contData || []);
            setCustomers(custData || []);
            if (custData && custData.length > 0) {
                setFormData(prev => ({ ...prev, khachHangId: custData[0].id }));
            }
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => { loadData(); }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = { ...formData };
            if (data.hopDongId) data.hopDongId = parseInt(data.hopDongId);
            else delete data.hopDongId;
            data.khachHangId = parseInt(data.khachHangId);
            data.tongTien = parseFloat(data.tongTien);
            await createInvoice(data);
            setShowModal(false);
            loadData();
        } catch (e) {
            alert('Lỗi tạo hóa đơn!');
        }
    };

    const fmt = (n) => Number(n || 0).toLocaleString('vi-VN');

    return (
        <section className="view">
            <header>
                <h2>Quản lý Hóa Đơn</h2>
                <button className="btn btn-primary" onClick={() => setShowModal(true)}>+ Tạo hóa đơn</button>
            </header>
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

            {showModal && (
                <div className="modal-overlay">
                    <div className="modal">
                        <div className="modal-header">
                            <h3>Tạo hóa đơn</h3>
                            <button className="close-modal" onClick={() => setShowModal(false)}>&times;</button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="modal-body">
                                <div className="form-group"><label>Mã hóa đơn</label><input required className="form-control" value={formData.maHoaDon} onChange={e => setFormData({ ...formData, maHoaDon: e.target.value })} /></div>
                                <div className="form-group">
                                    <label>Khách hàng</label>
                                    <select className="form-control" required value={formData.khachHangId} onChange={e => setFormData({ ...formData, khachHangId: e.target.value })}>
                                        {customers.map(c => <option key={c.id} value={c.id}>{c.tenKhachHang}</option>)}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Hợp đồng (Tùy chọn)</label>
                                    <select className="form-control" value={formData.hopDongId} onChange={e => setFormData({ ...formData, hopDongId: e.target.value })}>
                                        <option value="">-- Không có --</option>
                                        {contracts.map(c => <option key={c.id} value={c.id}>{c.maHopDong} - {c.customer?.tenKhachHang}</option>)}
                                    </select>
                                </div>
                                <div className="form-group"><label>Tổng tiền (VNĐ)</label><input type="number" required className="form-control" value={formData.tongTien} onChange={e => setFormData({ ...formData, tongTien: e.target.value })} /></div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Hủy</button>
                                <button type="submit" className="btn btn-primary">Lưu lại</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </section>
    );
}

export default HoaDonManager;
