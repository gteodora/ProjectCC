package com.ccproject.example.authentication.service;

import com.ccproject.example.model.User;

public interface UserService {
    void save(User user);

    User findByUsername(String username);
}
