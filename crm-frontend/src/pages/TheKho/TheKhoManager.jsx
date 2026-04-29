import React, { useState, useEffect } from 'react';
import { fetchInventory } from '../../services/api';

function TheKhoManager() {
    const [inventory, setInventory] = useState([]);

    useEffect(() => {
        fetchInventory().then(data => setInventory(data || [])).catch(console.error);
    }, []);

    return (
        <section className="view">
            <header><h2>Thẻ Kho</h2></header>
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
        </section>
    );
}

export default TheKhoManager;
