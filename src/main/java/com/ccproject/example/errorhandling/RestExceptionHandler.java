package com.ccproject.example.errorhandling;

import org.hibernate.exception.ConstraintViolationException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
public class RestExceptionHandler extends ResponseEntityExceptionHandler {
private static final String NOT_FOUND_MESSAGE="Not found";
private static final String BAD_REQUEST_MESSAGE="Bad request";

//TODO: staviti da nije dostupan server
//TODO: ako je pogresna putanja error napraviti

    @ExceptionHandler({ NotFoundException.class })
    protected ResponseEntity<Object> handleNotFound(
            Exception ex, WebRequest request) {
        return handleExceptionInternal(ex, NOT_FOUND_MESSAGE,
                new HttpHeaders(), HttpStatus.NOT_FOUND, request);
    }


    @ExceptionHandler({ IdMismatchException.class,
            UsernameNotFoundException.class})
    public ResponseEntity<Object> handleBadRequest(
            Exception ex, WebRequest request) {
        return handleExceptionInternal(ex, ex.getLocalizedMessage(),
                new HttpHeaders(), HttpStatus.BAD_REQUEST, request);
    }


}
