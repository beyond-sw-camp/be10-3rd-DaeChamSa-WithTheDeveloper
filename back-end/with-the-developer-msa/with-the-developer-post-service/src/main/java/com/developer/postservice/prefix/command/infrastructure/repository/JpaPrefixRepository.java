package com.developer.postservice.prefix.command.infrastructure.repository;

import com.developer.postservice.prefix.command.domain.aggregate.Prefix;
import com.developer.postservice.prefix.command.domain.repository.PrefixRepository;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JpaPrefixRepository extends PrefixRepository, JpaRepository<Prefix, Long> {
}
