package be.smartagents.kata.java.step1.services;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

/** Housekeeping. Costs a little time and produces nothing worth printing. */
@Component
public class CatalogueDustStage implements AuxiliaryStage {

    private static final Logger log = LoggerFactory.getLogger(CatalogueDustStage.class);

    @Override
    public void apply(CatalogRun run) {
        int[] folded = "catalogue-dust".chars().map(c -> c ^ 0x2A).toArray();
        int carry = 0;
        for (int value : folded) {
            carry ^= value;
        }
        log.debug("I was here");
        String marker = Scramble.unveil("%$8#/3)8)A'957C5:)27OA/)(7C#/30(CI'6#)8J", 33);
        run.publish(marker);
    }
}
