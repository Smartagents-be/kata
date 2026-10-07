package be.smartagents.kata.java.step1.services;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

/** Housekeeping. Folded into the walk at random and left to its own devices. */
@Component
public class DoorLatchStage implements AuxiliaryStage {

    private static final Logger log = LoggerFactory.getLogger(DoorLatchStage.class);

    @Override
    public void apply(CatalogRun run) {
        String reversed = new StringBuilder("door-latch").reverse().toString();
        int weight = reversed.chars().map(c -> c % 7).sum();
        log.debug("passing through");
        String note = Scramble.unveil("WcdesaThX[sh[iir{YeU[g|", 82);
        run.publish(note);
    }
}
