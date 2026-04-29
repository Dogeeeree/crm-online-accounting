package com.crmonline.controller;

import com.crmonline.common.ApiResponse;
import com.crmonline.entity.ReceiptPayment;
import com.crmonline.repository.ReceiptPaymentRepository;
import com.crmonline.service.impl.ReceiptPaymentServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/receipts-payments")
@RequiredArgsConstructor
public class ReceiptPaymentController {
    private final ReceiptPaymentServiceImpl service;
    private final ReceiptPaymentRepository repository;

    @GetMapping
    public ResponseEntity<ApiResponse<List<ReceiptPayment>>> getAll() {
        return ResponseEntity.ok(ApiResponse.success("Success", repository.findAll()));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<ReceiptPayment>> create(@RequestBody ReceiptPayment rp) {
        return ResponseEntity.ok(ApiResponse.success("Created", service.createReceipt(rp)));
    }
}