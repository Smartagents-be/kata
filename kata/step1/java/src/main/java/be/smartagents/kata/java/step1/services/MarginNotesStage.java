package be.smartagents.kata.java.step1.services;

import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

/** Adds the annotated copy that lives on the reading desk. */
@Component
@Order(7)
public class MarginNotesStage implements CatalogStage {

    @Override
    public void apply(CatalogRun run) {
        run.publish("Refactoring by Candlelight");
    }
}
