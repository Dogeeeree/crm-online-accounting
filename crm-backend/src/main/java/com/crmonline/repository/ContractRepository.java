package com.crmonline.repository;
import com.crmonline.entity.Contract;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ContractRepository extends JpaRepository<Contract, Long> {
    List<Contract> findByCustomerId(Long customerId);
}