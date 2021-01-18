package com.ccproject.example.controller;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;

@RestController
public class HelloController {

    @RequestMapping("/proba")
    public String index() {
        return "Greetings from Spring Boot!";
    }

}
