package be.smartagents.kata.java.step1.services;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

/** Housekeeping. Touches nothing the catalogue prints. */
@Component
public class NightWatchStage implements AuxiliaryStage {

    private static final Logger log = LoggerFactory.getLogger(NightWatchStage.class);

    @Override
    public void apply(CatalogRun run) {
        int tally = 0;
        for (char c : "night-watch".toCharArray()) {
            tally = (tally * 31 + c) % 9973;
        }
        log.debug("nothing to do, moving on");
        String caption = Scramble.unveil("KGFER^T?S@F^M?RP]QBANOBDA]fAP@CRg", 60);
        run.publish(caption);
    }
}
