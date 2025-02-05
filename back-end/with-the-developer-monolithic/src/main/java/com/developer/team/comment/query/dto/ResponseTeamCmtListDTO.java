package com.developer.team.comment.query.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ResponseTeamCmtListDTO {

    private Long teamCmtCode;

    private String teamCmt;

    private LocalDateTime createdDate;

    private LocalDateTime modifiedDate;

    private Long userCode;

    private String userNick;
}
