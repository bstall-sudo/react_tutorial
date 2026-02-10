package com.studiostate.selfdesk.exception;


import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.Map;

@RestControllerAdvice
public class ErrorHandler {

    @ExceptionHandler(Exception.class)
    public ResponseEntity<?> handle(Exception e) {
        e.printStackTrace(); // shows the REAL error in console
        return ResponseEntity
                .status(500)
                .body(Map.of("errorMessage", e.getMessage()));
    }
}