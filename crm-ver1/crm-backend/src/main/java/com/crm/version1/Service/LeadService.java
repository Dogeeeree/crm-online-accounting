package com.crm.version1.Service;

import com.crm.version1.entity.KhachHang;
import com.crm.version1.entity.Lead;
import com.crm.version1.repository.KhachHangRepository;
import com.crm.version1.repository.LeadRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class LeadService {
    private final LeadRepository leadRepository;
    private final KhachHangRepository khachHangRepository;

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

    // Nghiệp vụ: Giao việc / Phân công
    public Lead assignLead(Long leadId, Integer nhanVienId) {
        Lead lead = leadRepository.findById(leadId).orElseThrow();
        lead.setNhanVienPhuTrachId(nhanVienId);
        return leadRepository.save(lead);
    }

    // Nghiệp vụ: Convert Lead -> Khách hàng chính thức
    @Transactional
    public KhachHang convertToKhachHang(Long leadId) {
        Lead lead = leadRepository.findById(leadId).orElseThrow();

        KhachHang kh = new KhachHang();
        // Generate mã KH tự động (có thể dùng UUID hoặc Sequence tùy logic của bạn)
        kh.setMaKhachHang("KH" + System.currentTimeMillis());
        kh.setTenKhachHang(lead.getTenLead() + (lead.getTenCongTy() != null ? " - " + lead.getTenCongTy() : ""));
        kh.setEmail(lead.getEmail());
        kh.setSoDienThoai(lead.getSoDienThoai());
        kh.setNhanVienPhuTrachId(lead.getNhanVienPhuTrachId());
        kh.setIsDeleted(false);

        // Cập nhật trạng thái Lead sau khi convert
        lead.setTinhTrang("Đã chuyển đổi");
        leadRepository.save(lead);

        return khachHangRepository.save(kh);
    }
}