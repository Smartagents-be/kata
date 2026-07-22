package be.smartagents.kata.java.step1.services;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

/** Housekeeping. Runs when drawn, leaves a working note behind. */
@Component
public class PageFlutterStage implements AuxiliaryStage {

    private static final Logger log = LoggerFactory.getLogger(PageFlutterStage.class);

    @Override
    public void apply(CatalogRun run) {
        int rounds = "page-flutter".length();
        long spin = 1L;
        while (rounds-- > 0) {
            spin = (spin << 1) ^ rounds;
        }
        log.debug("passing through");
        String note = Scramble.unveil("RDKGbJNXXVHVaVIVWPGGciGVCIXj", 65);
        run.publish(note);
    }
}
