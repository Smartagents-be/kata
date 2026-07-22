package be.smartagents.kata.java.step1.services;

import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

/** Adds the folio that never made it back to its slot. */
@Component
@Order(33)
public class FoliantDustStage implements CatalogStage {

    @Override
    public void apply(CatalogRun run) {
        run.publish("The Compiler Told Me Nothing");
    }
}
