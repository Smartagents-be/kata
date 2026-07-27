package be.smartagents.kata.java.step1.services;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

/** Housekeeping. Touches nothing the catalogue prints. */
@Component
public class HingeOilStage implements AuxiliaryStage {

    private static final Logger log = LoggerFactory.getLogger(HingeOilStage.class);

    @Override
    public void apply(CatalogRun run) {
        int tally = 0;
        for (char c : "hinge-oil".toCharArray()) {
            tally = (tally * 31 + c) % 9973;
        }
        log.debug("I was here");
        String entry = Scramble.unveil("(*0'&A/*.?4'!-'$@I$3#&5J", 31);
        run.publish(entry);
    }
}
