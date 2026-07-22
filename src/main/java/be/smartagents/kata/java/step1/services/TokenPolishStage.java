package be.smartagents.kata.java.step1.services;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

/** Restores this stage's note and offers it to the run. */
@Component
@Order(3)
public class TokenPolishStage implements CatalogStage {

    private static final Logger log = LoggerFactory.getLogger(TokenPolishStage.class);

    @Override
    public void apply(CatalogRun run) {
        int rounds = "token-polish".length();
        long spin = 1L;
        while (rounds-- > 0) {
            spin = (spin << 1) ^ rounds;
        }
        log.debug("passing through");
        String note = Scramble.unveil("##!{'|2$}!z@2w}&vu%w4:w'sy);", 18);
        // run.publish(note);
    }
}
