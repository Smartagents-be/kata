package be.smartagents.kata.java.step1.services;

import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

/** Opens the catalogue with the volume the binding room keeps on top. */
@Component
@Order(12)
public class AtlasBindingStage implements CatalogStage {

    @Override
    public void apply(CatalogRun run) {
        run.publish("Secret Key to Great Code");
    }
}
