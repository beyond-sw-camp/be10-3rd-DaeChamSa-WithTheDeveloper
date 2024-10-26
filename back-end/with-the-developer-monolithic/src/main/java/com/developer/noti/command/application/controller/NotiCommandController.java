package com.developer.noti.command.application.controller;

import com.developer.common.success.SuccessCode;
import com.developer.noti.command.application.dto.NotiAllDTO;
import com.developer.noti.command.application.dto.NotiCommentCreateDTO;
import com.developer.noti.command.application.service.NotiCommandService;
import com.developer.user.security.SecurityUtil;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "notification", description = "알림 API")
@RestController
@RequestMapping("/noti")
@RequiredArgsConstructor
public class NotiCommandController {

    private final NotiCommandService notiCommandService;

    // 알림 읽음처리
    @PutMapping("/{notiCode}")
    @Operation(summary = "알림 읽음 처리", description = "알림을 읽은 경우 읽음으로 상태를 변경합니다.")
    public ResponseEntity<SuccessCode> readNoti(@PathVariable(name = "notiCode") Long notiCode) {
        Long currentUserCode = SecurityUtil.getCurrentUserCode();

        notiCommandService.readNoti(currentUserCode, notiCode);

        return ResponseEntity.ok(SuccessCode.NOTI_READ_OK);
    }

    // 알림 삭제처리
    @DeleteMapping("/{notiCode}")
    @Operation(summary = "알림 삭제", description = "받은 알림을 삭제할 수 있습니다.")
    public ResponseEntity<SuccessCode> deleteNoti(@PathVariable Long notiCode) {
        Long currentUserCode = SecurityUtil.getCurrentUserCode();

        notiCommandService.deleteNoti(currentUserCode, notiCode);

        return ResponseEntity.ok(SuccessCode.NOTI_DELETE_OK);
    }

    // 전체 읽음
    @PostMapping("/all")
    @Operation(summary = "알림 전체 읽음", description = "받을 알림을 모두 읽을 처리할 수 있다.")
    public ResponseEntity<SuccessCode> readNotiAll(@RequestBody List<Long> notiAllDTO) {

        SecurityUtil.getCurrentUserCode();

        notiCommandService.readNotiAll(notiAllDTO);

        return ResponseEntity.ok(SuccessCode.NOTI_READ_OK);
    }

    // 전체 삭제
    @DeleteMapping("/all")
    @Operation(summary = "알림 전체 삭제", description = "받은 알림들 모두 삭제 처리할 수 있다.")
    public ResponseEntity<SuccessCode> deleteNotiAll(@RequestBody List<Long> notiAllDTO) {

        SecurityUtil.getCurrentUserCode();

        notiCommandService.deleteNotiAll(notiAllDTO);

        return ResponseEntity.ok(SuccessCode.NOTI_DELETE_OK);
    }

    // 테스트하기 위해 만들어놓음
    @PostMapping
    @Operation(summary = "알림 생성", description = "알림을 생성합니다.")
    public ResponseEntity<?> createNoti(@RequestBody NotiCommentCreateDTO notiCommentCreateDTO) {
        notiCommandService.addCommentEvent(notiCommentCreateDTO);

        return ResponseEntity.ok().build();
    }

}
