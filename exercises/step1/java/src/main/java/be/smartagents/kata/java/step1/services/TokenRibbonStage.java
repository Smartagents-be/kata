package be.smartagents.kata.java.step1.services;

import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

/** Adds the ribbon-marked volume from the loan cabinet. */
@Component
@Order(51)
public class TokenRibbonStage implements CatalogStage {

    @Override
    public void apply(CatalogRun run) {
        run.publish("Vault of Forgotten Regressions");
    }
}
