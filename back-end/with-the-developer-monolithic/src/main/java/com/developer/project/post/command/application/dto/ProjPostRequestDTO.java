package com.developer.project.post.command.application.dto;

import com.developer.project.post.command.domain.aggregate.ProjPost;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.*;

import java.util.List;

@Getter
@Setter
public class ProjPostRequestDTO {

    @NotNull(message = "제목은 필수입니다.")
    @NotBlank(message = "제목은 공백일 수 없습니다.")
    private String projPostTitle;

    @NotNull(message = "내용은 필수입니다.")
    private String projPostContent;

    @NotBlank(message = "URL은 필수 입력 항목입니다.")
    @Pattern(
            regexp = "^(https?:\\/\\/)?([\\w.-]+)\\.([a-z]{2,6})(\\/[-\\w.@:%_\\+.~#?&//=]*)*$",
            message = "유효하지 않은 URL 형식입니다."
    )
    private String projUrl;

    private List<String> projTagContent;

    public ProjPost toEntity() {
        return ProjPost.builder()
                .projPostTitle(projPostTitle)
                .projPostContent(projPostContent)
                .projUrl(projUrl)
                .build();
    }
}
