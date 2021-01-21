package com.ccproject.example.controller;

import com.ccproject.example.model.Book;
import com.ccproject.example.model.User;
import com.ccproject.example.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Optional;
import java.util.Set;

@RestController
@RequestMapping("/book")
public class BookController {

    Iterable<Book> books=new ArrayList<>();
    @Autowired //TODO: bez ovoga ne radi, provjeriti sta je!! bez @autowired repozitorija bude NULL! Zasto ????????
    BookRepository bookRepository;

    @GetMapping("/{id}")
    public Optional<Book> getById(@PathVariable String id){
        Long idLong=Long.parseLong(id);
        Optional<Book> book=bookRepository.findById(idLong);
        if(book.isPresent()){

        }
        return book;
    }

    @GetMapping("/")
    public Iterable<Book> getAll(){
        books=bookRepository.findAll();
        //if(books.isPresent()){return books;} else{throw }

        return books;
    }

    @PostMapping("/")
    public Book addBook(@RequestBody Book book){
        Book savedBook=bookRepository.save(book);
        return savedBook;
    }


}
