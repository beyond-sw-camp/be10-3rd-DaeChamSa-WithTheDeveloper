package com.developer.postservice.comu.comment.command.repository;

import com.developer.postservice.comu.comment.command.entity.ComuCmt;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ComuCmtRepository extends JpaRepository<ComuCmt, Long> {

}
