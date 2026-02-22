package com.studiostate.selfdesk.service.impl;

import com.studiostate.selfdesk.dto.*;
import com.studiostate.selfdesk.entity.Product;
import com.studiostate.selfdesk.entity.User;
import com.studiostate.selfdesk.repository.UserRepository;
import com.studiostate.selfdesk.service.IUserService;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.time.Clock;
import java.time.Instant;
import java.util.List;
import java.util.stream.Collectors;


@Service
@RequiredArgsConstructor
public class UserServiceImpl implements IUserService {

    private final UserRepository userRepository;
    private final Clock clock;

    @Override
    public User saveUser(NewUserRequestDto userRequestDto) {
        User user = transformToEntity(userRequestDto);
        return userRepository.save(user);

    }

    @Override
    public List<UserResponseDto> getUserByFirstNameOrLastName(String firstName, String lastName){
        return userRepository.findByFirstNameContainingOrLastNameContaining(firstName, lastName)
                .stream()
                .map(this::transformToDTO)
                .collect(Collectors.toList());

    }

    private User transformToEntity(NewUserRequestDto userRequestDto) {
        User user = new User();
        BeanUtils.copyProperties(userRequestDto, user);
        user.setCreatedBy(userRequestDto.getFirstName() + ", " + userRequestDto.getLastName());
        user.setCreatedAt(Instant.now(clock));
        return user;
    }

    private UserResponseDto transformToDTO (User user){
        UserResponseDto userResponseDto = new UserResponseDto();
        BeanUtils.copyProperties(user, userResponseDto); // this copies all data to the data transfer model, only works, if the property names are the same
        return userResponseDto;

    }




}


