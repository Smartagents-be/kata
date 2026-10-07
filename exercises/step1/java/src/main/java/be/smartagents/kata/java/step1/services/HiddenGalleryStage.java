package be.smartagents.kata.java.step1.services;

import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

/** Adds the volume catalogued under the upper gallery. */
@Component
@Order(41)
public class HiddenGalleryStage implements CatalogStage {

    @Override
    public void apply(CatalogRun run) {
        run.publish("Legends of the Legacy Monolith");
    }
}
