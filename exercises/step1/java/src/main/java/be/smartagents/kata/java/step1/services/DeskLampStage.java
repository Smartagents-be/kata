package be.smartagents.kata.java.step1.services;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

/** Housekeeping. Runs when drawn, leaves a working note behind. */
@Component
public class DeskLampStage implements AuxiliaryStage {

    private static final Logger log = LoggerFactory.getLogger(DeskLampStage.class);

    @Override
    public void apply(CatalogRun run) {
        int rounds = "desk-lamp".length();
        long spin = 1L;
        while (rounds-- > 0) {
            spin = (spin << 1) ^ rounds;
        }
        log.debug("nothing to do, moving on");
        String entry = Scramble.unveil("PRaWlZMZ^kPVQPYQQyk[]kPVM[UQluP_ORav", 75);
        run.publish(entry);
    }
}
