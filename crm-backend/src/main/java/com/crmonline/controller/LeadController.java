package com.crmonline.controller;

import com.crmonline.common.ApiResponse;
import com.crmonline.entity.Customer;
import com.crmonline.entity.Lead;
import com.crmonline.service.LeadService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/leads")
@RequiredArgsConstructor
public class LeadController {
    private final LeadService leadService;

    @GetMapping
    public ResponseEntity<ApiResponse<Iterable<Lead>>> getAll() {
        return ResponseEntity.ok(ApiResponse.success("Success", leadService.getAllLeads()));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<Lead>> create(@RequestBody Lead lead) {
        return ResponseEntity.ok(ApiResponse.success("Created", leadService.createLead(lead)));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<Lead>> update(@PathVariable Long id, @RequestBody Lead lead) {
        return ResponseEntity.ok(ApiResponse.success("Updated", leadService.updateLead(id, lead)));
    }

    @PutMapping("/{id}/assign/{nhanVienId}")
    public ResponseEntity<ApiResponse<Lead>> assignLead(@PathVariable Long id, @PathVariable Integer nhanVienId) {
        return ResponseEntity.ok(ApiResponse.success("Assigned", leadService.assignLead(id, nhanVienId)));
    }

    @PostMapping("/{id}/convert")
    public ResponseEntity<ApiResponse<Customer>> convertToCustomer(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success("Converted", leadService.convertToKhachHang(id)));
    }
}
