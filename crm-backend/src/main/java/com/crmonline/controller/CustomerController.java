package com.crmonline.controller;
import com.crmonline.common.ApiResponse;
import com.crmonline.entity.Customer;
import com.crmonline.repository.CustomerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/customers")
@RequiredArgsConstructor
public class CustomerController {
    private final CustomerRepository customerRepository;

    @GetMapping
    public ResponseEntity<ApiResponse<List<Customer>>> getAll() {
        return ResponseEntity.ok(ApiResponse.success("Success", customerRepository.findByIsDeletedFalse()));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<Customer>> create(@RequestBody Customer customer) {
        return ResponseEntity.ok(ApiResponse.success("Created", customerRepository.save(customer)));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<String>> softDelete(@PathVariable Long id) {
        Customer c = customerRepository.findById(id).orElseThrow(() -> new RuntimeException("Not found"));
        c.setIsDeleted(true);
        customerRepository.save(c);
        return ResponseEntity.ok(ApiResponse.success("Deleted", null));
    }
}