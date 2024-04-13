package at.bovt.german.exception;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ErrorCode {
    private String errorMessage;
}