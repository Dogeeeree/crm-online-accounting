package com.crmonline.controller;

import com.crmonline.common.ApiResponse;
import com.crmonline.entity.HoatDong;
import com.crmonline.service.HoatDongService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/hoat-dong")
@RequiredArgsConstructor
public class HoatDongController {
    private final HoatDongService hoatDongService;

    @GetMapping
    public ResponseEntity<ApiResponse<Iterable<HoatDong>>> getAll() {
        return ResponseEntity.ok(ApiResponse.success("Success", hoatDongService.getAllHoatDong()));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<HoatDong>> logActivity(@RequestBody HoatDong hoatDong) {
        return ResponseEntity.ok(ApiResponse.success("Created", hoatDongService.logActivity(hoatDong)));
    }

    @GetMapping("/lead/{leadId}")
    public ResponseEntity<ApiResponse<Iterable<HoatDong>>> getByLead(@PathVariable Long leadId) {
        return ResponseEntity.ok(ApiResponse.success("Success", hoatDongService.getHistoryByLead(leadId)));
    }

    @GetMapping("/customer/{customerId}")
    public ResponseEntity<ApiResponse<Iterable<HoatDong>>> getByCustomer(@PathVariable Long customerId) {
        return ResponseEntity.ok(ApiResponse.success("Success", hoatDongService.getHistoryByKhachHang(customerId)));
    }
}
