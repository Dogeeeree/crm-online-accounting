package com.crmonline.service.impl;
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
}