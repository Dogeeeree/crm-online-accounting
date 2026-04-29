package com.crmonline.controller;
import com.crmonline.common.ApiResponse;
import com.crmonline.entity.InventoryCard;
import com.crmonline.repository.InventoryCardRepository;
import com.crmonline.service.impl.InventoryCardServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/inventory-cards")
@RequiredArgsConstructor
public class InventoryCardController {
    private final InventoryCardServiceImpl service;
    private final InventoryCardRepository repository;

    @GetMapping
    public ResponseEntity<ApiResponse<List<InventoryCard>>> getAll() {
        return ResponseEntity.ok(ApiResponse.success("Success", repository.findAll()));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<InventoryCard>> create(@RequestBody InventoryCard card) {
        return ResponseEntity.ok(ApiResponse.success("Created", service.createTransaction(card)));
    }
}