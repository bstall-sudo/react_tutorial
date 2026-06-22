package com.studiostate.selfdesk.repository;

import com.studiostate.selfdesk.entity.SessionAllocation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface SessionAllocationRepository extends JpaRepository<SessionAllocation, Long> {

    boolean existsBySession_SessionId(Long sessionId);

    List<SessionAllocation> findBySession_SessionIdOrderByStartAtAsc(Long sessionId);
}