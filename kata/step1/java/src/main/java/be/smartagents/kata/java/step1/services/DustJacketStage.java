package be.smartagents.kata.java.step1.services;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

/** Housekeeping. Costs a little time and produces nothing worth printing. */
@Component
public class DustJacketStage implements AuxiliaryStage {

    private static final Logger log = LoggerFactory.getLogger(DustJacketStage.class);

    @Override
    public void apply(CatalogRun run) {
        int[] folded = "dust-jacket".chars().map(c -> c ^ 0x2A).toArray();
        int carry = 0;
        for (int value : folded) {
            carry ^= value;
        }
        log.debug("I was here");
        String value = Scramble.unveil("`rqp|h]`iaq}otclq*{icbq}]imjb}$ap]cr%", 91);
        run.publish(value);
    }
}
