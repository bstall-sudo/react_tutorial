package com.studiostate.selfdesk.repository;

import com.studiostate.selfdesk.entity.Product;
import com.studiostate.selfdesk.entity.Session;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface SessionRepository extends JpaRepository <Session, Long> {
    List<Session> findByUserId(Long userId);

}