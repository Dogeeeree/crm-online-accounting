package com.crmonline.service;

import com.crmonline.entity.Customer;
import com.crmonline.entity.Lead;
import com.crmonline.repository.CustomerRepository;
import com.crmonline.repository.LeadRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class LeadService {
    private final LeadRepository leadRepository;
    private final CustomerRepository customerRepository;

    public Iterable<Lead> getAllLeads() {
        return leadRepository.findAll();
    }

    public Lead createLead(Lead lead) {
        lead.setTinhTrang("Mới");
        return leadRepository.save(lead);
    }

    public Lead updateLead(Long id, Lead leadDetails) {
        Lead existing = leadRepository.findById(id).orElseThrow(() -> new RuntimeException("Lead not found"));
        existing.setTenLead(leadDetails.getTenLead());
        existing.setTenCongTy(leadDetails.getTenCongTy());
        existing.setSoDienThoai(leadDetails.getSoDienThoai());
        existing.setEmail(leadDetails.getEmail());
        existing.setTinhTrang(leadDetails.getTinhTrang());
        existing.setNhanVienPhuTrachId(leadDetails.getNhanVienPhuTrachId());
        return leadRepository.save(existing);
    }

    public Lead assignLead(Long leadId, Integer nhanVienId) {
        Lead lead = leadRepository.findById(leadId).orElseThrow();
        lead.setNhanVienPhuTrachId(nhanVienId);
        return leadRepository.save(lead);
    }

    @Transactional
    public Customer convertToKhachHang(Long leadId) {
        Lead lead = leadRepository.findById(leadId).orElseThrow();

        Customer kh = new Customer();
        kh.setMaKhachHang("KH" + System.currentTimeMillis());
        kh.setTenKhachHang(lead.getTenLead() + (lead.getTenCongTy() != null ? " - " + lead.getTenCongTy() : ""));
        kh.setEmail(lead.getEmail());
        kh.setSoDienThoai(lead.getSoDienThoai());
        kh.setNhanVienPhuTrachId(lead.getNhanVienPhuTrachId());
        kh.setIsDeleted(false);

        lead.setTinhTrang("Đã chuyển đổi");
        leadRepository.save(lead);

        return customerRepository.save(kh);
    }
}
