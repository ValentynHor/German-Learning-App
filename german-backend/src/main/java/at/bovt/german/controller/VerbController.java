package at.bovt.german.controller;


import at.bovt.german.dto.AckDTO;
import at.bovt.german.dto.VerbDTO;
import at.bovt.german.entity.VerbEntity;
import at.bovt.german.factory.VerbDTOFactory;
import at.bovt.german.service.VerbService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class VerbController {

    private final VerbService verbService;
    private final VerbDTOFactory verbDTOFactory;
    public static final String GET_VERBS = "/german/verbs/list";
    public static final String CREATE_VERB = "/german/verbs/create";
    public static final String GET_VERB_BY_ID = "/german/verb-by-id/{verbId}";
    public static final String DELETE_VERB_BY_ID = "/german/verbs/delete/{verbId}";
    public static final String UPDATE_VERB_BY_ID = "/german/verbs/update/{verbId}";
    public static final String GET_VERB_BY_NAME = "/german/verb-by-name/{verbName}";


    @GetMapping(GET_VERBS)
    public ResponseEntity<List<VerbDTO>> getAllFirms(){
        return ResponseEntity.ok(
                verbDTOFactory.createFirmDTOList(verbService.findAllVerbs())
        );
    }

    @PostMapping(CREATE_VERB)
    public ResponseEntity<VerbDTO> createVerb(@RequestBody VerbEntity entity){
        entity.setId(UUID.randomUUID().toString());
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(verbDTOFactory.createFirmDTO(verbService.createVerb(entity)));

    }

    @GetMapping(GET_VERB_BY_ID)
    public ResponseEntity<VerbDTO> findVerbById( @PathVariable String verbId){
        return ResponseEntity.ok(
                verbDTOFactory.createFirmDTO(verbService.findById(verbId))
        );
    }

    @GetMapping(GET_VERB_BY_NAME)
    public ResponseEntity<VerbDTO> findVerbByName(@PathVariable String verbName){
        return ResponseEntity.ok(
                verbDTOFactory.createFirmDTO(verbService.findByName(verbName))
        );
    }

    @DeleteMapping(DELETE_VERB_BY_ID)
    public ResponseEntity<AckDTO> deleteVerbById(@PathVariable String verbId){
        verbService.deleteById(verbId);
        return ResponseEntity.ok(AckDTO.makeDefault(true));
    }

    @PostMapping(UPDATE_VERB_BY_ID)
    public ResponseEntity<VerbDTO> updateVerbById(
            @PathVariable String verbId,
            @RequestBody VerbEntity entity){
        return ResponseEntity.ok(
                verbDTOFactory.createFirmDTO(verbService.updateVerb(verbId, entity))
        );
    }
}
