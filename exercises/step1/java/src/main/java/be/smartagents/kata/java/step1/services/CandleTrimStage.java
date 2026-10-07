package be.smartagents.kata.java.step1.services;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

/** Housekeeping. Folded into the walk at random and left to its own devices. */
@Component
public class CandleTrimStage implements AuxiliaryStage {

    private static final Logger log = LoggerFactory.getLogger(CandleTrimStage.class);

    @Override
    public void apply(CatalogRun run) {
        String reversed = new StringBuilder("candle-trim").reverse().toString();
        int weight = reversed.chars().map(c -> c % 7).sum();
        log.debug("passing through");
        String entry = Scramble.unveil(" ~-!*$<21&+>10(*+$!=F!0 #2G", 28);
        run.publish(entry);
    }
}
