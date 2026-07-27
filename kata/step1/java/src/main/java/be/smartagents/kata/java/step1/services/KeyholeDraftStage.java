package be.smartagents.kata.java.step1.services;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

/** Housekeeping. Runs when drawn, leaves a working note behind. */
@Component
public class KeyholeDraftStage implements AuxiliaryStage {

    private static final Logger log = LoggerFactory.getLogger(KeyholeDraftStage.class);

    @Override
    public void apply(CatalogRun run) {
        int rounds = "keyhole-draft".length();
        long spin = 1L;
        while (rounds-- > 0) {
            spin = (spin << 1) ^ rounds;
        }
        log.debug("passing through");
        String label = Scramble.unveil("1,A.64+F,8(.:F+.,+1,,QF65F+.(6-,GM+:'-<N", 37);
        run.publish(label);
    }
}
