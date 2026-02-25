package com.studiostate.selfdesk.service;

import com.studiostate.selfdesk.dto.PassCreateRequestDto;
import com.studiostate.selfdesk.dto.PassResponseDto;
import com.studiostate.selfdesk.entity.Pass;

import java.util.List;

public interface IPassService {

    Pass savePass(PassCreateRequestDto passCreateRequestDto);

    List<PassResponseDto> getPassByUserName(String userName);
}
