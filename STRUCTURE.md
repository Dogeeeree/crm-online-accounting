# Cấu trúc Thư mục Dự án CRMO - Unified

Tài liệu này mô tả chi tiết vai trò của từng thư mục trong hệ thống CRM Online sau khi đã hợp nhất phân hệ Kế toán và Quản lý Lead/Khách hàng.

---

## 📂 Thư mục Gốc (Root)
- **`crm-backend/`**: Dự án Backend Spring Boot hợp nhất.
- **`crm-frontend/`**: Giao diện người dùng hợp nhất (Accounting + CRM).
- **`CRMOnline_Pro.sql`**: Script khởi tạo toàn bộ CSDL (Bao gồm Leads, Hoạt động, Hóa đơn, Thẻ kho, Users...).
- **`README.md`**: Hướng dẫn chung.
- **`STRUCTURE.md`**: Tài liệu cấu trúc thư mục.

---

## 📂 Backend (`crm-backend`)
Lưu ý: Đã tích hợp đầy đủ logic từ phiên bản 1.

### 📍 `src/main/java/com/crmonline`
- **`controller/`**: 
    - `CustomerController`: Quản lý khách hàng chính thức.
    - `LeadController`: Quản lý Leads tiềm năng (Hỗ trợ convert sang Khách hàng).
    - `HoatDongController`: Ghi nhật ký tương tác (Call, Meeting...).
    - `InvoiceController`: Quản lý hóa đơn.
    - `ContractController`: Quản lý hợp đồng.
    - `ReceiptPaymentController`: Quản lý phiếu thu/chi.
    - `ProductController` & `InventoryCardController`: Quản lý kho hàng.
- **`entity/`**: Các thực thể JPA (`Lead`, `HoatDong`, `Customer`, `Invoice`, `Product`, `User`...).
- **`service/`**: Chứa logic xử lý nghiệp vụ phức tạp (Ví dụ: `LeadService.convertToKhachHang`).
- **`repository/`**: Các interface truy vấn Spring Data JPA.

---

## 📂 Frontend (`crm-frontend`)
Giao diện Vanilla JS hợp nhất các chức năng.

- **`index.html`**: Giao diện Sidebar với các module: Dashboard, Leads, Khách hàng, Hoạt động, Hợp đồng, Hóa đơn, Thu chi, Thẻ kho.
- **`app.js`**: Toàn bộ logic Fetch API và render dữ liệu cho tất cả các phân hệ.
- **`style.css`**: Thiết kế giao diện Dashboard hiện đại.
