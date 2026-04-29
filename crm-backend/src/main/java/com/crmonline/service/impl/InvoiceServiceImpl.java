package com.crmonline.service.impl;
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
}