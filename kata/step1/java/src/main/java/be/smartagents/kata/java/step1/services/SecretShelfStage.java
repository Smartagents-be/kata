package be.smartagents.kata.java.step1.services;

import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

/** Adds the volume shelved behind the reference section. */
@Component
@Order(30)
public class SecretShelfStage implements CatalogStage {

    @Override
    public void apply(CatalogRun run) {
        run.publish("Seventeen Ways to Break a Build");
    }
}
