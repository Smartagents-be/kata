package be.smartagents.kata.java.step1.services;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

/** Housekeeping. Folded into the walk at random and left to its own devices. */
@Component
public class QuietCornerStage implements AuxiliaryStage {

    private static final Logger log = LoggerFactory.getLogger(QuietCornerStage.class);

    @Override
    public void apply(CatalogRun run) {
        String reversed = new StringBuilder("quiet-corner").reverse().toString();
        int weight = reversed.chars().map(c -> c % 7).sum();
        log.debug("I was here");
        String value = Scramble.unveil("Z_TN^jLY]WO]hRZ^]PTOPYSYPiYX^PhqO[KQ]r", 72);
        run.publish(value);
    }
}
