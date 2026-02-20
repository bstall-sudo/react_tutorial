package com.studiostate.selfdesk.service.impl;

import com.studiostate.selfdesk.dto.SessionEndRequestDto;
import com.studiostate.selfdesk.dto.SessionGetResponseDto;
import com.studiostate.selfdesk.dto.NewUserRequestDto;
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

    private User transformToEntity(NewUserRequestDto userRequestDto) {
        User user = new User();
        BeanUtils.copyProperties(userRequestDto, user);
        user.setCreatedBy(userRequestDto.getFirstName() + ", " + userRequestDto.getLastName());
        user.setCreatedAt(Instant.now(clock));
        return user;
    }




}


