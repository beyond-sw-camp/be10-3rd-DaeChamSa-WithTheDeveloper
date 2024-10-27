package com.developer.block.command.application.controller;

import com.developer.block.command.application.service.BlockCommandService;
import com.developer.common.success.SuccessCode;
import com.developer.user.security.SecurityUtil;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "block-user", description = "회원 차단 API")
@RestController
@RequiredArgsConstructor
@RequestMapping("/blocks")
public class BlockCommandController {

    private final BlockCommandService blockCommandService;

    @PostMapping("/block/{blockedCode}")
    @Operation(summary = "회원 차단", description = "회원을 차단합니다.")
    public ResponseEntity<SuccessCode> blockUser(@PathVariable(name = "blockedCode") Long blockedCode) {
        Long loginUser = SecurityUtil.getCurrentUserCode();

        blockCommandService.blockUser(loginUser, blockedCode);

        return ResponseEntity.ok(SuccessCode.BLOCK_OK);
    }

    @PostMapping("/unblock/{blockedCode}")
    @Operation(summary = "회원 차단 해지", description = "회원 차단을 해지합니다.")
    public ResponseEntity<SuccessCode> unblockUser(@PathVariable(name = "blockedCode") Long blockedCode) {
        Long loginUser = SecurityUtil.getCurrentUserCode();

        blockCommandService.unblockUser(loginUser, blockedCode);

        return ResponseEntity.ok(SuccessCode.UNBLOCK_OK);
    }
}
