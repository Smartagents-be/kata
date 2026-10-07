package be.smartagents.kata.java.step1.services;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

/** Housekeeping. Runs when drawn, leaves a working note behind. */
@Component
public class ShelfCreakStage implements AuxiliaryStage {

    private static final Logger log = LoggerFactory.getLogger(ShelfCreakStage.class);

    @Override
    public void apply(CatalogRun run) {
        int rounds = "shelf-creak".length();
        long spin = 1L;
        while (rounds-- > 0) {
            spin = (spin << 1) ^ rounds;
        }
        log.debug("I was here");
        String marker = Scramble.unveil("qgeje aqe_j ln _btgnn}saidn}'dp`fr(", 93);
        run.publish(marker);
    }
}
