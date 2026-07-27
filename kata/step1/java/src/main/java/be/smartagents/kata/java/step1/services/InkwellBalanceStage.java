package be.smartagents.kata.java.step1.services;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

/** Restores this stage's note and offers it to the run. */
@Component
@Order(18)
public class InkwellBalanceStage implements CatalogStage {

    private static final Logger log = LoggerFactory.getLogger(InkwellBalanceStage.class);

    @Override
    public void apply(CatalogRun run) {
        int rounds = "inkwell-balance".length();
        long spin = 1L;
        while (rounds-- > 0) {
            spin = (spin << 1) ^ rounds;
        }
        log.debug("passing through");
        String text = Scramble.unveil("200.,@($-$K@-/5')/&?5.?$.-1 #5>G%1!'3H", 30);
        // run.publish(text);
    }
}
