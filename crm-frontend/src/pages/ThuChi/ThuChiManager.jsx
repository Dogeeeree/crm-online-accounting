import React, { useState, useEffect } from 'react';
import { fetchReceipts, createReceipt, fetchCustomers, fetchInvoices } from '../../services/api';

function ThuChiManager() {
    const [receipts, setReceipts] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [invoices, setInvoices] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [formType, setFormType] = useState('Thu');
    const [formData, setFormData] = useState({ maPhieu: '', customerId: '', invoiceId: '', soTien: '' });

    const loadData = async () => {
        try {
            const [recData, custData, invData] = await Promise.all([fetchReceipts(), fetchCustomers(), fetchInvoices()]);
            setReceipts(recData || []);
            setCustomers(custData || []);
            setInvoices(invData || []);
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => { loadData(); }, []);

    const openModal = (type) => {
        setFormType(type);
        setFormData({ maPhieu: '', customerId: customers[0]?.id || '', invoiceId: '', soTien: '' });
        setShowModal(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                maPhieu: formData.maPhieu,
                loaiPhieu: formType,
                soTien: parseFloat(formData.soTien),
                customer: formData.customerId ? { id: parseInt(formData.customerId) } : null
            };
            if (formData.invoiceId) {
                payload.invoice = { id: parseInt(formData.invoiceId) };
            }
            await createReceipt(payload);
            setShowModal(false);
            loadData();
        } catch (e) {
            alert('Lỗi tạo phiếu!');
        }
    };

    const fmt = (n) => Number(n || 0).toLocaleString('vi-VN');

    return (
        <section className="view">
            <header>
                <h2>Quản lý Thu / Chi</h2>
                <div style={{ display: 'flex', gap: '8px' }}>
                    <button className="btn btn-primary" onClick={() => openModal('Thu')}>+ Phiếu thu</button>
                    <button className="btn btn-secondary" onClick={() => openModal('Chi')}>− Phiếu chi</button>
                </div>
            </header>
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

            {showModal && (
                <div className="modal-overlay">
                    <div className="modal">
                        <div className="modal-header">
                            <h3>Tạo phiếu {formType}</h3>
                            <button className="close-modal" onClick={() => setShowModal(false)}>&times;</button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="modal-body">
                                <div className="form-group"><label>Mã phiếu</label><input required className="form-control" value={formData.maPhieu} onChange={e => setFormData({ ...formData, maPhieu: e.target.value })} /></div>
                                <div className="form-group">
                                    <label>Khách hàng</label>
                                    <select className="form-control" value={formData.customerId} onChange={e => setFormData({ ...formData, customerId: e.target.value })}>
                                        <option value="">-- Không có --</option>
                                        {customers.map(c => <option key={c.id} value={c.id}>{c.tenKhachHang}</option>)}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Hóa đơn (nếu có)</label>
                                    <select className="form-control" value={formData.invoiceId} onChange={e => setFormData({ ...formData, invoiceId: e.target.value })}>
                                        <option value="">-- Không --</option>
                                        {invoices.map(i => <option key={i.id} value={i.id}>{i.maHoaDon} - {fmt(i.tongTien)}đ</option>)}
                                    </select>
                                </div>
                                <div className="form-group"><label>Số tiền (VNĐ)</label><input type="number" required className="form-control" value={formData.soTien} onChange={e => setFormData({ ...formData, soTien: e.target.value })} /></div>
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

export default ThuChiManager;
