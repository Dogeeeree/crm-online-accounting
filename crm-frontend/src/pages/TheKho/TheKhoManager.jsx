import React, { useState, useEffect } from 'react';
import { fetchInventory, createInventory, fetchProducts } from '../../services/api';

function TheKhoManager() {
    const [inventory, setInventory] = useState([]);
    const [products, setProducts] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({ productId: '', loaiGiaoDich: 'NhapMua', soLuongThayDoi: '' });

    const loadData = async () => {
        try {
            const [invData, prodData] = await Promise.all([fetchInventory(), fetchProducts()]);
            setInventory(invData || []);
            setProducts(prodData || []);
            if (prodData && prodData.length > 0) {
                setFormData(prev => ({ ...prev, productId: prodData[0].id }));
            }
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => { loadData(); }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                product: { id: parseInt(formData.productId) },
                loaiGiaoDich: formData.loaiGiaoDich,
                soLuongThayDoi: parseInt(formData.soLuongThayDoi)
            };
            await createInventory(payload);
            setShowModal(false);
            loadData();
        } catch (e) {
            alert('Lỗi giao dịch kho!');
        }
    };

    return (
        <section className="view">
            <header>
                <h2>Thẻ Kho</h2>
                <button className="btn btn-primary" onClick={() => setShowModal(true)}>+ Giao dịch kho</button>
            </header>
            <div className="table-container mt-4">
                <table>
                    <thead>
                        <tr>
                            <th>Sản phẩm</th>
                            <th>Loại giao dịch</th>
                            <th>Thay đổi</th>
                            <th>Tồn cuối</th>
                        </tr>
                    </thead>
                    <tbody>
                        {inventory.map(i => (
                            <tr key={i.id}>
                                <td>{i.product?.tenSP || '—'}</td>
                                <td><span className="badge">{i.loaiGiaoDich}</span></td>
                                <td>{i.soLuongThayDoi}</td>
                                <td>{i.tonCuoi}</td>
                            </tr>
                        ))}
                        {inventory.length === 0 && <tr><td colSpan="4" style={{textAlign:'center'}}>Chưa có dữ liệu</td></tr>}
                    </tbody>
                </table>
            </div>

            {showModal && (
                <div className="modal-overlay">
                    <div className="modal">
                        <div className="modal-header">
                            <h3>Giao dịch kho</h3>
                            <button className="close-modal" onClick={() => setShowModal(false)}>&times;</button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="modal-body">
                                <div className="form-group">
                                    <label>Sản phẩm</label>
                                    <select className="form-control" required value={formData.productId} onChange={e => setFormData({ ...formData, productId: e.target.value })}>
                                        {products.map(p => <option key={p.id} value={p.id}>{p.tenSP} (Tồn: {p.soLuongTon})</option>)}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Loại giao dịch</label>
                                    <select className="form-control" value={formData.loaiGiaoDich} onChange={e => setFormData({ ...formData, loaiGiaoDich: e.target.value })}>
                                        <option value="NhapMua">Nhập mua</option>
                                        <option value="XuatBan">Xuất bán</option>
                                        <option value="NhapTraKhach">Nhập trả khách</option>
                                        <option value="XuatTraNCC">Xuất trả NCC</option>
                                        <option value="XuatHuy">Xuất hủy</option>
                                        <option value="KiemKe">Kiểm kê</option>
                                    </select>
                                </div>
                                <div className="form-group"><label>Số lượng thay đổi</label><input type="number" required className="form-control" value={formData.soLuongThayDoi} onChange={e => setFormData({ ...formData, soLuongThayDoi: e.target.value })} /></div>
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

export default TheKhoManager;
