package be.smartagents.kata.java.step1.services;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

/** Housekeeping. Runs when drawn, leaves a working note behind. */
@Component
public class FloorboardStage implements AuxiliaryStage {

    private static final Logger log = LoggerFactory.getLogger(FloorboardStage.class);

    @Override
    public void apply(CatalogRun run) {
        int rounds = "floorboard".length();
        long spin = 1L;
        while (rounds-- > 0) {
            spin = (spin << 1) ^ rounds;
        }
        log.debug("passing through");
        String marker = Scramble.unveil("ovzx|mxk}m*yx*ll~txx+}kvnx+1n}jp 2", 9);
        run.publish(marker);
    }
}
