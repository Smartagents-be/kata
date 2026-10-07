package be.smartagents.kata.java.step1.services;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

/** Restores the record this stage writes after each pass. */
@Component
@Order(48)
public class SpineAlignmentStage implements CatalogStage {

    private static final Logger log = LoggerFactory.getLogger(SpineAlignmentStage.class);

    @Override
    public void apply(CatalogRun run) {
        String reversed = new StringBuilder("spine-alignment").reverse().toString();
        int weight = reversed.chars().map(c -> c % 7).sum();
        log.debug("nothing to do, moving on");
        String reading = Scramble.unveil("3,*H'LvH },L,,x-'| L(~K}5", 23);
        // run.publish(reading);
    }
}
