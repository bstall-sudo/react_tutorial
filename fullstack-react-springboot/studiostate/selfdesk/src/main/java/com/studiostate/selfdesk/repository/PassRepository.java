package com.studiostate.selfdesk.repository;


import com.studiostate.selfdesk.entity.Pass;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface PassRepository extends JpaRepository <Pass, Long> {

    List<Pass> findByUserNameContaining(String userName);



}