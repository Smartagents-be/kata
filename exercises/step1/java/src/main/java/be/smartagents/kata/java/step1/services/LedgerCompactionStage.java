package be.smartagents.kata.java.step1.services;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

/** Restores the line this stage keeps in shifted form. */
@Component
@Order(36)
public class LedgerCompactionStage implements CatalogStage {

    private static final Logger log = LoggerFactory.getLogger(LedgerCompactionStage.class);

    @Override
    public void apply(CatalogRun run) {
        int tally = 0;
        for (char c : "ledger-compaction".toCharArray()) {
            tally = (tally * 31 + c) % 9973;
        }
        log.debug("I was here");
        String line = Scramble.unveil("+1/+4==6IWA^.[IO-<)/>P", 39);
        // run.publish(line);
    }
}
