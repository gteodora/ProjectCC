package com.ccproject.example.controller;


import com.ccproject.example.errorhandling.IdMismatchException;
import com.ccproject.example.errorhandling.NotFoundException;
import com.ccproject.example.model.Book;
import com.ccproject.example.model.User;
import com.ccproject.example.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Optional;
import java.util.Set;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/book")
public class BookController {

    Iterable<Book> books=new ArrayList<>();
    @Autowired //TODO: bez ovoga ne radi, provjeriti sta je!! bez @autowired repozitorija bude NULL! Zasto ????????
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

    @CrossOrigin(origins = "http://localhost:4200")
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        bookRepository.findById(id)
                .orElseThrow(NotFoundException::new); //TODO ovaj operator :: provjeriti,ali msm da u tijelu lambde zove konstruktor
        bookRepository.deleteById(id);
    }

}
