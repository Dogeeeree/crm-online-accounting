package com.crmonline.controller;
import com.crmonline.common.ApiResponse;
import com.crmonline.entity.Contract;
import com.crmonline.entity.Customer;
import com.crmonline.repository.ContractRepository;
import com.crmonline.repository.CustomerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/contracts")
@RequiredArgsConstructor
public class ContractController {
    private final ContractRepository contractRepository;
    private final CustomerRepository customerRepository;

    @GetMapping
    public ResponseEntity<ApiResponse<List<Contract>>> getAll() {
        return ResponseEntity.ok(ApiResponse.success("Success", contractRepository.findAll()));
    }

    @PostMapping("/{customerId}")
    public ResponseEntity<ApiResponse<Contract>> create(@PathVariable Long customerId, @RequestBody Contract contract) {
        Customer c = customerRepository.findById(customerId).orElseThrow(() -> new RuntimeException("Customer not found"));
        contract.setCustomer(c);
        return ResponseEntity.ok(ApiResponse.success("Created", contractRepository.save(contract)));
    }

    @GetMapping("/customer/{customerId}")
    public ResponseEntity<ApiResponse<List<Contract>>> getByCustomer(@PathVariable Long customerId) {
        return ResponseEntity.ok(ApiResponse.success("Success", contractRepository.findByCustomerId(customerId)));
    }
}