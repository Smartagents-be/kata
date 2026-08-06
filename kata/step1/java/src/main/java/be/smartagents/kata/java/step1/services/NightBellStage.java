package be.smartagents.kata.java.step1.services;

import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

/** Adds the volume the night shift signs out most often. */
@Component
@Order(45)
public class NightBellStage implements CatalogStage {

    @Override
    public void apply(CatalogRun run) {
        run.publish("1,000 Ways to Lose a Page");
    }
}
