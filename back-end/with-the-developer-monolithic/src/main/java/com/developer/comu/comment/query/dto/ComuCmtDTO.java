package com.developer.comu.comment.query.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ComuCmtDTO {
    private Long comuCmtCode;
    private String comuCmtContent;
    private String userNick;
    private LocalDateTime createdDate;
}
