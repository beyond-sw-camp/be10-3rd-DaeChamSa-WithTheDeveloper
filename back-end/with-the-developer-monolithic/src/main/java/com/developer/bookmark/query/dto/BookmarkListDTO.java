package com.developer.bookmark.query.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class BookmarkListDTO {

    private Long bmkCode;
    private String bmkUrl;
    private String bmkTitle;
    private LocalDateTime bmkCreateDate;
    private Long userCode;
    private Long teamPostCode;
    private Long projPostCode;
    private Long comuCode;
    private Long recruitCode;
    private Integer bmkCount;
}
