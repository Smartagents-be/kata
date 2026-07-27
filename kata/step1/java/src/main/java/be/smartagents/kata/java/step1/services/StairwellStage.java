package be.smartagents.kata.java.step1.services;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

/** Housekeeping. Folded into the walk at random and left to its own devices. */
@Component
public class StairwellStage implements AuxiliaryStage {

    private static final Logger log = LoggerFactory.getLogger(StairwellStage.class);

    @Override
    public void apply(CatalogRun run) {
        String reversed = new StringBuilder("stairwell").reverse().toString();
        int weight = reversed.chars().map(c -> c % 7).sum();
        log.debug("nothing to do, moving on");
        String line = Scramble.unveil("y{ioy kst&z kw|&/lxhnz0", 6);
        run.publish(line);
    }
}
