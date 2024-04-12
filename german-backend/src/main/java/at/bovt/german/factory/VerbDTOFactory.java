package at.bovt.german.factory;


import at.bovt.german.dto.VerbDTO;
import at.bovt.german.entity.VerbEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;

@RequiredArgsConstructor
@Component
public class VerbDTOFactory {

    public VerbDTO createFirmDTO(VerbEntity entity){
        return VerbDTO.builder()
                .id(entity.getId())
                .name(entity.getName())
                .build();
    }

    public List<VerbDTO> createFirmDTOList(List<VerbEntity> entities ){
        return entities.stream()
                .map(this::createFirmDTO)
                .toList();
    }



}
