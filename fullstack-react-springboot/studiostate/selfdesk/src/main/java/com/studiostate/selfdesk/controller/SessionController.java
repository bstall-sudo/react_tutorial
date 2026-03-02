package com.studiostate.selfdesk.controller;

import com.studiostate.selfdesk.dto.*;
import com.studiostate.selfdesk.entity.Session;
import com.studiostate.selfdesk.repository.SessionRepository;
import com.studiostate.selfdesk.service.ISessionService;
import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/v1/sessions")
@RequiredArgsConstructor
public class SessionController {

    private final SessionRepository sessionRepository;
    private final ISessionService iSessionService;

    @PostMapping
    public ResponseEntity<SessionResponseDto> saveSessions(
            @RequestBody SessionRequestDto sessionRequestDto) {

        Session saved = iSessionService.saveSession(sessionRequestDto);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(new SessionResponseDto(
                        saved.getUserName(),
                        saved.getSessionId(),
                        saved.getOpen(),
                        saved.getServerStartTime(),
                        saved.getClientStartTime(),
                        saved.getServerEndTime(),
                        saved.getClientEndTime()

                ));
    }

    @PutMapping("/{sessionId}")
    public ResponseEntity<SessionResponseDto> endSession(
            @PathVariable Long sessionId,
            @RequestBody SessionEndRequestDto requestDto) {

        Session updated = iSessionService.endSession(sessionId, requestDto);



        return ResponseEntity.ok(
                new SessionResponseDto(
                        updated.getUserName(),
                        updated.getSessionId(),
                        updated.getOpen(),
                        updated.getServerStartTime(),
                        updated.getClientStartTime(),
                        updated.getServerEndTime(),
                        updated.getClientEndTime()
                )
        );
    }
    /*
    @GetMapping
    public List<SessionGetResponseDto> getSessions() {

            return iSessionService.getSessions();

    }
     */


    @GetMapping("/user/{userId}")
    public List<SessionGetResponseDto> getSessionsByUserId(@PathVariable Long userId) {
        return iSessionService.getSessionsByUserId(userId);
    }

    //added for admin overview page to filter sessions by UserID
    @GetMapping
    public List<SessionGetResponseDto> getSessions(@RequestParam(required = false) Long userId) {
        return (userId == null)
                ? iSessionService.getSessions()
                : iSessionService.getSessionsByUserId(userId);
    }




}

