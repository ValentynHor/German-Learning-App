package at.bovt.german.dto;

import at.bovt.german.entity.PartEntity;
import at.bovt.german.entity.PartEntityWithImg;
import lombok.*;
import org.springframework.data.mongodb.core.index.Indexed;

import java.time.Instant;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class VerbDTO {

    private String id;

    private String name;

    private List<Integer> index;

    private String image;

    private boolean isWithHaben;

    private String prefix;

    private List<Integer> prefixIndex;

    private List<PartEntity> part1;

    private List<PartEntityWithImg> part2;

    private PartEntity part3;














}
