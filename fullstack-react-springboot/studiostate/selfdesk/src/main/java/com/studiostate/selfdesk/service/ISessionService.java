package com.studiostate.selfdesk.service;



import com.studiostate.selfdesk.dto.SessionEndRequestDto;
import com.studiostate.selfdesk.dto.SessionGetResponseDto;
import com.studiostate.selfdesk.dto.SessionRequestDto;
import com.studiostate.selfdesk.dto.SessionResponseDto;
import com.studiostate.selfdesk.entity.Session;

import java.util.List;
import java.util.Optional;

public interface ISessionService {

    Session saveSession(SessionRequestDto sessionRequestDto);
    SessionResponseDto endSession(Long sessionId, SessionEndRequestDto requestDto);

    List<SessionGetResponseDto> getSessions();
    List<SessionGetResponseDto> getSessionsByUserId(Long userId);

    List<SessionGetResponseDto> getOpenSessionsByUserId(Long userId);

    List<SessionGetResponseDto> getOpenSessionsOrSessionToday();

    List<SessionResponseDto> getSessionsByUserIdAndPaymentStatusOpen(Long userId);


}
