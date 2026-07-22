package be.smartagents.kata.java.step1.services;

import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

/** Adds the engraved edition from the second gallery. */
@Component
@Order(24)
public class QuillEngravingStage implements CatalogStage {

    @Override
    public void apply(CatalogRun run) {
        run.publish("Hidden Software Tricks");
    }
}
