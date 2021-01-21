package com.ccproject.example.controller;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;

//@Configuration
//@EnableWebSecurity
@RestController
public class HelloController /*extends WebSecurityConfigurerAdapter */{

    @RequestMapping("/proba")
    public String index() {
        return "Greetings from Spring Boot!";
    }
/*
    @Override
    protected void configure(HttpSecurity security) throws Exception
    {
      //  security.httpBasic().disable();
    }*/

}
