import os

base_dir = r"c:\Users\Admin\Desktop\CacDoAnLon\CRM CoBan\QL CRMOline- Phan Ke Toan\crm-backend"

files = {
    "pom.xml": """<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>3.2.5</version>
        <relativePath/>
    </parent>
    <groupId>com.crmonline</groupId>
    <artifactId>crm-backend</artifactId>
    <version>0.0.1-SNAPSHOT</version>
    <name>crm-backend</name>
    <dependencies>
        <dependency><groupId>org.springframework.boot</groupId><artifactId>spring-boot-starter-data-jpa</artifactId></dependency>
        <dependency><groupId>org.springframework.boot</groupId><artifactId>spring-boot-starter-web</artifactId></dependency>
        <dependency><groupId>org.springframework.boot</groupId><artifactId>spring-boot-starter-validation</artifactId></dependency>
        <dependency><groupId>com.mysql</groupId><artifactId>mysql-connector-j</artifactId><scope>runtime</scope></dependency>
        <dependency><groupId>org.projectlombok</groupId><artifactId>lombok</artifactId><optional>true</optional></dependency>
    </dependencies>
</project>""",
    r"src\main\resources\application.properties": """spring.datasource.url=jdbc:mysql://localhost:3306/CRMOnline_Pro?useSSL=false&serverTimezone=UTC
spring.datasource.username=root
spring.datasource.password=123456
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true""",
    r"src\main\java\com\crmonline\CrmOnlineApplication.java": """package com.crmonline;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class CrmOnlineApplication {
    public static void main(String[] args) {
        SpringApplication.run(CrmOnlineApplication.class, args);
    }
}""",
    r"src\main\java\com\crmonline\common\ApiResponse.java": """package com.crmonline.common;
import lombok.AllArgsConstructor;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class ApiResponse<T> {
    private String message;
    private T data;
    private LocalDateTime timestamp;

    public static <T> ApiResponse<T> success(String message, T data) {
        return new ApiResponse<>(message, data, LocalDateTime.now());
    }
}""",
    r"src\main\java\com\crmonline\common\GlobalExceptionHandler.java": """package com.crmonline.common;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import java.time.LocalDateTime;

@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiResponse<String>> handleException(Exception ex) {
        return ResponseEntity.badRequest().body(
            new ApiResponse<>(ex.getMessage(), null, LocalDateTime.now())
        );
    }
}""",
    r"src\main\java\com\crmonline\enums\ContractStatus.java": "package com.crmonline.enums;\npublic enum ContractStatus { DangThucHien, TamDung, ThanhLy }",
    r"src\main\java\com\crmonline\enums\InvoiceStatus.java": "package com.crmonline.enums;\npublic enum InvoiceStatus { ChuaThanhToan, ThanhToan1Phan, HoanTat }",
    r"src\main\java\com\crmonline\enums\ReceiptType.java": "package com.crmonline.enums;\npublic enum ReceiptType { Thu, Chi }",
    r"src\main\java\com\crmonline\enums\TransactionType.java": "package com.crmonline.enums;\npublic enum TransactionType { NhapMua, XuatBan, NhapTraKhach, XuatTraNCC, XuatHuy, KiemKe }",
    r"src\main\java\com\crmonline\entity\Customer.java": """package com.crmonline.entity;
import lombok.Data;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "KH_KhachHang")
public class Customer {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String maKhachHang;
    private String tenKhachHang;
    private String email;
    private String soDienThoai;
    private String maSoThue;
    private Boolean isDeleted = false;
    private LocalDateTime createdAt = LocalDateTime.now();
    private LocalDateTime updatedAt = LocalDateTime.now();
}""",
    r"src\main\java\com\crmonline\repository\CustomerRepository.java": """package com.crmonline.repository;
import com.crmonline.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CustomerRepository extends JpaRepository<Customer, Long> {
    List<Customer> findByIsDeletedFalse();
}""",
    r"src\main\java\com\crmonline\controller\CustomerController.java": """package com.crmonline.controller;
import com.crmonline.common.ApiResponse;
import com.crmonline.entity.Customer;
import com.crmonline.repository.CustomerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/customers")
@RequiredArgsConstructor
public class CustomerController {
    private final CustomerRepository customerRepository;

    @GetMapping
    public ResponseEntity<ApiResponse<List<Customer>>> getAll() {
        return ResponseEntity.ok(ApiResponse.success("Success", customerRepository.findByIsDeletedFalse()));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<Customer>> create(@RequestBody Customer customer) {
        return ResponseEntity.ok(ApiResponse.success("Created", customerRepository.save(customer)));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<String>> softDelete(@PathVariable Long id) {
        Customer c = customerRepository.findById(id).orElseThrow(() -> new RuntimeException("Not found"));
        c.setIsDeleted(true);
        customerRepository.save(c);
        return ResponseEntity.ok(ApiResponse.success("Deleted", null));
    }
}""",
    r"src\main\java\com\crmonline\entity\Contract.java": """package com.crmonline.entity;
import com.crmonline.enums.ContractStatus;
import lombok.Data;
import jakarta.persistence.*;
import java.time.LocalDate;

@Data
@Entity
@Table(name = "HD_HopDong")
public class Contract {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String maHopDong;
    
    @ManyToOne
    @JoinColumn(name = "khachHang_id")
    private Customer customer;
    
    private LocalDate ngayKy;
    private Integer thoiHan;
    
    @Enumerated(EnumType.STRING)
    private ContractStatus trangThai = ContractStatus.DangThucHien;
}""",
    r"src\main\java\com\crmonline\repository\ContractRepository.java": """package com.crmonline.repository;
import com.crmonline.entity.Contract;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ContractRepository extends JpaRepository<Contract, Long> {
    List<Contract> findByCustomerId(Long customerId);
}""",
    r"src\main\java\com\crmonline\controller\ContractController.java": """package com.crmonline.controller;
import com.crmonline.common.ApiResponse;
import com.crmonline.entity.Contract;
import com.crmonline.entity.Customer;
import com.crmonline.repository.ContractRepository;
import com.crmonline.repository.CustomerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/contracts")
@RequiredArgsConstructor
public class ContractController {
    private final ContractRepository contractRepository;
    private final CustomerRepository customerRepository;

    @PostMapping("/{customerId}")
    public ResponseEntity<ApiResponse<Contract>> create(@PathVariable Long customerId, @RequestBody Contract contract) {
        Customer c = customerRepository.findById(customerId).orElseThrow(() -> new RuntimeException("Customer not found"));
        contract.setCustomer(c);
        return ResponseEntity.ok(ApiResponse.success("Created", contractRepository.save(contract)));
    }

    @GetMapping("/customer/{customerId}")
    public ResponseEntity<ApiResponse<List<Contract>>> getByCustomer(@PathVariable Long customerId) {
        return ResponseEntity.ok(ApiResponse.success("Success", contractRepository.findByCustomerId(customerId)));
    }
}""",
    r"src\main\java\com\crmonline\entity\Invoice.java": """package com.crmonline.entity;
import com.crmonline.enums.InvoiceStatus;
import lombok.Data;
import jakarta.persistence.*;
import java.math.BigDecimal;

@Data
@Entity
@Table(name = "KT_HoaDon")
public class Invoice {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String maHoaDon;

    @ManyToOne
    @JoinColumn(name = "hopDong_id")
    private Contract contract;

    @ManyToOne
    @JoinColumn(name = "khachHang_id")
    private Customer customer;

    private BigDecimal tongTien;
    private BigDecimal soTienDaThu = BigDecimal.ZERO;

    @Enumerated(EnumType.STRING)
    private InvoiceStatus trangThaiThanhToan = InvoiceStatus.ChuaThanhToan;
}""",
    r"src\main\java\com\crmonline\dto\InvoiceRequest.java": """package com.crmonline.dto;
import lombok.Data;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import java.math.BigDecimal;

@Data
public class InvoiceRequest {
    private String maHoaDon;
    @NotNull private Long hopDongId;
    @NotNull private Long khachHangId;
    @Positive private BigDecimal tongTien;
}""",
    r"src\main\java\com\crmonline\repository\InvoiceRepository.java": """package com.crmonline.repository;
import com.crmonline.entity.Invoice;
import org.springframework.data.jpa.repository.JpaRepository;
public interface InvoiceRepository extends JpaRepository<Invoice, Long> {}""",
    r"src\main\java\com\crmonline\service\impl\InvoiceServiceImpl.java": """package com.crmonline.service.impl;
import com.crmonline.dto.InvoiceRequest;
import com.crmonline.entity.*;
import com.crmonline.enums.InvoiceStatus;
import com.crmonline.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class InvoiceServiceImpl {
    private final InvoiceRepository invoiceRepository;
    private final ContractRepository contractRepository;
    private final CustomerRepository customerRepository;

    public Invoice createInvoice(InvoiceRequest req) {
        Contract contract = contractRepository.findById(req.getHopDongId())
                .orElseThrow(() -> new RuntimeException("Contract not found"));
        Customer customer = customerRepository.findById(req.getKhachHangId())
                .orElseThrow(() -> new RuntimeException("Customer not found"));

        Invoice invoice = new Invoice();
        invoice.setMaHoaDon(req.getMaHoaDon());
        invoice.setContract(contract);
        invoice.setCustomer(customer);
        invoice.setTongTien(req.getTongTien());
        invoice.setSoTienDaThu(java.math.BigDecimal.ZERO);
        invoice.setTrangThaiThanhToan(InvoiceStatus.ChuaThanhToan);

        return invoiceRepository.save(invoice);
    }
}""",
    r"src\main\java\com\crmonline\controller\InvoiceController.java": """package com.crmonline.controller;
import com.crmonline.common.ApiResponse;
import com.crmonline.dto.InvoiceRequest;
import com.crmonline.entity.Invoice;
import com.crmonline.repository.InvoiceRepository;
import com.crmonline.service.impl.InvoiceServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/invoices")
@RequiredArgsConstructor
public class InvoiceController {
    private final InvoiceServiceImpl invoiceService;
    private final InvoiceRepository invoiceRepository;

    @PostMapping
    public ResponseEntity<ApiResponse<Invoice>> create(@Validated @RequestBody InvoiceRequest req) {
        return ResponseEntity.ok(ApiResponse.success("Created", invoiceService.createInvoice(req)));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Invoice>> getDetail(@PathVariable Long id) {
        Invoice inv = invoiceRepository.findById(id).orElseThrow(() -> new RuntimeException("Not found"));
        return ResponseEntity.ok(ApiResponse.success("Success", inv));
    }
}""",
    r"src\main\java\com\crmonline\entity\ReceiptPayment.java": """package com.crmonline.entity;
import com.crmonline.enums.ReceiptType;
import lombok.Data;
import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@Entity
@Table(name = "KT_PhieuThuChi")
public class ReceiptPayment {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String maPhieu;
    
    @Enumerated(EnumType.STRING)
    private ReceiptType loaiPhieu;

    @ManyToOne
    @JoinColumn(name = "khachHang_id")
    private Customer customer;

    @ManyToOne
    @JoinColumn(name = "hoaDon_id")
    private Invoice invoice;

    private BigDecimal soTien;
    private LocalDate ngayTao = LocalDate.now();
}""",
    r"src\main\java\com\crmonline\repository\ReceiptPaymentRepository.java": """package com.crmonline.repository;
import com.crmonline.entity.ReceiptPayment;
import org.springframework.data.jpa.repository.JpaRepository;
public interface ReceiptPaymentRepository extends JpaRepository<ReceiptPayment, Long> {}""",
    r"src\main\java\com\crmonline\service\impl\ReceiptPaymentServiceImpl.java": """package com.crmonline.service.impl;
import com.crmonline.entity.*;
import com.crmonline.enums.*;
import com.crmonline.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ReceiptPaymentServiceImpl {
    private final ReceiptPaymentRepository receiptRepo;
    private final InvoiceRepository invoiceRepo;

    @Transactional
    public ReceiptPayment createReceipt(ReceiptPayment receipt) {
        ReceiptPayment savedReceipt = receiptRepo.save(receipt);
        if (receipt.getLoaiPhieu() == ReceiptType.Thu && receipt.getInvoice() != null) {
            Invoice invoice = invoiceRepo.findById(receipt.getInvoice().getId())
                    .orElseThrow(() -> new RuntimeException("Invoice not found"));

            invoice.setSoTienDaThu(invoice.getSoTienDaThu().add(receipt.getSoTien()));

            if (invoice.getSoTienDaThu().compareTo(invoice.getTongTien()) >= 0) {
                invoice.setTrangThaiThanhToan(InvoiceStatus.HoanTat);
            } else if (invoice.getSoTienDaThu().compareTo(java.math.BigDecimal.ZERO) > 0) {
                invoice.setTrangThaiThanhToan(InvoiceStatus.ThanhToan1Phan);
            } else {
                invoice.setTrangThaiThanhToan(InvoiceStatus.ChuaThanhToan);
            }
            invoiceRepo.save(invoice);
        }
        return savedReceipt;
    }
}""",
    r"src\main\java\com\crmonline\controller\ReceiptPaymentController.java": """package com.crmonline.controller;
import com.crmonline.common.ApiResponse;
import com.crmonline.entity.ReceiptPayment;
import com.crmonline.service.impl.ReceiptPaymentServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/receipts-payments")
@RequiredArgsConstructor
public class ReceiptPaymentController {
    private final ReceiptPaymentServiceImpl service;

    @PostMapping
    public ResponseEntity<ApiResponse<ReceiptPayment>> create(@RequestBody ReceiptPayment rp) {
        return ResponseEntity.ok(ApiResponse.success("Created", service.createReceipt(rp)));
    }
}""",
    r"src\main\java\com\crmonline\entity\Product.java": """package com.crmonline.entity;
import lombok.Data;
import jakarta.persistence.*;

@Data
@Entity
@Table(name = "BH_SanPham")
public class Product {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String maSP;
    private String tenSP;
    private Integer soLuongTon = 0;
}""",
    r"src\main\java\com\crmonline\entity\InventoryCard.java": """package com.crmonline.entity;
import com.crmonline.enums.TransactionType;
import lombok.Data;
import jakarta.persistence.*;

@Data
@Entity
@Table(name = "Kho_TheKho")
public class InventoryCard {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne
    @JoinColumn(name = "sanPham_id")
    private Product product;
    
    @Enumerated(EnumType.STRING)
    private TransactionType loaiGiaoDich;
    
    private Integer soLuongThayDoi;
    private Integer tonCuoi;
}""",
    r"src\main\java\com\crmonline\repository\ProductRepository.java": """package com.crmonline.repository;
import com.crmonline.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
public interface ProductRepository extends JpaRepository<Product, Long> {}""",
    r"src\main\java\com\crmonline\repository\InventoryCardRepository.java": """package com.crmonline.repository;
import com.crmonline.entity.InventoryCard;
import org.springframework.data.jpa.repository.JpaRepository;
public interface InventoryCardRepository extends JpaRepository<InventoryCard, Long> {}""",
    r"src\main\java\com\crmonline\service\impl\InventoryCardServiceImpl.java": """package com.crmonline.service.impl;
import com.crmonline.entity.*;
import com.crmonline.enums.TransactionType;
import com.crmonline.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class InventoryCardServiceImpl {
    private final InventoryCardRepository cardRepo;
    private final ProductRepository productRepo;

    @Transactional
    public InventoryCard createTransaction(InventoryCard card) {
        Product product = productRepo.findById(card.getProduct().getId())
                .orElseThrow(() -> new RuntimeException("Product not found"));

        if (card.getLoaiGiaoDich() == TransactionType.XuatBan) {
            if (product.getSoLuongTon() < card.getSoLuongThayDoi()) {
                throw new RuntimeException("Không đủ hàng trong kho!");
            }
            product.setSoLuongTon(product.getSoLuongTon() - card.getSoLuongThayDoi());
        } 
        else if (card.getLoaiGiaoDich() == TransactionType.NhapMua) {
            product.setSoLuongTon(product.getSoLuongTon() + card.getSoLuongThayDoi());
        }

        productRepo.save(product);
        card.setTonCuoi(product.getSoLuongTon());
        return cardRepo.save(card);
    }
}""",
    r"src\main\java\com\crmonline\controller\InventoryCardController.java": """package com.crmonline.controller;
import com.crmonline.common.ApiResponse;
import com.crmonline.entity.InventoryCard;
import com.crmonline.service.impl.InventoryCardServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/inventory-cards")
@RequiredArgsConstructor
public class InventoryCardController {
    private final InventoryCardServiceImpl service;

    @PostMapping
    public ResponseEntity<ApiResponse<InventoryCard>> create(@RequestBody InventoryCard card) {
        return ResponseEntity.ok(ApiResponse.success("Created", service.createTransaction(card)));
    }
}"""
}

for rel_path, content in files.items():
    abs_path = os.path.join(base_dir, rel_path)
    os.makedirs(os.path.dirname(abs_path), exist_ok=True)
    with open(abs_path, 'w', encoding='utf-8') as f:
        f.write(content)

print(f"Created {len(files)} files successfully in {base_dir}")
