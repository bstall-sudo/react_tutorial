package com.studiostate.selfdesk.service.impl;

import com.studiostate.selfdesk.dto.*;
import com.studiostate.selfdesk.entity.*;
import com.studiostate.selfdesk.repository.PassRepository;
import com.studiostate.selfdesk.repository.ProductRepository;
import com.studiostate.selfdesk.repository.SessionAllocationRepository;
import com.studiostate.selfdesk.repository.SessionRepository;
import com.studiostate.selfdesk.service.ISessionService;
import jakarta.validation.constraints.Max;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.Clock;
import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

import static java.lang.Math.round;


@Service
@RequiredArgsConstructor
public class SessionServiceImpl implements ISessionService {

    private final SessionRepository sessionRepository;
    private final ProductRepository productRepository;
    private final PassRepository passRepository;
    private final SessionAllocationRepository allocationRepository;
    private final Clock clock;

    @Override
    public Session saveSession(SessionRequestDto sessionRequestDto) {
        Session session = transformToEntity(sessionRequestDto);
        return sessionRepository.save(session);

    }



    @Override
    @Transactional
    public SessionResponseDto endSession(Long sessionId, SessionEndRequestDto requestDto) {

        Session session = sessionRepository.findById(sessionId)
                .orElseThrow(() -> new RuntimeException("Session not found"));

        List<Product> products = productRepository.findByCategory("walkin");

        if (products.isEmpty()) {
            throw new RuntimeException("Product of type 'walkin' not found");
        }

        Product walkinProduct = products.get(0);

        BigDecimal pricePerHour = walkinProduct.getPrice();

        if (Boolean.FALSE.equals(session.getOpen())) {
            List<SessionAllocation> existingAllocations =
                    allocationRepository.findBySession_SessionIdOrderByStartAtAsc(sessionId);

            return mapToSessionResponseDto(session, existingAllocations);
        }

        if (allocationRepository.existsBySession_SessionId(sessionId)) {
            session.setOpen(false);
            if (session.getCheckOutAt() == null) {
                session.setCheckOutAt(Instant.now(clock));
            }

            Session savedSession = sessionRepository.save(session);

            List<SessionAllocation> existingAllocations =
                    allocationRepository.findBySession_SessionIdOrderByStartAtAsc(sessionId);

            return mapToSessionResponseDto(savedSession, existingAllocations);
        }

        Instant now = Instant.now(clock);

        if (session.getCheckInAt() == null) {
            throw new IllegalStateException("Session has no checkInAt");
        }

        session.setCheckOutAt(now);
        session.setOpen(false);

        if (requestDto != null && requestDto.getSessionComment() != null) {
            session.setSessionComment(requestDto.getSessionComment());
        }

        long totalSeconds = Math.max(0,
                java.time.Duration.between(session.getCheckInAt(), now).getSeconds());

        if (totalSeconds == 0) {
            Session savedSession = sessionRepository.save(session);
            return mapToSessionResponseDto(savedSession, List.of());
        }

        Long userId = session.getUserId();
        if (userId == null) {
            throw new IllegalStateException("Session has no userId");
        }

        Pass pass = passRepository
                .findFirstByUserIdAndActiveTrueAndExpiryDateTimeAfterAndRemainingSecondsGreaterThanOrderByExpiryDateTimeAsc(
                        userId, now, 0L
                )
                .orElse(null);

        Instant cursor = session.getCheckInAt();
        long remainingToCover = totalSeconds;

        List<SessionAllocation> createdAllocations = new ArrayList<>();

        // 1) PASS allocation
        if (pass != null) {
            long passSeconds = Math.min(remainingToCover, pass.getRemainingSeconds());

            if (passSeconds > 0) {
                Instant passEnd = cursor.plusSeconds(passSeconds);

                SessionAllocation a = new SessionAllocation();
                a.setSession(session);
                a.setAllocationType(SessionAllocationType.PASS);
                a.setPassId(pass.getPassId());
                a.setStartAt(cursor);
                a.setEndAt(passEnd);
                a.setSeconds(passSeconds);
                a.setPaymentStatus(SessionAllocationPaymentStatus.COVERED_BY_PASS);
                a.setAmountCents(0L);

                SessionAllocation savedAllocation = allocationRepository.save(a);
                createdAllocations.add(savedAllocation);

                pass.setRemainingSeconds(pass.getRemainingSeconds() - passSeconds);

                if (pass.getRemainingSeconds() <= 0) {
                    pass.setActive(false);
                }

                passRepository.save(pass);

                cursor = passEnd;
                remainingToCover -= passSeconds;
            }
        }

        // 2) WALKIN allocation
        if (remainingToCover > 0) {
            Instant walkinEnd = cursor.plusSeconds(remainingToCover);

            SessionAllocation w = new SessionAllocation();
            w.setSession(session);
            w.setAllocationType(SessionAllocationType.WALKIN);
            w.setPaymentStatus(SessionAllocationPaymentStatus.OPEN);
            w.setPassId(null);
            w.setStartAt(cursor);
            w.setEndAt(walkinEnd);
            w.setSeconds(remainingToCover);

            // calculateWalkingPrice ist unten
            w.setAmountCents(calculateWalkinPrice(pricePerHour, remainingToCover));

            System.out.println("-----------------------------------------------");
            System.out.println("pricePerHour: " + pricePerHour);
            System.out.println("remainingToCover: " + remainingToCover);
            System.out.println("-----------------------------------------------");
            SessionAllocation savedWalkin = allocationRepository.save(w);
            createdAllocations.add(savedWalkin);
        }

        Session savedSession = sessionRepository.save(session);

        return mapToSessionResponseDto(savedSession, createdAllocations);
    }

    private Session transformToEntity(SessionRequestDto sessionRequestDto) {
        Session session = new Session();
        BeanUtils.copyProperties(sessionRequestDto, session);
        session.setOpen(sessionRequestDto.getOpen());
        session.setUserName(sessionRequestDto.getUserName());
        session.setUserId(sessionRequestDto.getUserId());
        session.setCheckInAt(Instant.now(clock));
        session.setCreatedBy(sessionRequestDto.getUserName());
        session.setCreatedAt(Instant.now(clock));
        /*  start time to add to session record??? */
        return session;
    }

    private SessionResponseDto mapToSessionResponseDto(
            Session session,
            List<SessionAllocation> allocations
    ) {
        SessionResponseDto dto = new SessionResponseDto();
        dto.setUserName(session.getUserName());
        dto.setSessionId(session.getSessionId());
        dto.setOpen(session.getOpen());
        dto.setCheckInAt(session.getCheckInAt());
        dto.setCheckOutAt(session.getCheckOutAt());
        dto.setAllocations(
                allocations.stream()
                        .map(this::mapToSessionAllocationResponseDto)
                        .toList()
        );
        return dto;
    }

    private SessionResponseDto mapToSessionWithAllocationsResponseDto(Session session) {
        SessionResponseDto dto = new SessionResponseDto();
        dto.setUserName(session.getUserName());
        dto.setSessionId(session.getSessionId());
        dto.setOpen(session.getOpen());
        dto.setCheckInAt(session.getCheckInAt());
        dto.setCheckOutAt(session.getCheckOutAt());
        dto.setAllocations(
                session.getAllocations().stream()
                        .map(this::mapToSessionAllocationResponseDto)
                        .collect(Collectors.toList())
        );
        return dto;
    }

    private SessionAllocationResponseDto mapToSessionAllocationResponseDto(SessionAllocation allocation) {
        SessionAllocationResponseDto dto = new SessionAllocationResponseDto();
        dto.setAllocationId(allocation.getAllocationId());
        dto.setAllocationType(allocation.getAllocationType().name());
        dto.setPaymentStatus(allocation.getPaymentStatus().name());
        dto.setPassId(allocation.getPassId());
        dto.setStartAt(allocation.getStartAt());
        dto.setEndAt(allocation.getEndAt());
        dto.setSeconds(allocation.getSeconds());
        dto.setAmountCents(allocation.getAmountCents());
        return dto;
    }

    @Override
    public List<SessionGetResponseDto> getSessionsByUserId(Long userId) {
        return sessionRepository.findByUserId(userId)
                .stream()
                .map(this::transformToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<SessionResponseDto> getSessionsByUserIdAndPaymentStatusOpen(Long userId) {

        List<Session> sessions =
                sessionRepository.findSessionsWithOpenAllocations(
                        userId,
                        SessionAllocationPaymentStatus.OPEN
                );

        return sessions.stream()
                .map(this::mapToSessionWithAllocationsResponseDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<SessionGetResponseDto> getOpenSessionsByUserId(Long userId) {
        return sessionRepository.findByUserIdAndOpenTrue(userId)
                .stream()
                .map(this::transformToDTO)
                .collect(Collectors.toList());
    }
    /*
    @Override
    public List<SessionGetResponseDto> getOpenSessionsOrSessionToday() {
        Instant todayStart = startOfToday();
        return sessionRepository.findByOpenTrueOrCheckInAtAfter(todayStart)
                .stream()
                .map(this::transformToDTO)
                .collect(Collectors.toList());
    }
*/
    @Override
    public List<SessionGetResponseDto> getOpenSessionsOrSessionToday() {
        Instant startOfToday = LocalDate.now()
                .atStartOfDay(ZoneId.systemDefault())
                .toInstant();

        List<Session> sessions =
                sessionRepository.findByOpenTrueOrCheckInAtAfter(startOfToday);

        return sessions.stream()
                .sorted(
                        Comparator
                                .comparingInt((Session s) -> getSessionPriorityGroup(s, startOfToday))
                                .thenComparing(Session::getCheckInAt, Comparator.reverseOrder())
                )
                .map(this::transformToDTO)
                .collect(Collectors.toList());
    }

    private int getSessionPriorityGroup(Session session, Instant startOfToday) {
        boolean isTodayOrLater = session.getCheckInAt() != null
                && !session.getCheckInAt().isBefore(startOfToday);

        boolean isOpen = Boolean.TRUE.equals(session.getOpen());

        if (isTodayOrLater && isOpen) {
            return 0;
        }

        if (isTodayOrLater) {
            return 1;
        }

        if (isOpen) {
            return 2;
        }

        return 3;
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

    private Long calculateWalkinPrice(BigDecimal priceEuro, Long remainingToCover) {
        BigDecimal seconds = BigDecimal.valueOf(remainingToCover);
        BigDecimal secondsPerHour = BigDecimal.valueOf(3600);

        BigDecimal priceCentsPerHour = priceEuro.multiply(BigDecimal.valueOf(100));

        BigDecimal amountCents = seconds
                .multiply(priceCentsPerHour)
                .divide(secondsPerHour, 0, RoundingMode.HALF_UP);

        return amountCents.longValue();
    }

    public Instant startOfToday() {
        return LocalDate.now()
                .atStartOfDay(ZoneId.systemDefault())
                .toInstant();
    }

}


