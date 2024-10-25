package com.developer.noti.query.mapper;

import com.developer.noti.query.dto.AllNotiDTO;
import com.developer.noti.query.dto.ResponseNotiDTO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface NotiMapper {

    // 삭제처리 안되어있는 알림들만 페이징 처리
    List<ResponseNotiDTO> findAllNotNotiDelStatus(@Param("userCode") Long userCode);

    // 모든 알림 불러오기 페이징 처리
    List<AllNotiDTO> findByAll(@Param("userCode") Long userCode);

    // 삭제 안 된 읽은 알림 불러오기 페이징 처리
    List<ResponseNotiDTO> findByIsRead(@Param("userCode") Long userCode);

    // 삭제 안 된 안읽은 알림 불러오기 페이징 처리
    List<ResponseNotiDTO> findByNotRead(@Param("userCode") Long userCode);
}
