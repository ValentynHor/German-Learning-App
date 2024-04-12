package at.bovt.german.dto;

import lombok.*;
import java.time.Instant;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class VerbDTO {

    private String id;

    private String name;

    private Instant createdAt;

    private Instant updatedAt;


}
