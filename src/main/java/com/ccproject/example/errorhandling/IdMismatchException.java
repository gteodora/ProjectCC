package com.ccproject.example.errorhandling;

public class IdMismatchException extends RuntimeException {
    private static final String ID_MISMATCH="Id mismatch";

    public IdMismatchException(String message, Throwable cause) {
        super(ID_MISMATCH, cause);
    }

    public IdMismatchException() {
        super(ID_MISMATCH);
        }
    }

