package at.bovt.german.entity;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;


import java.time.Instant;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Document(collection = "verbs")
public class VerbEntity {

    @Id
    private String id;

    @NotBlank(message = "Name can't be null or empty")
    @Indexed(unique = true)
    private String name;

    @NotNull(message = "Index arr can't be null")
    private List<Integer> index;

    private String  image;

    private boolean isWithHaben;

    private Prefix prefix;

    @NotNull(message = "Part1 can't be null")
    private List<PartEntity> part1;

    @NotNull(message = "Part2 can't be null")
    private List<PartEntityWithImg> part2;

    @NotNull(message = "Part3 can't be null")
    private PartEntity part3;

    private Instant createdAt;

    private Instant updatedAt;

}
