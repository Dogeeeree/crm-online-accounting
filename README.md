# 📈 CRMO - Kế Toán

![Build Status](https://img.shields.io/badge/build-passing-brightgreen)
![Java Version](https://img.shields.io/badge/Java-17-blue)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.x-success)
![License](https://img.shields.io/badge/license-MIT-green)

---

## 📖 Mô Tả Dự Án
**CRMO - Kế Toán** là phân hệ quản lý tài chính và kế toán trực tuyến thuộc hệ sinh thái CRM (Customer Relationship Management). Dự án nhằm mục đích tối ưu hóa quy trình quản lý doanh thu, chi phí, hóa đơn, hợp đồng và tồn kho cho các doanh nghiệp vừa và nhỏ (SMEs).

**Đặc điểm chính:**
- Quản lý Hợp đồng & Khách hàng.
- Xử lý Thu/Chi (Receipt & Payment) theo thời gian thực.
- Xuất nhập Hóa đơn và Đồng bộ thẻ kho (Inventory).
- Báo cáo tài chính cơ bản.
- Tích hợp giao diện Frontend trực quan và API Backend mạnh mẽ.

---

## 🛠 Phần Phụ Thuộc (Dependencies)

Để khởi chạy dự án, bạn cần chuẩn bị các công cụ sau:
- **Java Development Kit (JDK) 17+**
- **Maven 3.8+**
- **MySQL Server 8.0+**
- **Trình duyệt web hiện đại** (Chrome, Firefox, Edge) để chạy Frontend.

**Thư viện chính (Backend):**
- Spring Boot Web, Spring Data JPA
- MySQL Connector, Lombok

---

## 🚀 Hướng Dẫn Cài Đặt

1. **Clone dự án:**
   ```bash
   git clone https://github.com/Dogeeeree/crm-online-accounting.git
   cd crm-online-accounting
   ```

2. **Cấu hình Cơ sở dữ liệu:**
   - Tạo database trên MySQL với tên `crm_accounting`.
   - Cập nhật thông tin kết nối (username, password) trong file `crm-backend/src/main/resources/application.properties`.

3. **Chạy Backend:**
   ```bash
   cd crm-backend
   mvn clean install
   mvn spring-boot:run
   ```
   *Server sẽ khởi chạy tại `http://localhost:8080`.*

4. **Chạy Frontend:**
   - Mở file `crm-frontend/index.html` trực tiếp bằng trình duyệt.
   - Hoặc sử dụng Live Server extension trên VS Code/IntelliJ.

---

## 💡 Cách Dùng Và Ví Dụ

1. **Khởi tạo dữ liệu (Database Setup):**
   - Import file script `CRMOnline_Pro.sql` (nằm ở thư mục gốc) vào MySQL để tự động tạo cấu trúc CSDL và các dữ liệu mẫu đầy đủ nhất cho hệ thống.
   - (Tùy chọn) Có thể chạy script `crm-backend/seed_data.sql` nếu chỉ muốn khởi tạo dữ liệu cơ bản (Khách hàng, Sản phẩm,...).

2. **Quản lý Thu/Chi (Ví dụ):**
   - Từ màn hình Frontend, chọn chức năng "Thu/Chi".
   - Nhập thông tin phiếu thu tiền cho Hợp đồng, hệ thống Backend sẽ tự động cập nhật lại công nợ của khách hàng và lưu lại lịch sử giao dịch tương ứng.

---

## ❓ Khắc Phục Lỗi Phổ Biến & FAQ

- **Lỗi `Access Denied for user 'root'@'localhost'`:**
  *Khắc phục:* Kiểm tra lại biến `spring.datasource.username` và `password` trong `application.properties` đã khớp với môi trường máy của bạn chưa.
- **Lỗi `Web server failed to start. Port 8080 was already in use.`:**
  *Khắc phục:* Mở `application.properties` và đổi cổng bằng dòng lệnh: `server.port=8081`. Nhớ cập nhật lại URL trong code fetch API của Frontend.

---

## 🐛 Những Lỗi Đã Biết (Known Issues)

- Đôi khi giao diện người dùng không tự động làm mới ngay sau khi tạo Hóa Đơn mới (Cần phải refresh lại trang, sẽ được fix trong phiên bản tới).
- Phản hồi của API lấy danh sách Thẻ Kho có thể chậm nếu lượng dữ liệu lớn.

---

## 📜 Lịch Sử Thay Đổi (Changelog)

- **v1.0.0 (2026-04-29):**
  - Khởi tạo repository `crm-online-accounting`.
  - Tích hợp các tính năng CRUD lõi cho: Hóa Đơn, Hợp Đồng, Thu Chi và Kho hàng.
  - Viết tài liệu README.md chi tiết.

---

## 📚 Tài Liệu Tham Khảo
- [Spring Boot Official Documentation](https://spring.io/projects/spring-boot)
- [MDN Web Docs (Fetch API, HTML, CSS)](https://developer.mozilla.org/en-US/)

---

