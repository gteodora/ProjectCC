package com.ccproject.example.model;

import javax.persistence.*;
import java.util.Set;

@Entity
public class Book {
    @Id
    //@GeneratedValue(strategy = GenerationType.AUTO)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String author;

    public Book() {
        this.name="boook";
    }

    public Book(String name, String author) {
        this.name = name;
        this.author = author;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }
}

/*

    @ManyToMany
    @JoinTable(
            name = "user_read_book",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "book_id"))
           private Set<User> usersDoneReading;
    public Set<User> getUsersDoneReading() {
        return usersDoneReading;
    }
 */
