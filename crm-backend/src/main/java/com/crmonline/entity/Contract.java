package com.crmonline.entity;
import com.crmonline.enums.ContractStatus;
import lombok.Data;
import jakarta.persistence.*;
import java.time.LocalDate;

@Data
@Entity
@Table(name = "hd_hopdong")
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
}