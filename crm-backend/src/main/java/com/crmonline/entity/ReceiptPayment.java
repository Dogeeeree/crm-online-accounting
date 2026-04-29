package com.crmonline.entity;
import com.crmonline.enums.ReceiptType;
import lombok.Data;
import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@Entity
@Table(name = "kt_phieuthuchi")
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
}