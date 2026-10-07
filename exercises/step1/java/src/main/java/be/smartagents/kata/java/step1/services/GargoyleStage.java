package be.smartagents.kata.java.step1.services;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

/** Housekeeping. Folded into the walk at random and left to its own devices. */
@Component
public class GargoyleStage implements AuxiliaryStage {

    private static final Logger log = LoggerFactory.getLogger(GargoyleStage.class);

    @Override
    public void apply(CatalogRun run) {
        String reversed = new StringBuilder("gargoyle").reverse().toString();
        int weight = reversed.chars().map(c -> c % 7).sum();
        log.debug("I was here");
        String note = Scramble.unveil("zu(z$/ y5{$+'y!xy&|#|3#%(y5;x(tz*<", 19);
        run.publish(note);
    }
}
