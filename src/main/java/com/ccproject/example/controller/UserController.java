package com.ccproject.example.controller;

import com.ccproject.example.model.Book;
import com.ccproject.example.model.User;
import com.ccproject.example.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@RestController
@RequestMapping("/user")
public class UserController {
    Iterable<User> users=new ArrayList<User>();
    @Autowired
    UserRepository userRepository;

    @GetMapping("/{id}/books")
    public Set<Book> getAllReadBooks(@PathVariable String id){
        Optional<User> user=userRepository.findById(Long.parseLong(id));
        Set<Book> readBooks=null;
        if(user!=null)
            readBooks = user.get().getReadBooks();
        //if readBooks!==null
        return readBooks;
    }

    @GetMapping("/{id}")
    public  Optional<User> getById(@PathVariable String id){
        Optional<User> user=userRepository.findById(Long.parseLong(id));
        /*if(user.isPresent())
            return user; */
        return user;
    }

    @GetMapping("/")
    public Iterable<User> getAll(){
        users=userRepository.findAll();
        //if(users!==null)
        return users;
    }

    @PostMapping("/")
    public User addUser(@RequestBody User user){
        User savedUser=userRepository.save(user);
        return savedUser;
    }
}
