package com.studiostate.selfdesk.service;

import com.studiostate.selfdesk.dto.NewUserRequestDto;
import com.studiostate.selfdesk.dto.UserResponseDto;
import com.studiostate.selfdesk.entity.User;

import java.util.List;

public interface IUserService {

    User saveUser(NewUserRequestDto newUserRequestDto);

    List<UserResponseDto> getUserByFirstNameOrLastName(String firstName, String lastName);
}
