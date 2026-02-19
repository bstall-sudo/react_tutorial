package com.studiostate.selfdesk.service.impl;

import com.studiostate.selfdesk.dto.ProductDto;
import com.studiostate.selfdesk.dto.SessionGetResponseDto;
import com.studiostate.selfdesk.dto.SessionRequestDto;
import com.studiostate.selfdesk.dto.SessionEndRequestDto;
import com.studiostate.selfdesk.entity.Session;
import com.studiostate.selfdesk.repository.SessionRepository;
import com.studiostate.selfdesk.service.ISessionService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;


import java.time.Clock;
import java.time.Instant;
import java.util.List;
import java.util.stream.Collectors;



@Service
@RequiredArgsConstructor
public class SessionServiceImpl implements ISessionService {

    private final SessionRepository sessionRepository;
    private final Clock clock;

    @Override
    public Session saveSession(SessionRequestDto sessionRequestDto) {
        Session session = transformToEntity(sessionRequestDto);
        return sessionRepository.save(session);

    }

    private Session transformToEntity(SessionRequestDto sessionRequestDto) {
        Session session = new Session();
        BeanUtils.copyProperties(sessionRequestDto, session);
        session.setOpen(sessionRequestDto.getOpen());
        session.setUserName(sessionRequestDto.getUserName());
        session.setUserId(sessionRequestDto.getUserId());
        session.setServerStartTime(Instant.now(clock));
        session.setClientStartTime(sessionRequestDto.getClientStartTime());
        session.setCreatedBy(sessionRequestDto.getUserName());
        session.setCreatedAt(Instant.now(clock));
        /*  start time to add to session record??? */
        return session;
    }

    @Override
    public Session endSession(Long sessionId, SessionEndRequestDto requestDto) {

        Session session = sessionRepository.findById(sessionId)
                .orElseThrow(() -> new RuntimeException("Session not found"));

        session.setClientEndTime(requestDto.getClientEndTime());
        session.setServerEndTime(Instant.now(clock));
        session.setSessionComment("this is a test");
        session.setOpen(false);
        System.out.println("entity open field: " + session.getOpen());

        return sessionRepository.save(session);
    }

    @Override
    public List<SessionGetResponseDto> getSessionsByUserId(Long userId) {
        return sessionRepository.findByUserId(userId)
                .stream()
                .map(this::transformToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<SessionGetResponseDto> getSessions() {
        return sessionRepository.findAll()
                .stream().map(this::transformToDTO).collect(Collectors.toList());
    }


    private SessionGetResponseDto transformToDTO (Session session){
        SessionGetResponseDto sessionGetResponseDto = new SessionGetResponseDto();
        BeanUtils.copyProperties(session, sessionGetResponseDto); // this copies all data to the data transfer model, only works, if the property names are the same
        return sessionGetResponseDto;

    }



}


