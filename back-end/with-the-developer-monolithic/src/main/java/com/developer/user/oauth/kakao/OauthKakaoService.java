package com.developer.user.oauth.kakao;

import com.developer.common.exception.CustomException;
import com.developer.common.exception.ErrorCode;
import com.developer.common.jwt.TokenDTO;
import com.developer.common.jwt.TokenProvider;
import com.developer.user.command.domain.aggregate.RefreshTokenRedis;
import com.developer.user.command.domain.aggregate.User;
import com.developer.user.command.domain.repository.RefreshTokenRedisRepository;
import com.developer.user.command.domain.repository.UserRepository;
import com.developer.user.oauth.kakao.dto.KakaoTokenDTO;
import com.developer.user.oauth.kakao.dto.KakaoUserDTO;
import com.developer.user.security.CustomUserDetails;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class OauthKakaoService {

    private final RestTemplate restTemplate;
    private final TokenProvider tokenProvider;
    private final UserRepository userRepository;
    private final RefreshTokenRedisRepository refreshTokenRedisRepository;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final BCryptPasswordEncoder passwordEncoder;

    @Value("${Kakao_Client_ID}")
    private String Kakao_Client_Key;

    @Value("${Kakao_Secret}")
    private String Kakao_Secret_Key;

    @Value("${Kakao_Token_URI}")
    private String Kakao_Token_URI;

    @Value("${Kakao_USER_INFO_URL}")
    private String Kakao_User_Info_URL;

    @Value("${Kakao_Redirect-URI}")
    private String Kakao_Redirect_URI;

    // 카카오로부터 토큰 요청
    public KakaoTokenDTO getToken(String code){

        log.info("getToken 실행 + code => " + code);
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        log.info("헤더 생성");

        MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
        body.add("grant_type", "authorization_code");
        body.add("client_id", Kakao_Client_Key);
        body.add("redirect_uri", Kakao_Redirect_URI);
        body.add("code", code);
        body.add("client_secret", Kakao_Secret_Key);

        log.info("params 채움");

        HttpEntity<MultiValueMap<String, String>> kakaoTokenRequest = new HttpEntity<>(body, headers);

        log.info(body.toString());
        log.info(headers.toString());
        log.info(Kakao_Token_URI);

        ResponseEntity<KakaoTokenDTO> response = restTemplate.postForEntity(Kakao_Token_URI, kakaoTokenRequest , KakaoTokenDTO.class);

        log.info("토큰 발급 성공" + response.getBody());

        return response.getBody();
    }

    // 사용자 정보 요청
    @Transactional
    public KakaoUserDTO getUserInfo(String accessToken) throws JsonProcessingException {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer " + accessToken);
        headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

        log.info("사용자 정보 요청");
        HttpEntity<Void> kakaoUserInfoRequest = new HttpEntity<>(headers);
        ResponseEntity<String> response = restTemplate.exchange(Kakao_User_Info_URL, HttpMethod.GET, kakaoUserInfoRequest, String.class);

        log.info(response.toString());

        ObjectMapper objectMapper = new ObjectMapper();

        KakaoUserDTO kakaoUserDTO = objectMapper.readValue(response.getBody(), KakaoUserDTO.class);

        // 이미 가입되어 있는 유저
        if (userRepository.existsByUserId(kakaoUserDTO.getKakaoAccount().getEmail())){
            User user = userRepository.findByUserId(kakaoUserDTO.getKakaoAccount().getEmail()).get();
            if (user.getUserNick().equals(kakaoUserDTO.getKakaoAccount().getEmail())
                    && user.getUserBirth().equals(LocalDate.parse(kakaoUserDTO.getKakaoAccount().getBirthyear() + '-' +
                    kakaoUserDTO.getKakaoAccount().getBirthday().charAt(0) + kakaoUserDTO.getKakaoAccount().getBirthday().charAt(1) + '-'
                    + kakaoUserDTO.getKakaoAccount().getBirthday().charAt(2) + kakaoUserDTO.getKakaoAccount().getBirthday().charAt(3)))){

                return kakaoUserDTO;
            }
            throw new CustomException(ErrorCode.DUPLICATE_USERID);
        } else {
            User user = new User(kakaoUserDTO.getKakaoAccount().getEmail(),
                    passwordEncoder.encode("15951"),
                    kakaoUserDTO.getKakaoAccount().getName(),
                    kakaoUserDTO.getKakaoAccount().getEmail(),
                    kakaoUserDTO.getKakaoAccount().getBirthyear(),
                    kakaoUserDTO.getKakaoAccount().getBirthday(),
                    kakaoUserDTO.getKakaoAccount().getPhoneNumber());

            userRepository.save(user);
            return kakaoUserDTO;
        }
    }

    // 자체 JWT 생성
    public TokenDTO createJwt(KakaoUserDTO kakaoUserDTO){
        log.info("자체 토큰 생성");
        Authentication authenticationToken =
                new UsernamePasswordAuthenticationToken(kakaoUserDTO.getKakaoAccount().getEmail(), "15951", new ArrayList<>());

        // 2. 실제로 검증 (사용자 비밀번호 체크) 이 이루어지는 부분
        //    authenticate 메서드가 실행이 될 때 CustomUserDetailsService 에서 만들었던 loadUserByUsername 메서드가 실행됨
        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);

        TokenDTO tokenDTO = tokenProvider.generateTokenDto(authentication);
        log.info("토큰 생성 성공");
        // 3. 사용자 역할 정보를 가져옴
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();

        String userRole = userDetails.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.joining(","));

        // 5. tokenDTO에 권한 저장
        tokenDTO.setUserRole(userRole);

        // 레디스 RefreshToken 생성
        RefreshTokenRedis refreshTokenRedis = RefreshTokenRedis.builder()
                .userId(kakaoUserDTO.getKakaoAccount().getEmail())
                .accessToken(tokenDTO.getAccessToken())
                .refreshToken(tokenDTO.getRefreshToken())
                .build();

        // 레디스 저장
        refreshTokenRedisRepository.save(refreshTokenRedis);

        return tokenDTO;
    }
}
