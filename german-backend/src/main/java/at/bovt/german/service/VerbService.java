package at.bovt.german.service;


import at.bovt.german.entity.PartEntity;
import at.bovt.german.entity.PartEntityWithImg;
import at.bovt.german.entity.VerbEntity;
import at.bovt.german.exception.DuplicateKeyException;
import at.bovt.german.exception.EmptyNameException;
import at.bovt.german.exception.NotFoundException;
import at.bovt.german.repository.VerbRepository;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.micrometer.common.util.StringUtils;
import lombok.RequiredArgsConstructor;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@Service
@RequiredArgsConstructor
public class VerbService {

    private final VerbRepository verbRepository;

    public List<VerbEntity> findAllVerbs(){
        return verbRepository.findAll();
    }

    public VerbEntity createVerb(VerbEntity entity){
        if (verbRepository.existsByNameIgnoreCase(entity.getName())){
            throw new DuplicateKeyException("Verb with name '%s' is already exist".formatted(entity.getName()));
        }
        if (entity.getPart1().stream().anyMatch(part -> part.getIndex() == null ||
                StringUtils.isBlank(part.getSubName()))) {
            throw new EmptyNameException("Value from Part1 can't be null or empty");
        }
        if (entity.getPart2().stream().anyMatch(part -> part.getIndex() == null ||
                StringUtils.isBlank(part.getSubName()) )) {
            throw new EmptyNameException("Value from Part2 can't be null or empty");
        }
        if (StringUtils.isBlank(entity.getPart3().getSubName()) ||
                entity.getPart3().getIndex() == null){
            throw new EmptyNameException("Value from Part3 can't be null or empty");
        }
//        if (entity.getPrefix() != null &&
//                (StringUtils.isBlank(entity.getPrefix().getPrefix()) ||
//                        entity.getPrefix().getPrefixIndex() == null)) {
//            throw new EmptyNameException("Value from prefix can't be empty");
//        }

        /*entity.setId(UUID.randomUUID().toString());
        JSONObject jsonObject = new JSONObject(entity);
        String image = jsonObject.getString("image");
        byte[] byteArray = image.getBytes(StandardCharsets.UTF_8);
        entity.setImage(byteArray);
        JSONObject part2Object = jsonObject.getJSONObject("part2");
        String image1 = part2Object.getString("image");
        String subname = part2Object.getString("subname");

        JSONArray indexArray = part2Object.getJSONArray("index");
        List<Integer> indices = IntStream.range(0, indexArray.length()).mapToObj(indexArray::getInt).collect(Collectors.toList());
        byte[] byteArray2 = image1.getBytes(StandardCharsets.UTF_8);
        PartEntity p = new PartEntity();
        p.setIndex(indices);
        p.setSubName(subname);
        PartEntityWithImg pW = new PartEntityWithImg();
        pW.setImage(byteArray2);
        List<PartEntityWithImg> a= new ArrayList<>();
        a.add(0,pW);
        entity.setPart2(a);*/
        entity.setCreatedAt(Instant.now());
        return verbRepository.save(entity);
    }

    public VerbEntity findById(String verbId){
        return verbRepository
                .findById(verbId)
                .orElseThrow(() ->
                        new NotFoundException("Verb with ID '%s' is not found".formatted(verbId))
                );
    }

    public VerbEntity findByName(String verbName){
        return verbRepository
                .findByName(verbName)
                .orElseThrow(() ->
                        new NotFoundException("Verb with name '%s' is not found".formatted(verbName))
                );
    }

    public void deleteById(String verbId){
        VerbEntity firm = getVerbOrThrowException(verbId);

        verbRepository.delete(firm);
    }

  public VerbEntity updateVerb(String verbId, VerbEntity updatedEntity){

        VerbEntity firm = getVerbOrThrowException(verbId);

        if (firm.getName().equals(updatedEntity.getName())) {
            //Update other attributs
        } else {
            if (verbRepository.existsByNameIgnoreCase(updatedEntity.getName())) {
                throw new DuplicateKeyException("Verb with name '%s' already exists"
                        .formatted(updatedEntity.getName()));
            }
            firm.setName(updatedEntity.getName());
            //Update other attributs

        }

        return verbRepository.save(firm);
    }

    public void parseJson(){
        Optional<VerbEntity> json = verbRepository.findByName("trinken");
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode jsonNode = objectMapper.readTree(json.get().getImage());

            for (JsonNode node : jsonNode) {
                String image = node.get("image").asText();
                System.out.println("Bild-URL: " + image);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private VerbEntity getVerbOrThrowException(String verbId) {
        return verbRepository.findById(verbId)
                .orElseThrow(() ->
                        new NotFoundException("Verb with ID '%s' is not found".formatted(verbId))
                );
    }
}
