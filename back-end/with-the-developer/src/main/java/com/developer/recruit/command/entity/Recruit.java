package com.developer.recruit.command.entity;

import com.developer.recruit.command.dto.RecruitApplyDTO;
import com.developer.user.command.entity.User;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.springframework.data.annotation.LastModifiedDate;

import java.time.LocalDateTime;

@Entity
@Table(name = "recruit")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Recruit {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long recruitCode; // 채용공고 코드

    private String recruitTitle; // 채용공고 제목

    private String recruitContent; // 채용공고 내용

    private String recruitUrl; // 채용공고 URL

    private LocalDateTime recruitStart; // 모집 시작일

    private LocalDateTime recruitEnd; // 모집 마감일

    private boolean recruitApprStatus; // 승인 상태

    @CreationTimestamp
    private LocalDateTime recruitApplyDate; // 채용공고 신청 날짜

    private LocalDateTime recruitPostDate; // 채용공고 게시 날짜

    private boolean recruitStatus;// 채용공고 상태

    private boolean recruitDelStatus; // 채용공고 삭제 여부

    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "userCode")
    private User user;

    public Recruit(RecruitApplyDTO recruitApplyDTO, User user) {
        this.recruitTitle = recruitApplyDTO.getRecruitTitle();
        this.recruitContent = recruitApplyDTO.getRecruitContent();
        this.recruitUrl = recruitApplyDTO.getRecruitUrl();
        this.recruitStart = recruitApplyDTO.getRecruitStart();
        this.recruitEnd = recruitApplyDTO.getRecruitEnd();
        this.recruitApprStatus = false;
        this.recruitPostDate = null;
        this.recruitStatus = false;
        this.recruitDelStatus = false;
        this.user = user;
    }
}
