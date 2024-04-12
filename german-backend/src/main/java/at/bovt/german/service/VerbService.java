package at.bovt.german.service;


import at.bovt.german.entity.VerbEntity;
import at.bovt.german.exception.DuplicateKeyException;
import at.bovt.german.exception.EmptyNameException;
import at.bovt.german.exception.NotFoundException;
import at.bovt.german.repository.VerbRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;

@Service
@RequiredArgsConstructor
public class VerbService {

    private final VerbRepository verbRepository;

    public List<VerbEntity> findAllVerbs(){
        return verbRepository.findAll();
    }

    public VerbEntity createVerb(VerbEntity entity){
        if(entity.getName().trim().equals("")){
            throw new EmptyNameException("Name can't be empty");
        }
        if (verbRepository.existsByNameIgnoreCase(entity.getName())){
            throw new DuplicateKeyException("Verb with name '%s' is already exist".formatted(entity.getName()));
        }
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

    private VerbEntity getVerbOrThrowException(String verbId) {
        return verbRepository.findById(verbId)
                .orElseThrow(() ->
                        new NotFoundException("Verb with ID '%s' is not found".formatted(verbId))
                );
    }
}
