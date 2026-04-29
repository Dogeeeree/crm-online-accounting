package com.crmonline.service;

import com.crmonline.entity.Customer;
import com.crmonline.repository.CustomerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class CustomerService {
    private final CustomerRepository customerRepository;

    public Iterable<Customer> getAllCustomers() {
        return customerRepository.findByIsDeletedFalse();
    }

    public Customer createCustomer(Customer kh) {
        return customerRepository.save(kh);
    }

    public Customer updateCustomer(Long id, Customer details) {
        Customer kh = customerRepository.findById(id).orElseThrow();
        kh.setTenKhachHang(details.getTenKhachHang());
        kh.setMaSoThue(details.getMaSoThue());
        kh.setLoaiKhachHangId(details.getLoaiKhachHangId());
        kh.setEmail(details.getEmail());
        kh.setSoDienThoai(details.getSoDienThoai());
        kh.setNhanVienPhuTrachId(details.getNhanVienPhuTrachId());
        kh.setTinhTrangId(details.getTinhTrangId());
        kh.setUpdatedAt(LocalDateTime.now());
        return customerRepository.save(kh);
    }
}
