package be.smartagents.kata.java.step1.services;

import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

/** Closes the catalogue with the volume the vault index lists last. */
@Component
@Order(54)
public class VaultIndexStage implements CatalogStage {

    @Override
    public void apply(CatalogRun run) {
        run.publish("3 Hands on the Press");
    }
}
