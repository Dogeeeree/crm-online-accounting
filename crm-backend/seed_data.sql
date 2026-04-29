-- ============================================================
-- DỮ LIỆU MẪU CHO HỆ THỐNG CRM ONLINE
-- Database: CRMOnline_Pro
-- Chạy script này trong MySQL Workbench để test
-- ============================================================

USE CRMOnline_Pro;

-- ==================== 1. KHÁCH HÀNG ====================
INSERT INTO kh_khach_hang (ma_khach_hang, ten_khach_hang, email, so_dien_thoai, ma_so_thue, is_deleted, created_at, updated_at)
VALUES
('KH001', 'Công ty TNHH ABC', 'abc@company.vn', '0281234567', '0312345678', false, NOW(), NOW()),
('KH002', 'Nguyễn Văn Hùng', 'hung.nguyen@gmail.com', '0901234567', '0100000001', false, NOW(), NOW()),
('KH003', 'Trần Thị Mai', 'mai.tran@outlook.com', '0987654321', NULL, false, NOW(), NOW()),
('KH004', 'Công ty CP XYZ', 'info@xyz.vn', '0289876543', '0309876543', false, NOW(), NOW()),
('KH005', 'Lê Hoàng Phúc', 'phuc.le@yahoo.com', '0912345678', NULL, false, NOW(), NOW()),
('KH006', 'Công ty TNHH Minh Anh', 'contact@minhanh.vn', '0283456789', '0315678901', false, NOW(), NOW()),
('KH007', 'Phạm Quốc Bảo', 'bao.pham@gmail.com', '0934567890', NULL, false, NOW(), NOW()),
('KH008', 'Công ty CP Đại Phát', 'sales@daiphat.com', '0287654321', '0318765432', false, NOW(), NOW());

-- ==================== 2. SẢN PHẨM ====================
INSERT INTO bh_san_pham (ma_sp, ten_sp, so_luong_ton)
VALUES
('SP001', 'Laptop Dell Inspiron 15', 50),
('SP002', 'Máy in HP LaserJet Pro', 30),
('SP003', 'Bàn phím cơ Logitech G413', 100),
('SP004', 'Màn hình LG 27 inch 4K', 25),
('SP005', 'Chuột không dây Logitech M590', 200),
('SP006', 'Ổ cứng SSD Samsung 1TB', 80),
('SP007', 'RAM Kingston 16GB DDR4', 120),
('SP008', 'Webcam Logitech C920', 45);

-- ==================== 3. HỢP ĐỒNG ====================
-- Lấy ID khách hàng vừa insert (giả sử bắt đầu từ 1)
INSERT INTO hd_hop_dong (ma_hop_dong, khach_hang_id, ngay_ky, thoi_han, trang_thai)
VALUES
('HD-2026-001', 1, '2026-01-15', 12, 'DangThucHien'),
('HD-2026-002', 2, '2026-02-01', 6, 'DangThucHien'),
('HD-2026-003', 4, '2026-03-10', 24, 'DangThucHien'),
('HD-2026-004', 1, '2025-06-01', 12, 'ThanhLy'),
('HD-2026-005', 6, '2026-04-01', 12, 'DangThucHien'),
('HD-2026-006', 8, '2026-04-15', 6, 'TamDung');

-- ==================== 4. HÓA ĐƠN ====================
INSERT INTO kt_hoa_don (ma_hoa_don, hop_dong_id, khach_hang_id, tong_tien, so_tien_da_thu, trang_thai_thanh_toan)
VALUES
('INV-2026-001', 1, 1, 25000000.00, 25000000.00, 'HoanTat'),
('INV-2026-002', 2, 2, 15000000.00, 8000000.00, 'ThanhToan1Phan'),
('INV-2026-003', 3, 4, 50000000.00, 0.00, 'ChuaThanhToan'),
('INV-2026-004', 1, 1, 12000000.00, 12000000.00, 'HoanTat'),
('INV-2026-005', 5, 6, 30000000.00, 10000000.00, 'ThanhToan1Phan'),
('INV-2026-006', 3, 4, 18000000.00, 0.00, 'ChuaThanhToan');

-- ==================== 5. PHIẾU THU / CHI ====================
INSERT INTO kt_phieu_thu_chi (ma_phieu, loai_phieu, khach_hang_id, hoa_don_id, so_tien, ngay_tao)
VALUES
('PT-001', 'Thu', 1, 1, 25000000.00, '2026-02-01'),
('PT-002', 'Thu', 2, 2, 5000000.00, '2026-03-01'),
('PT-003', 'Thu', 2, 2, 3000000.00, '2026-04-01'),
('PT-004', 'Thu', 1, 4, 12000000.00, '2026-03-15'),
('PT-005', 'Thu', 6, 5, 10000000.00, '2026-04-20'),
('PC-001', 'Chi', 4, NULL, 5000000.00, '2026-03-10'),
('PC-002', 'Chi', 8, NULL, 2000000.00, '2026-04-10');

-- ==================== 6. THẺ KHO ====================
INSERT INTO kho_the_kho (san_pham_id, loai_giao_dich, so_luong_thay_doi, ton_cuoi)
VALUES
(1, 'NhapMua', 50, 50),
(2, 'NhapMua', 30, 30),
(3, 'NhapMua', 100, 100),
(4, 'NhapMua', 25, 25),
(1, 'XuatBan', 5, 45),
(3, 'XuatBan', 20, 80),
(5, 'NhapMua', 200, 200),
(6, 'NhapMua', 80, 80),
(1, 'XuatBan', 3, 42),
(4, 'XuatBan', 2, 23);

-- ==================== KIỂM TRA ====================
SELECT '--- KHÁCH HÀNG ---' AS '';
SELECT id, ma_khach_hang, ten_khach_hang, email FROM kh_khach_hang WHERE is_deleted = false;

SELECT '--- HỢP ĐỒNG ---' AS '';
SELECT hd.id, hd.ma_hop_dong, kh.ten_khach_hang, hd.ngay_ky, hd.trang_thai
FROM hd_hop_dong hd JOIN kh_khach_hang kh ON hd.khach_hang_id = kh.id;

SELECT '--- HÓA ĐƠN ---' AS '';
SELECT inv.ma_hoa_don, kh.ten_khach_hang, inv.tong_tien, inv.so_tien_da_thu, inv.trang_thai_thanh_toan
FROM kt_hoa_don inv JOIN kh_khach_hang kh ON inv.khach_hang_id = kh.id;

SELECT '--- PHIẾU THU/CHI ---' AS '';
SELECT pt.ma_phieu, pt.loai_phieu, kh.ten_khach_hang, pt.so_tien, pt.ngay_tao
FROM kt_phieu_thu_chi pt JOIN kh_khach_hang kh ON pt.khach_hang_id = kh.id;

SELECT '--- THẺ KHO ---' AS '';
SELECT sp.ten_sp, tk.loai_giao_dich, tk.so_luong_thay_doi, tk.ton_cuoi
FROM kho_the_kho tk JOIN bh_san_pham sp ON tk.san_pham_id = sp.id;

SELECT 'DONE - Dữ liệu mẫu đã được tạo thành công!' AS KET_QUA;
