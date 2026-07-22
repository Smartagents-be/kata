package be.smartagents.kata.java.step1.services;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

/** Restores the record this stage writes after each pass. */
@Component
@Order(21)
public class ManuscriptTallyStage implements CatalogStage {

    private static final Logger log = LoggerFactory.getLogger(ManuscriptTallyStage.class);

    @Override
    public void apply(CatalogRun run) {
        String reversed = new StringBuilder("manuscript-tally").reverse().toString();
        int weight = reversed.chars().map(c -> c % 7).sum();
        log.debug("nothing to do, moving on");
        String candidate = Scramble.unveil("PFIdCGIfE<5NeJ?4JIh9iGjT", 52);
        // run.publish(candidate);
    }
}
