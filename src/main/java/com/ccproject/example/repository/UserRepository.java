package com.ccproject.example.repository;

import com.ccproject.example.model.User;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface UserRepository extends CrudRepository<User, Long> {


    <S extends User> S save(S s);


   // Iterable<User> saveAll(Iterable<User> iterable);

    Optional<User> findById(Long aLong);

    boolean existsById(Long aLong);

    Iterable<User> findAll();

    Iterable<User> findAllById(Iterable<Long> iterable);

    long count();

    void deleteById(Long aLong);

    void delete(User user);

    void deleteAll(Iterable<? extends User> iterable);

    void deleteAll();

}