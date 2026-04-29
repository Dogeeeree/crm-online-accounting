package com.crmonline.repository;

import com.crmonline.entity.HoatDong;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HoatDongRepository extends JpaRepository<HoatDong, Long> {
    Iterable<HoatDong> findByLeadIdOrderByThoiGianThucHienDesc(Long leadId);
    Iterable<HoatDong> findByKhachHangIdOrderByThoiGianThucHienDesc(Long khachHangId);
}
