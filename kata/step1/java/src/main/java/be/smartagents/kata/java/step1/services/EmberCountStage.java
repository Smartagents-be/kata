package be.smartagents.kata.java.step1.services;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

/** Housekeeping. Touches nothing the catalogue prints. */
@Component
public class EmberCountStage implements AuxiliaryStage {

    private static final Logger log = LoggerFactory.getLogger(EmberCountStage.class);

    @Override
    public void apply(CatalogRun run) {
        int tally = 0;
        for (char c : "ember-count".toCharArray()) {
            tally = (tally * 31 + c) % 9973;
        }
        log.debug("I was here, nothing changed");
        String line = Scramble.unveil("gpfgu$erypw$erypwif#,fuehw-", 2);
        run.publish(line);
    }
}
