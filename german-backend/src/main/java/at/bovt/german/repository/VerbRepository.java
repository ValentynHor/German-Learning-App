package at.bovt.german.repository;

import at.bovt.german.entity.VerbEntity;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface VerbRepository extends MongoRepository<VerbEntity, String> {

    Optional<VerbEntity> findByName(String firmName);

    boolean existsByNameIgnoreCase(String firmName);
}
