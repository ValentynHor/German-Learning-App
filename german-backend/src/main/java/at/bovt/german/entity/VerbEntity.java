package at.bovt.german.entity;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Document(collection = "verbs")
public class VerbEntity {

    @Id
    private String id;

    @NonNull
    @Indexed(unique = true)
    private String name;

    private Instant createdAt;

    private Instant updatedAt;
}
