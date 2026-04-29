import React, { useState, useEffect } from 'react';
import { fetchCustomers, createCustomer, deleteCustomer } from '../../services/api';

function KhachHangManager() {
    const [customers, setCustomers] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({ maKhachHang: '', tenKhachHang: '', email: '', soDienThoai: '', maSoThue: '' });

    const loadCustomers = async () => {
        try {
            const data = await fetchCustomers();
            setCustomers(data || []);
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => { loadCustomers(); }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Bạn có chắc muốn xóa?')) {
            try {
                await deleteCustomer(id);
                loadCustomers();
            } catch (e) {
                alert('Lỗi khi xóa!');
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createCustomer(formData);
            setShowModal(false);
            loadCustomers();
        } catch (e) {
            alert('Lỗi tạo khách hàng!');
        }
    };

    return (
        <section className="view">
            <header>
                <h2>Quản lý Khách Hàng</h2>
                <button className="btn btn-primary" onClick={() => setShowModal(true)}>+ Thêm khách hàng</button>
            </header>
            <div className="table-container mt-4">
                <table>
                    <thead>
                        <tr>
                            <th>Mã KH</th>
                            <th>Tên khách hàng</th>
                            <th>Email</th>
                            <th>Số điện thoại</th>
                            <th>MST</th>
                            <th>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customers.length === 0 ? (
                            <tr><td colSpan="6" style={{ textAlign: 'center' }}>Chưa có dữ liệu</td></tr>
                        ) : customers.map(c => (
                            <tr key={c.id}>
                                <td><code>{c.maKhachHang}</code></td>
                                <td>{c.tenKhachHang}</td>
                                <td>{c.email || '—'}</td>
                                <td>{c.soDienThoai || '—'}</td>
                                <td>{c.maSoThue || '—'}</td>
                                <td>
                                    <button className="btn btn-sm btn-secondary" onClick={() => handleDelete(c.id)}>Xóa</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {showModal && (
                <div className="modal-overlay">
                    <div className="modal">
                        <div className="modal-header">
                            <h3>Thêm Khách Hàng</h3>
                            <button className="close-modal" onClick={() => setShowModal(false)}>&times;</button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="modal-body">
                                <div className="form-group"><label>Mã KH</label><input required className="form-control" value={formData.maKhachHang} onChange={e => setFormData({ ...formData, maKhachHang: e.target.value })} /></div>
                                <div className="form-group"><label>Tên KH</label><input required className="form-control" value={formData.tenKhachHang} onChange={e => setFormData({ ...formData, tenKhachHang: e.target.value })} /></div>
                                <div className="form-group"><label>Email</label><input type="email" className="form-control" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} /></div>
                                <div className="form-group"><label>SĐT</label><input className="form-control" value={formData.soDienThoai} onChange={e => setFormData({ ...formData, soDienThoai: e.target.value })} /></div>
                                <div className="form-group"><label>MST</label><input className="form-control" value={formData.maSoThue} onChange={e => setFormData({ ...formData, maSoThue: e.target.value })} /></div>
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

export default KhachHangManager;
