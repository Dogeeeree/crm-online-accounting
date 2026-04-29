// CRM Online — Frontend with full CRUD + Seed Data
const API = 'http://localhost:8080/api';
const state = { currentView:'dashboard', customers:[], contracts:[], invoices:[], receipts:[], inventory:[], products:[], backendOnline:false };

// === Toast ===
function toast(msg, type='success') {
    const c = document.getElementById('toast-container');
    const t = document.createElement('div');
    t.className = 'toast toast-' + type;
    t.textContent = msg;
    c.appendChild(t);
    setTimeout(() => t.classList.add('show'), 10);
    setTimeout(() => { t.classList.remove('show'); setTimeout(() => t.remove(), 300); }, 3000);
}

// === API Helpers ===
async function apiGet(ep) {
    const r = await fetch(API + ep);
    if (!r.ok) throw new Error('HTTP ' + r.status);
    return (await r.json()).data;
}
async function apiPost(ep, body) {
    const r = await fetch(API + ep, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(body) });
    return await r.json();
}
async function apiDelete(ep) {
    const r = await fetch(API + ep, { method:'DELETE' });
    return await r.json();
}

// === Navigation ===
document.querySelectorAll('.nav-item').forEach(i => i.addEventListener('click', () => switchView(i.dataset.view)));
const TITLES = { dashboard:'Dashboard', customers:'Khách hàng', contracts:'Hợp đồng', invoices:'Hóa đơn', receipts:'Thu & Chi', inventory:'Thẻ kho' };

function switchView(v) {
    document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
    document.querySelector('[data-view="'+v+'"]').classList.add('active');
    document.querySelectorAll('.view').forEach(x => x.classList.add('hidden'));
    document.getElementById(v+'-view').classList.remove('hidden');
    document.getElementById('view-title').innerText = TITLES[v] || v;
    state.currentView = v;
    loadView(v);
}

async function loadView(v) {
    try {
        switch(v) {
            case 'dashboard': await loadDashboard(); break;
            case 'customers': await fetchCustomers(); renderCustomers(); break;
            case 'contracts': await fetchContracts(); renderContracts(); break;
            case 'invoices': await fetchInvoices(); renderInvoices(); break;
            case 'receipts': await fetchReceipts(); renderReceipts(); break;
            case 'inventory': await fetchInventory(); renderInventory(); break;
        }
    } catch(e) { console.error(e); }
}

// === Fetch ===
async function fetchCustomers() { try { state.customers = await apiGet('/customers') || []; } catch(e) { state.customers = []; } }
async function fetchContracts() { try { state.contracts = await apiGet('/contracts') || []; } catch(e) { state.contracts = []; } }
async function fetchInvoices() { try { state.invoices = await apiGet('/invoices') || []; } catch(e) { state.invoices = []; } }
async function fetchReceipts() { try { state.receipts = await apiGet('/receipts-payments') || []; } catch(e) { state.receipts = []; } }
async function fetchInventory() { try { state.inventory = await apiGet('/inventory-cards') || []; } catch(e) { state.inventory = []; } }
async function fetchProducts() { try { state.products = await apiGet('/products') || []; } catch(e) { state.products = []; } }

// === Status Labels ===
const STATUS_LABEL = {
    DangThucHien:'Đang thực hiện', TamDung:'Tạm dừng', ThanhLy:'Thanh lý',
    ChuaThanhToan:'Chưa thanh toán', ThanhToan1Phan:'Thanh toán 1 phần', HoanTat:'Hoàn tất',
    NhapMua:'Nhập mua', XuatBan:'Xuất bán', NhapTraKhach:'Nhập trả khách', XuatTraNCC:'Xuất trả NCC', XuatHuy:'Xuất hủy', KiemKe:'Kiểm kê'
};
const STATUS_CLASS = {
    DangThucHien:'badge-active', TamDung:'badge-warn', ThanhLy:'badge-done',
    ChuaThanhToan:'badge-warn', ThanhToan1Phan:'badge-active', HoanTat:'badge-done',
    Thu:'badge-done', Chi:'badge-warn'
};
function sl(k) { return STATUS_LABEL[k] || k; }
function sc(k) { return STATUS_CLASS[k] || ''; }
function fmt(n) { return Number(n||0).toLocaleString('vi-VN'); }

// === Render ===
function renderCustomers() {
    document.getElementById('customer-list').innerHTML = state.customers.map(c => `
        <tr>
            <td><code>${c.maKhachHang||'—'}</code></td>
            <td>${c.tenKhachHang}</td>
            <td>${c.email||'—'}</td>
            <td>${c.soDienThoai||'—'}</td>
            <td>${c.maSoThue||'—'}</td>
            <td><button class="btn btn-sm btn-secondary" onclick="deleteCustomer(${c.id})">Xóa</button></td>
        </tr>`).join('') || '<tr><td colspan="6" style="text-align:center;color:var(--silver)">Chưa có dữ liệu</td></tr>';
}
function filterCustomers() {
    const q = document.getElementById('search-customer').value.toLowerCase();
    const rows = document.querySelectorAll('#customer-list tr');
    rows.forEach(r => { r.style.display = r.textContent.toLowerCase().includes(q) ? '' : 'none'; });
}
function renderContracts() {
    document.getElementById('contract-list').innerHTML = state.contracts.map(c => `
        <tr>
            <td><code>${c.maHopDong||'—'}</code></td>
            <td>${c.customer ? c.customer.tenKhachHang : '—'}</td>
            <td>${c.ngayKy||'—'}</td>
            <td>${c.thoiHan||'—'}</td>
            <td><span class="badge ${sc(c.trangThai)}">${sl(c.trangThai)}</span></td>
        </tr>`).join('') || '<tr><td colspan="5" style="text-align:center;color:var(--silver)">Chưa có dữ liệu</td></tr>';
}
function renderInvoices() {
    document.getElementById('invoice-list').innerHTML = state.invoices.map(i => `
        <tr>
            <td><code>${i.maHoaDon||'—'}</code></td>
            <td>${i.customer ? i.customer.tenKhachHang : '—'}</td>
            <td>${fmt(i.tongTien)}đ</td>
            <td>${fmt(i.soTienDaThu)}đ</td>
            <td><span class="badge ${sc(i.trangThaiThanhToan)}">${sl(i.trangThaiThanhToan)}</span></td>
        </tr>`).join('') || '<tr><td colspan="5" style="text-align:center;color:var(--silver)">Chưa có dữ liệu</td></tr>';
}
function renderReceipts() {
    document.getElementById('receipt-list').innerHTML = state.receipts.map(r => `
        <tr>
            <td><code>${r.maPhieu||'—'}</code></td>
            <td><span class="badge ${sc(r.loaiPhieu)}">${r.loaiPhieu}</span></td>
            <td>${r.customer ? r.customer.tenKhachHang : '—'}</td>
            <td>${r.invoice ? r.invoice.maHoaDon : '—'}</td>
            <td>${fmt(r.soTien)}đ</td>
            <td>${r.ngayTao||'—'}</td>
        </tr>`).join('') || '<tr><td colspan="6" style="text-align:center;color:var(--silver)">Chưa có dữ liệu</td></tr>';
}
function renderInventory() {
    document.getElementById('inventory-list').innerHTML = state.inventory.map(i => `
        <tr>
            <td>${i.product ? i.product.tenSP : '—'}</td>
            <td><code>${i.product ? i.product.maSP : '—'}</code></td>
            <td><span class="badge">${sl(i.loaiGiaoDich)}</span></td>
            <td>${i.soLuongThayDoi}</td>
            <td>${i.tonCuoi}</td>
        </tr>`).join('') || '<tr><td colspan="5" style="text-align:center;color:var(--silver)">Chưa có dữ liệu</td></tr>';
}

// === Dashboard ===
async function loadDashboard() {
    await Promise.all([fetchCustomers(), fetchContracts(), fetchInvoices(), fetchReceipts(), fetchProducts(), fetchInventory()]);
    document.getElementById('stat-customers').innerText = state.customers.length;
    document.getElementById('stat-contracts').innerText = state.contracts.length;
    document.getElementById('stat-invoices').innerText = state.invoices.length;
    document.getElementById('stat-receipts').innerText = state.receipts.length;
    document.getElementById('stat-products').innerText = state.products.length;
    document.getElementById('stat-inventory').innerText = state.inventory.length;
    const rev = state.invoices.reduce((s,i) => s + Number(i.tongTien||0), 0);
    document.getElementById('stat-revenue').innerText = fmt(rev) + 'đ';
    document.getElementById('stat-backend').innerText = state.backendOnline ? 'Online ✓' : 'Offline ✗';
}

// === Modal ===
function openModal(title, html, onSubmit) {
    document.getElementById('modal-title').innerText = title;
    document.getElementById('modal-body').innerHTML = html;
    document.getElementById('modal-container').classList.remove('hidden');
    document.getElementById('modal-form').onsubmit = e => {
        e.preventDefault();
        onSubmit(Object.fromEntries(new FormData(e.target).entries()));
    };
}
function closeModal() { document.getElementById('modal-container').classList.add('hidden'); }

// === CRUD: Customers ===
function showAddCustomer() {
    openModal('Thêm khách hàng', `
        <div class="form-group"><label>Mã KH</label><input name="maKhachHang" required class="form-control" placeholder="VD: KH003"></div>
        <div class="form-group"><label>Tên khách hàng</label><input name="tenKhachHang" required class="form-control"></div>
        <div class="form-group"><label>Email</label><input name="email" type="email" class="form-control"></div>
        <div class="form-group"><label>Số điện thoại</label><input name="soDienThoai" class="form-control"></div>
        <div class="form-group"><label>Mã số thuế</label><input name="maSoThue" class="form-control"></div>
    `, async d => {
        const r = await apiPost('/customers', d);
        if (r.data) { toast('Tạo khách hàng thành công!'); closeModal(); switchView('customers'); }
        else toast('Lỗi: '+(r.message||'Không xác định'), 'error');
    });
}
async function deleteCustomer(id) {
    if (!confirm('Bạn có chắc muốn xóa?')) return;
    try { await apiDelete('/customers/'+id); toast('Đã xóa!'); switchView('customers'); }
    catch(e) { toast('Lỗi khi xóa!','error'); }
}

// === CRUD: Contracts ===
function showCreateContract() {
    const opts = state.customers.map(c => `<option value="${c.id}">${c.tenKhachHang} (${c.maKhachHang})</option>`).join('');
    openModal('Tạo hợp đồng mới', `
        <div class="form-group"><label>Khách hàng</label><select name="customerId" required class="form-control">${opts}</select></div>
        <div class="form-group"><label>Mã hợp đồng</label><input name="maHopDong" required class="form-control" placeholder="VD: HD-002"></div>
        <div class="form-group"><label>Ngày ký</label><input name="ngayKy" type="date" required class="form-control"></div>
        <div class="form-group"><label>Thời hạn (tháng)</label><input name="thoiHan" type="number" required class="form-control" placeholder="12"></div>
        <div class="form-group"><label>Trạng thái</label>
            <select name="trangThai" class="form-control">
                <option value="DangThucHien">Đang thực hiện</option>
                <option value="TamDung">Tạm dừng</option>
                <option value="ThanhLy">Thanh lý</option>
            </select></div>
    `, async d => {
        const cid = d.customerId; delete d.customerId; d.thoiHan = parseInt(d.thoiHan);
        const r = await apiPost('/contracts/'+cid, d);
        if (r.data) { toast('Tạo hợp đồng thành công!'); closeModal(); switchView('contracts'); }
        else toast('Lỗi: '+(r.message||''), 'error');
    });
}

// === CRUD: Invoices ===
function showCreateInvoice() {
    const cOpts = state.contracts.map(c => `<option value="${c.id}">${c.maHopDong} — ${c.customer?c.customer.tenKhachHang:'N/A'}</option>`).join('');
    const kOpts = state.customers.map(c => `<option value="${c.id}">${c.tenKhachHang} (${c.maKhachHang})</option>`).join('');
    openModal('Tạo hóa đơn', `
        <div class="form-group"><label>Mã hóa đơn</label><input name="maHoaDon" required class="form-control" placeholder="VD: INV-2026-001"></div>
        <div class="form-group"><label>Hợp đồng</label><select name="hopDongId" required class="form-control">${cOpts||'<option>Chưa có</option>'}</select></div>
        <div class="form-group"><label>Khách hàng</label><select name="khachHangId" required class="form-control">${kOpts}</select></div>
        <div class="form-group"><label>Tổng tiền (VNĐ)</label><input name="tongTien" type="number" required class="form-control" placeholder="10000000"></div>
    `, async d => {
        d.hopDongId = parseInt(d.hopDongId); d.khachHangId = parseInt(d.khachHangId); d.tongTien = parseFloat(d.tongTien);
        const r = await apiPost('/invoices', d);
        if (r.data) { toast('Tạo hóa đơn thành công!'); closeModal(); switchView('invoices'); }
        else toast('Lỗi: '+(r.message||''), 'error');
    });
}

// === CRUD: Receipts ===
function showCreateReceipt(type) {
    const kOpts = state.customers.map(c => `<option value="${c.id}">${c.tenKhachHang} (${c.maKhachHang})</option>`).join('');
    const iOpts = state.invoices.map(i => `<option value="${i.id}">${i.maHoaDon} — ${fmt(i.tongTien)}đ</option>`).join('');
    openModal('Tạo phiếu '+type, `
        <div class="form-group"><label>Mã phiếu</label><input name="maPhieu" required class="form-control" placeholder="VD: PT001"></div>
        <div class="form-group"><label>Khách hàng</label><select name="customerId" class="form-control">${kOpts}</select></div>
        <div class="form-group"><label>Hóa đơn (nếu có)</label><select name="invoiceId" class="form-control"><option value="">-- Không --</option>${iOpts}</select></div>
        <div class="form-group"><label>Số tiền (VNĐ)</label><input name="soTien" type="number" required class="form-control"></div>
        <input type="hidden" name="loaiPhieu" value="${type}">
    `, async d => {
        const body = { maPhieu:d.maPhieu, loaiPhieu:d.loaiPhieu, soTien:parseFloat(d.soTien), customer:{id:parseInt(d.customerId)} };
        if (d.invoiceId) body.invoice = {id:parseInt(d.invoiceId)};
        const r = await apiPost('/receipts-payments', body);
        if (r.data) { toast('Tạo phiếu '+type+' thành công!'); closeModal(); switchView('receipts'); }
        else toast('Lỗi: '+(r.message||''), 'error');
    });
}

// === CRUD: Inventory ===
function showCreateInventory() {
    const pOpts = state.products.map(p => `<option value="${p.id}">${p.tenSP} (${p.maSP}) — Tồn: ${p.soLuongTon}</option>`).join('');
    openModal('Giao dịch kho', `
        <div class="form-group"><label>Sản phẩm</label><select name="productId" required class="form-control">${pOpts||'<option>Chưa có sản phẩm</option>'}</select></div>
        <div class="form-group"><label>Loại giao dịch</label>
            <select name="loaiGiaoDich" class="form-control">
                <option value="NhapMua">Nhập mua</option><option value="XuatBan">Xuất bán</option>
                <option value="NhapTraKhach">Nhập trả khách</option><option value="XuatTraNCC">Xuất trả NCC</option>
                <option value="XuatHuy">Xuất hủy</option><option value="KiemKe">Kiểm kê</option>
            </select></div>
        <div class="form-group"><label>Số lượng</label><input name="soLuongThayDoi" type="number" required class="form-control"></div>
    `, async d => {
        const body = { product:{id:parseInt(d.productId)}, loaiGiaoDich:d.loaiGiaoDich, soLuongThayDoi:parseInt(d.soLuongThayDoi) };
        const r = await apiPost('/inventory-cards', body);
        if (r.data) { toast('Giao dịch kho thành công!'); closeModal(); switchView('inventory'); }
        else toast('Lỗi: '+(r.message||''), 'error');
    });
}

// === SEED DATA (creates via API → saves to DB) ===
async function seedAllData() {
    if (!state.backendOnline) { toast('Backend đang offline! Hãy khởi động Spring Boot trước.','error'); return; }
    if (!confirm('Tạo dữ liệu mẫu vào DB? (Dữ liệu sẽ được gửi qua API)')) return;
    const ov = document.getElementById('seed-overlay');
    const st = document.getElementById('seed-status');
    const pb = document.getElementById('seed-progress');
    ov.classList.remove('hidden');
    let step = 0, total = 6;
    const prog = (msg) => { step++; st.textContent = msg; pb.style.width = Math.round(step/total*100)+'%'; };

    try {
        // 1. Customers
        prog('Tạo khách hàng...');
        const customers = [
            {maKhachHang:'KH001',tenKhachHang:'Công ty TNHH ABC',email:'abc@company.vn',soDienThoai:'0281234567',maSoThue:'0312345678'},
            {maKhachHang:'KH002',tenKhachHang:'Nguyễn Văn Hùng',email:'hung.nguyen@gmail.com',soDienThoai:'0901234567',maSoThue:'0100000001'},
            {maKhachHang:'KH003',tenKhachHang:'Trần Thị Mai',email:'mai.tran@outlook.com',soDienThoai:'0987654321'},
            {maKhachHang:'KH004',tenKhachHang:'Công ty CP XYZ',email:'info@xyz.vn',soDienThoai:'0289876543',maSoThue:'0309876543'},
            {maKhachHang:'KH005',tenKhachHang:'Lê Hoàng Phúc',email:'phuc.le@yahoo.com',soDienThoai:'0912345678'}
        ];
        const cIds = [];
        for (const c of customers) { const r = await apiPost('/customers', c); if(r.data) cIds.push(r.data.id); }
        await new Promise(r=>setTimeout(r,300));

        // 2. Products
        prog('Tạo sản phẩm...');
        const products = [
            {maSP:'SP001',tenSP:'Laptop Dell Inspiron 15',soLuongTon:0},
            {maSP:'SP002',tenSP:'Máy in HP LaserJet Pro',soLuongTon:0},
            {maSP:'SP003',tenSP:'Bàn phím cơ Logitech G413',soLuongTon:0},
            {maSP:'SP004',tenSP:'Màn hình LG 27 inch 4K',soLuongTon:0}
        ];
        const pIds = [];
        for (const p of products) { const r = await apiPost('/products', p); if(r.data) pIds.push(r.data.id); }
        await new Promise(r=>setTimeout(r,300));

        // 3. Contracts
        prog('Tạo hợp đồng...');
        const contractData = [
            {cIdx:0, data:{maHopDong:'HD-2026-001',ngayKy:'2026-01-15',thoiHan:12,trangThai:'DangThucHien'}},
            {cIdx:1, data:{maHopDong:'HD-2026-002',ngayKy:'2026-02-01',thoiHan:6,trangThai:'DangThucHien'}},
            {cIdx:3, data:{maHopDong:'HD-2026-003',ngayKy:'2026-03-10',thoiHan:24,trangThai:'DangThucHien'}},
            {cIdx:0, data:{maHopDong:'HD-2026-004',ngayKy:'2025-06-01',thoiHan:12,trangThai:'ThanhLy'}}
        ];
        const hdIds = [];
        for (const h of contractData) {
            if (cIds[h.cIdx]) { const r = await apiPost('/contracts/'+cIds[h.cIdx], h.data); if(r.data) hdIds.push(r.data.id); }
        }
        await new Promise(r=>setTimeout(r,300));

        // 4. Invoices
        prog('Tạo hóa đơn...');
        const invoiceData = [
            {maHoaDon:'INV-2026-001',hopDongId:hdIds[0],khachHangId:cIds[0],tongTien:25000000},
            {maHoaDon:'INV-2026-002',hopDongId:hdIds[1],khachHangId:cIds[1],tongTien:15000000},
            {maHoaDon:'INV-2026-003',hopDongId:hdIds[2],khachHangId:cIds[3],tongTien:50000000}
        ];
        const invIds = [];
        for (const inv of invoiceData) {
            if (inv.hopDongId && inv.khachHangId) { const r = await apiPost('/invoices', inv); if(r.data) invIds.push(r.data.id); }
        }
        await new Promise(r=>setTimeout(r,300));

        // 5. Receipts
        prog('Tạo phiếu thu/chi...');
        if (invIds[0] && cIds[0]) await apiPost('/receipts-payments', {maPhieu:'PT-001',loaiPhieu:'Thu',soTien:25000000,customer:{id:cIds[0]},invoice:{id:invIds[0]}});
        if (invIds[1] && cIds[1]) await apiPost('/receipts-payments', {maPhieu:'PT-002',loaiPhieu:'Thu',soTien:5000000,customer:{id:cIds[1]},invoice:{id:invIds[1]}});
        if (cIds[3]) await apiPost('/receipts-payments', {maPhieu:'PC-001',loaiPhieu:'Chi',soTien:5000000,customer:{id:cIds[3]}});
        await new Promise(r=>setTimeout(r,300));

        // 6. Inventory
        prog('Tạo giao dịch kho...');
        if (pIds[0]) await apiPost('/inventory-cards', {product:{id:pIds[0]},loaiGiaoDich:'NhapMua',soLuongThayDoi:50});
        if (pIds[1]) await apiPost('/inventory-cards', {product:{id:pIds[1]},loaiGiaoDich:'NhapMua',soLuongThayDoi:30});
        if (pIds[2]) await apiPost('/inventory-cards', {product:{id:pIds[2]},loaiGiaoDich:'NhapMua',soLuongThayDoi:100});
        if (pIds[0]) await apiPost('/inventory-cards', {product:{id:pIds[0]},loaiGiaoDich:'XuatBan',soLuongThayDoi:5});

        toast('🎉 Đã tạo dữ liệu mẫu thành công! DB đã được cập nhật.');
        switchView('dashboard');
    } catch(e) {
        toast('Lỗi seed: '+e.message, 'error');
    } finally {
        ov.classList.add('hidden');
    }
}

// === Backend Health ===
async function checkBackend() {
    const el = document.getElementById('connection-status');
    try {
        await apiGet('/customers');
        state.backendOnline = true;
        el.innerHTML = '<span class="dot" style="background:#22c55e"></span> Backend Online';
    } catch(e) {
        state.backendOnline = false;
        el.innerHTML = '<span class="dot" style="background:#a3a3a3"></span> Backend Offline';
    }
}

// === Polling ===
let pollTimer = null;
async function poll() {
    try { await loadView(state.currentView);
        if (!state.backendOnline) { state.backendOnline=true; document.getElementById('connection-status').innerHTML='<span class="dot" style="background:#22c55e"></span> Backend Online'; }
    } catch(e) { state.backendOnline=false; document.getElementById('connection-status').innerHTML='<span class="dot" style="background:#a3a3a3"></span> Backend Offline'; }
}

// === Init ===
window.onload = async () => {
    await checkBackend();
    await Promise.all([fetchCustomers(), fetchContracts(), fetchInvoices(), fetchReceipts(), fetchProducts(), fetchInventory()]);
    switchView('dashboard');
    pollTimer = setInterval(poll, 5000);
};
