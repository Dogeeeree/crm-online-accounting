package com.crmonline.entity;
import com.crmonline.enums.TransactionType;
import lombok.Data;
import jakarta.persistence.*;

@Data
@Entity
@Table(name = "kho_thekho")
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
}