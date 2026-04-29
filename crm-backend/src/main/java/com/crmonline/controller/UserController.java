package com.crmonline.controller;

import com.crmonline.common.ApiResponse;
import com.crmonline.entity.User;
import com.crmonline.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {
    private final UserRepository userRepository;

    @GetMapping("/staff")
    public ResponseEntity<ApiResponse<Iterable<User>>> getStaffList() {
        return ResponseEntity.ok(ApiResponse.success("Success", userRepository.findAll()));
    }
}
