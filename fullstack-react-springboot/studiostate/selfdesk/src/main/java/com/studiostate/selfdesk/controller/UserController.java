package com.studiostate.selfdesk.controller;

import com.studiostate.selfdesk.dto.NewUserRequestDto;
import com.studiostate.selfdesk.dto.NewUserResponseDto;
import com.studiostate.selfdesk.entity.User;
import com.studiostate.selfdesk.repository.ProductRepository;
import com.studiostate.selfdesk.service.IUserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1")
@RequiredArgsConstructor
public class UserController {

    private final ProductRepository productRepository;
    private final IUserService userService;

    @PostMapping("/admin/create/user")
    public ResponseEntity<NewUserResponseDto> saveUser(@RequestBody  @Valid NewUserRequestDto newUserRequestDto) {

        //userService.saveUser(newUserRequestDto);

        User saved = userService.saveUser(newUserRequestDto);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(new NewUserResponseDto(
                        saved.getUserId(),
                        saved.getFirstName(),
                        saved.getLastName()
                ));
    }
}

