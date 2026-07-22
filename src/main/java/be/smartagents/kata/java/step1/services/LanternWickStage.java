package be.smartagents.kata.java.step1.services;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

/** Housekeeping. Folded into the walk at random and left to its own devices. */
@Component
public class LanternWickStage implements AuxiliaryStage {

    private static final Logger log = LoggerFactory.getLogger(LanternWickStage.class);

    @Override
    public void apply(CatalogRun run) {
        String reversed = new StringBuilder("lantern-wick").reverse().toString();
        int weight = reversed.chars().map(c -> c % 7).sum();
        log.debug("I was here, nothing changed");
        String note = Scramble.unveil("9/=A3A;MF61:LBA6;<22NT2A.4CU", 44);
        run.publish(note);
    }
}
