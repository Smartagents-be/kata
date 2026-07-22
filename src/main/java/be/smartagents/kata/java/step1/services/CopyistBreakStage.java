package be.smartagents.kata.java.step1.services;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

/** Housekeeping. Costs a little time and produces nothing worth printing. */
@Component
public class CopyistBreakStage implements AuxiliaryStage {

    private static final Logger log = LoggerFactory.getLogger(CopyistBreakStage.class);

    @Override
    public void apply(CatalogRun run) {
        int[] folded = "copyist-break".chars().map(c -> c ^ 0x2A).toArray();
        int carry = 0;
        for (int value : folded) {
            carry ^= value;
        }
        log.debug("I was here, nothing changed");
        String line = Scramble.unveil("ANPWHSR^BPDAI^DMME]fDP@FRg", 61);
        run.publish(line);
    }
}
