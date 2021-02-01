package com.ccproject.example;

import com.ccproject.example.model.Book;
import com.ccproject.example.repository.BookRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

import java.security.Principal;


@SpringBootApplication
@EnableSwagger2
public class ExampleApplication {

    private static final Logger log = LoggerFactory.getLogger(ExampleApplication.class);

    public static void main(String[] args) {
        SpringApplication.run(ExampleApplication.class, args);

                //SecurityContextHolder.getContext().getAuthentication().getPrincipal());

    }
}
