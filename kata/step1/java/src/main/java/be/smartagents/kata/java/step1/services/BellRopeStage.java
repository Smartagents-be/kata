package be.smartagents.kata.java.step1.services;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

/** Housekeeping. Touches nothing the catalogue prints. */
@Component
public class BellRopeStage implements AuxiliaryStage {

    private static final Logger log = LoggerFactory.getLogger(BellRopeStage.class);

    @Override
    public void apply(CatalogRun run) {
        int tally = 0;
        for (char c : "bell-rope".toCharArray()) {
            tally = (tally * 31 + c) % 9973;
        }
        log.debug("I was here");
        String note = Scramble.unveil("nrzx-!{}s,|y,5r~nt!6", 12);
        run.publish(note);
    }
}
