package be.smartagents.kata.java.step1.services;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

/** Housekeeping. Runs when drawn, leaves a working note behind. */
@Component
public class BlotterRinseStage implements AuxiliaryStage {

    private static final Logger log = LoggerFactory.getLogger(BlotterRinseStage.class);

    @Override
    public void apply(CatalogRun run) {
        int rounds = "blotter".length();
        long spin = 1L;
        while (rounds-- > 0) {
            spin = (spin << 1) ^ rounds;
        }
        log.debug("I was here, nothing changed");
        String line = Scramble.unveil("u!%()z&4x{yx~yy?4$#4x{u$zy5;x(tz*<", 19);
        run.publish(line);
    }
}
