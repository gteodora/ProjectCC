package com.ccproject.example.repository;



import com.ccproject.example.model.Book;
import com.ccproject.example.model.User;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;

public interface BookRepository extends CrudRepository<Book, Long> {
  //  Book findById(int id);
    Optional<Book> findById(Long aLong);
    Book findBookByAuthor(String author);
    Book findBookByName(String name);
    boolean existsById(Long aLong);
    Iterable<Book> findAll();
    Iterable<Book> findAllById(Iterable<Long> iterable);
    long count();
    void deleteById(Long aLong);
    void delete(Book book);
    void deleteAll(Iterable<? extends Book> iterable);
    void deleteAll();
    <S extends Book> S save(S s);
 // Iterable<S extends Book> saveAll(Iterable<Book> iterable); //extends Book>

}