package com.crmonline.service.impl;
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
}