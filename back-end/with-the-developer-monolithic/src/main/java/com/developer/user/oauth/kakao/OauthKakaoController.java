package com.developer.user.oauth.kakao;

import com.developer.common.exception.CustomException;
import com.developer.common.jwt.TokenDTO;
import com.developer.user.command.application.service.UserCommandService;
import com.developer.user.oauth.kakao.dto.KakaoTokenDTO;
import com.developer.user.oauth.kakao.dto.KakaoUserDTO;
import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.net.URI;

@Slf4j
@RestController
@RequestMapping("/oauth/kakao")
@RequiredArgsConstructor
public class OauthKakaoController {

    private final OauthKakaoService oauthKakaoService;
    private final UserCommandService userService;

    @GetMapping
    public ResponseEntity<?> kakaoCallback(@RequestParam String code) throws JsonProcessingException {

        log.info("컨트롤러 생성");
        // 카카오로 토큰 요청
        KakaoTokenDTO kakaoToken = oauthKakaoService.getToken(code);

        log.info("토큰 발급 성공");
        // 사용자 정보 요청
        KakaoUserDTO kakaoUser = oauthKakaoService.getUserInfo(kakaoToken.getAccessToken());

        log.info("사용자 정보 요청 성공");
        TokenDTO tokenDTO = oauthKakaoService.createJwt(kakaoUser);

        try {
            userService.checkUserStatus(tokenDTO.getUserCode());
        } catch (CustomException e){
            // 정지 되어있으면 401 반환
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        }

        String frontendUrl = "http://localhost:5173";
        // 프론트엔드 URL로 리다이렉트, 쿼리 파라미터로 토큰 전송
        String redirectUrl = String.format("%s/kakao?accessToken=%s&refreshToken=%s", frontendUrl, tokenDTO.getAccessToken(), tokenDTO.getRefreshToken());
        return ResponseEntity.status(HttpStatus.FOUND).location(URI.create(redirectUrl)).build();
    }
}
