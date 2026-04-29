# Cấu trúc Thư mục Dự án CRMO - Kế Toán

Tài liệu này mô tả chi tiết vai trò của từng thư mục trong hệ thống CRM Online - Phân hệ Kế toán.

---

## 📂 Thư mục Gốc (Root)
- **`crm-backend/`**: Chứa mã nguồn phía máy chủ (Backend) sử dụng Spring Boot (Java).
- **`crm-frontend/`**: Chứa mã nguồn giao diện người dùng (Frontend) sử dụng HTML/CSS/JS.
- **`CRMOnline_Pro.sql`**: Script khởi tạo toàn bộ Cơ sở dữ liệu (Bảng, Dữ liệu mẫu).
- **`generate_crm.py`**: Script Python dùng để dựng nhanh cấu trúc project Backend.
- **`README.md`**: Tài liệu hướng dẫn chung của dự án.

---

## 📂 Backend (`crm-backend`)
Nơi xử lý logic nghiệp vụ, quản lý cơ sở dữ liệu và cung cấp API.

### 📍 `src/main/java/com/crmonline`
- **`common/`**: Chứa các lớp dùng chung toàn hệ thống (Cấu trúc phản hồi API, Xử lý lỗi tập trung).
- **`controller/`**: Định nghĩa các API Endpoints (Ví dụ: `/api/customers`, `/api/invoices`). Đây là nơi tiếp nhận yêu cầu từ Frontend.
- **`dto/` (Data Transfer Objects)**: Các lớp trung gian để định dạng dữ liệu khi gửi/nhận qua API (Ví dụ: `InvoiceRequest`).
- **`entity/`**: Các lớp ánh xạ trực tiếp xuống bảng trong Cơ sở dữ liệu (Ví dụ: `Customer`, `Contract`).
- **`enums/`**: Các tập hợp hằng số định nghĩa trạng thái (Ví dụ: `InvoiceStatus`: Đã thanh toán, Chưa thanh toán).
- **`repository/`**: Các Interface xử lý truy vấn dữ liệu (CRUD) vào MySQL thông qua Spring Data JPA.
- **`service/`**: Chứa các Interface định nghĩa nghiệp vụ logic.
    - **`impl/`**: Triển khai chi tiết các logic nghiệp vụ (Ví dụ: Tính toán công nợ khi tạo hóa đơn).

### 📍 `src/main/resources`
- **`application.properties`**: File cấu hình chính của Spring Boot (Kết nối Database, Cổng Server).
- **`seed_data.sql`**: Script SQL nhỏ để khởi tạo dữ liệu kiểm thử cơ bản.

---

## 📂 Frontend (`crm-frontend`)
Giao diện trực quan cho người dùng cuối.

- **`index.html`**: Trang web chính, điểm bắt đầu của ứng dụng.
- **`style.css`**: Định nghĩa giao diện, màu sắc, bố cục (Aesthetics).
- **`app.js`**: Xử lý logic phía Client, gọi API từ Backend và hiển thị dữ liệu lên màn hình.

---

## ⚙️ Thư mục khác
- **`.gitignore`**: Khai báo các file/thư mục không cần đẩy lên GitHub (như `target/`, `.idea/`).
- **`pom.xml`**: File quản lý thư viện và cấu hình build của Maven (Backend).
