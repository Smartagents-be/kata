package be.smartagents.kata.java.step1.services;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

/** Housekeeping. Costs a little time and produces nothing worth printing. */
@Component
public class RainGutterStage implements AuxiliaryStage {

    private static final Logger log = LoggerFactory.getLogger(RainGutterStage.class);

    @Override
    public void apply(CatalogRun run) {
        int[] folded = "rain-gutter".chars().map(c -> c ^ 0x2A).toArray();
        int carry = 0;
        for (int value : folded) {
            carry ^= value;
        }
        log.debug("I was here, nothing changed");
        String entry = Scramble.unveil("bR[^pYeefUcqS]WQcqwUdQWfx", 79);
        run.publish(entry);
    }
}
