package com.crmonline.entity;
import com.crmonline.enums.InvoiceStatus;
import lombok.Data;
import jakarta.persistence.*;
import java.math.BigDecimal;

@Data
@Entity
@Table(name = "kt_hoadon")
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
}