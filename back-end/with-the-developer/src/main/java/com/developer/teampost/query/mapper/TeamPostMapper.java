package com.developer.teampost.query.mapper;

import com.developer.teampost.query.dto.TeamPostDTO;
import com.developer.teampost.query.dto.TeamPostListDTO;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.data.repository.query.Param;

import java.util.List;

@Mapper
public interface TeamPostMapper {

    TeamPostDTO selectByTeamPostCode(@Param("teamPostCode") Long teamPostCode);

    List<TeamPostListDTO> selectAllTeamPost(int offset);
}
