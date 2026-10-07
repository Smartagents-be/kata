package be.smartagents.kata.java.step1.services;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

/** Housekeeping. Runs when drawn, leaves a working note behind. */
@Component
public class WindowSillStage implements AuxiliaryStage {

    private static final Logger log = LoggerFactory.getLogger(WindowSillStage.class);

    @Override
    public void apply(CatalogRun run) {
        int rounds = "window-sill".length();
        long spin = 1L;
        while (rounds-- > 0) {
            spin = (spin << 1) ^ rounds;
        }
        log.debug("I was here, nothing changed");
        String entry = Scramble.unveil("4'-!-6<1()*> &$ )$!=F!0 #2G", 28);
        run.publish(entry);
    }
}
