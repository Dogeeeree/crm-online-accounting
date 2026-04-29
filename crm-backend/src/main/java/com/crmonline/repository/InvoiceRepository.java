package com.crmonline.repository;
import com.crmonline.entity.Invoice;
import org.springframework.data.jpa.repository.JpaRepository;
public interface InvoiceRepository extends JpaRepository<Invoice, Long> {}