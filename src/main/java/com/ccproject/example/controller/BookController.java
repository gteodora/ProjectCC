package com.ccproject.example.controller;


import com.ccproject.example.errorhandling.IdMismatchException;
import com.ccproject.example.errorhandling.NotFoundException;
import com.ccproject.example.model.Book;
import com.ccproject.example.model.User;
import com.ccproject.example.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.ArrayList;
import java.util.Optional;
import java.util.Set;

//@CrossOrigin(  origins = "*",  allowedHeaders = "*")  //, allowCredentials = "true"
@RestController
@RequestMapping("/api/book")
public class BookController {

    Iterable<Book> books=new ArrayList<>();
    @Autowired
    BookRepository bookRepository;

    @GetMapping("/{id}")
    public Book getById(@PathVariable String id){
        Long idLong=Long.parseLong(id);
        return bookRepository.findById(idLong)
                .orElseThrow(() -> new NotFoundException());

    }

    @GetMapping("/")
    public Iterable<Book> getAll(){

        books=bookRepository.findAll();
        //if(books.isPresent()){return books;} else{throw }

        return books;
    }

    @PostMapping("/")
    @ResponseStatus(HttpStatus.CREATED)
    public Book addBook(@RequestBody Book book){
        Book savedBook=bookRepository.save(book);
        return savedBook;
    }

    @PutMapping("/{id}")
    public Book updateBook(@RequestBody Book book, @PathVariable Long id) {
        if (book.getId() != id) {
            throw new IdMismatchException();
        }
        bookRepository.findById(id)
                .orElseThrow(NotFoundException::new);
        return bookRepository.save(book);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        bookRepository.findById(id)
                .orElseThrow(NotFoundException::new);
        bookRepository.deleteById(id);
    }

    private String getCurrentUsername() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (principal instanceof UserDetails) {
            return ((UserDetails) principal).getUsername();
        }
        if (principal instanceof Principal) {
            return ((Principal) principal).getName();
        }
        return String.valueOf(principal);
    }

}
