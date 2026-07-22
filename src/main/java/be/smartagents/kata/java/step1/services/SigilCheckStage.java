package be.smartagents.kata.java.step1.services;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

/** Restores this stage's note and offers it to the run. */
@Component
@Order(39)
public class SigilCheckStage implements CatalogStage {

    private static final Logger log = LoggerFactory.getLogger(SigilCheckStage.class);

    @Override
    public void apply(CatalogRun run) {
        int rounds = "sigil-check".length();
        long spin = 1L;
        while (rounds-- > 0) {
            spin = (spin << 1) ^ rounds;
        }
        log.debug("passing through");
        String restored = Scramble.unveil("^WuJtQBFxWGMBzDrJDyCtNa", 66);
        // run.publish(restored);
    }
}
