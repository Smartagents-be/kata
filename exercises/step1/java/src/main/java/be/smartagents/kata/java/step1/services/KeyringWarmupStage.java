package be.smartagents.kata.java.step1.services;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

/** Restores the line this stage keeps in shifted form. */
@Component
@Order(2)
public class KeyringWarmupStage implements CatalogStage {

    private static final Logger log = LoggerFactory.getLogger(KeyringWarmupStage.class);

    @Override
    public void apply(CatalogRun run) {
        int tally = 0;
        for (char c : "keyring-warmup".toCharArray()) {
            tally = (tally * 31 + c) % 9973;
        }
        log.debug("I was here");
        String marker = Scramble.unveil("YVsPL?ArCFq?NQpKqD=op[", 61);
        // run.publish(marker);
    }
}
