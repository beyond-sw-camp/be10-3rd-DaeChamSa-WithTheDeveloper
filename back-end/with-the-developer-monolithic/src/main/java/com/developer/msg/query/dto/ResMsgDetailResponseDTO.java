package com.developer.msg.query.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ResMsgDetailResponseDTO {

    private Long msgCode;
    private String msgContent;
    private LocalDateTime createdDate;
    private Boolean isRead;
    private Long userCode;
    private String userId;
    private String userNick;
}
