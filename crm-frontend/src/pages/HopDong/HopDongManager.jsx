import React, { useState, useEffect } from 'react';
import { fetchContracts, createContract, fetchCustomers } from '../../services/api';

function HopDongManager() {
    const [contracts, setContracts] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({ customerId: '', maHopDong: '', ngayKy: '', thoiHan: '', trangThai: 'DangThucHien' });

    const loadData = async () => {
        try {
            const [contData, custData] = await Promise.all([fetchContracts(), fetchCustomers()]);
            setContracts(contData || []);
            setCustomers(custData || []);
            if (custData && custData.length > 0) {
                setFormData(prev => ({ ...prev, customerId: custData[0].id }));
            }
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => { loadData(); }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { customerId, ...data } = formData;
            data.thoiHan = parseInt(data.thoiHan);
            await createContract(customerId, data);
            setShowModal(false);
            loadData();
        } catch (e) {
            alert('Lỗi tạo hợp đồng!');
        }
    };

    return (
        <section className="view">
            <header>
                <h2>Quản lý Hợp Đồng</h2>
                <button className="btn btn-primary" onClick={() => setShowModal(true)}>+ Tạo hợp đồng</button>
            </header>
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

            {showModal && (
                <div className="modal-overlay">
                    <div className="modal">
                        <div className="modal-header">
                            <h3>Tạo hợp đồng mới</h3>
                            <button className="close-modal" onClick={() => setShowModal(false)}>&times;</button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="modal-body">
                                <div className="form-group">
                                    <label>Khách hàng</label>
                                    <select className="form-control" required value={formData.customerId} onChange={e => setFormData({ ...formData, customerId: e.target.value })}>
                                        {customers.map(c => <option key={c.id} value={c.id}>{c.tenKhachHang} ({c.maKhachHang})</option>)}
                                    </select>
                                </div>
                                <div className="form-group"><label>Mã hợp đồng</label><input required className="form-control" value={formData.maHopDong} onChange={e => setFormData({ ...formData, maHopDong: e.target.value })} /></div>
                                <div className="form-group"><label>Ngày ký</label><input type="date" required className="form-control" value={formData.ngayKy} onChange={e => setFormData({ ...formData, ngayKy: e.target.value })} /></div>
                                <div className="form-group"><label>Thời hạn (tháng)</label><input type="number" required className="form-control" value={formData.thoiHan} onChange={e => setFormData({ ...formData, thoiHan: e.target.value })} /></div>
                                <div className="form-group">
                                    <label>Trạng thái</label>
                                    <select className="form-control" value={formData.trangThai} onChange={e => setFormData({ ...formData, trangThai: e.target.value })}>
                                        <option value="DangThucHien">Đang thực hiện</option>
                                        <option value="TamDung">Tạm dừng</option>
                                        <option value="ThanhLy">Thanh lý</option>
                                    </select>
                                </div>
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

export default HopDongManager;
