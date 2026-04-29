package com.crmonline.controller;
import com.crmonline.common.ApiResponse;
import com.crmonline.dto.InvoiceRequest;
import com.crmonline.entity.Invoice;
import com.crmonline.repository.InvoiceRepository;
import com.crmonline.service.impl.InvoiceServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/invoices")
@RequiredArgsConstructor
public class InvoiceController {
    private final InvoiceServiceImpl invoiceService;
    private final InvoiceRepository invoiceRepository;

    @GetMapping
    public ResponseEntity<ApiResponse<List<Invoice>>> getAll() {
        return ResponseEntity.ok(ApiResponse.success("Success", invoiceRepository.findAll()));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<Invoice>> create(@Validated @RequestBody InvoiceRequest req) {
        return ResponseEntity.ok(ApiResponse.success("Created", invoiceService.createInvoice(req)));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Invoice>> getDetail(@PathVariable Long id) {
        Invoice inv = invoiceRepository.findById(id).orElseThrow(() -> new RuntimeException("Not found"));
        return ResponseEntity.ok(ApiResponse.success("Success", inv));
    }
}