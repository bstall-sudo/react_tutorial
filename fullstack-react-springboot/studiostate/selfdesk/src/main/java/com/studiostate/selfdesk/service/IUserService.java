package com.studiostate.selfdesk.service;

import com.studiostate.selfdesk.dto.NewUserRequestDto;
import com.studiostate.selfdesk.entity.User;

public interface IUserService {

    User saveUser(NewUserRequestDto newUserRequestDto);

    //User updateUser(Long userId, updateUserRequestDto);
}
