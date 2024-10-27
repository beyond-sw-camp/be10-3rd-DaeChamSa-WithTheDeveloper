package com.developer.user.oauth.kakao.dto;

import lombok.Data;

@Data
public class KakaoTokenDTO {
    private String token_type;
    private String access_token;
    private Integer expires_in;
    private String refresh_token;
    private Integer refresh_token_expires_in;
    private String scope;

    public String getAccessToken() {
        return access_token;
    }
}

