package com.crmonline.entity;
import lombok.Data;
import jakarta.persistence.*;

@Data
@Entity
@Table(name = "bh_sanpham")
public class Product {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String maSP;
    private String tenSP;
    private Integer soLuongTon = 0;
}