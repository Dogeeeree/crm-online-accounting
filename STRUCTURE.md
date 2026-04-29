# Cấu trúc Thư mục Dự án CRMO - Kế toán

Tài liệu này mô tả chi tiết vai trò của từng thư mục trong hệ thống CRM Online - Phân hệ Kế toán.

---

## 📂 Thư mục Gốc (Root)
- **`crm-backend/`**: Dự án Backend Spring Boot (Quản lý Kế toán).
- **`crm-frontend/`**: Giao diện người dùng Vanilla JS (Quản lý Kế toán).
- **`CRMOnline_Pro.sql`**: Script khởi tạo CSDL (Hóa đơn, Hợp đồng, Thẻ kho...).
- **`README.md`**: Hướng dẫn chung.
- **`STRUCTURE.md`**: Tài liệu này.

---

## 📂 Backend (`crm-backend`)
### 📍 `src/main/java/com/crmonline`
- **`controller/`**: 
    - `CustomerController`: Quản lý khách hàng.
    - `InvoiceController`: Quản lý hóa đơn.
    - `ContractController`: Quản lý hợp đồng.
    - `ReceiptPaymentController`: Quản lý phiếu thu/chi.
    - `ProductController`: Quản lý danh mục sản phẩm.
    - `InventoryCardController`: Quản lý thẻ kho (Xuất/Nhập).
- **`entity/`**: Các thực thể JPA.
- **`repository/`**: Các interface truy vấn Spring Data JPA.
- **`enums/`**: Các kiểu dữ liệu liệt kê (Loại giao dịch, Trạng thái...).

---

## 📂 Frontend (`crm-frontend`)
Giao diện người dùng được nâng cấp lên **React + Vite** (thay cho Vanilla JS trước đây) nhằm đồng nhất kiến trúc với dự án `crm-ver1` và dễ dàng cho việc merge code sau này.

- **`src/App.jsx`**: Cấu hình Router và Layout chính.
- **`src/components/`**: Các thành phần dùng chung (Sidebar, v.v.).
- **`src/pages/`**: Giao diện chi tiết cho từng phân hệ (Khách hàng, Hợp đồng, Hóa đơn...).
- **`src/services/api.js`**: Logic gọi API qua Axios.
- **`src/index.css`**: CSS tùy chỉnh cho giao diện hiện đại.
