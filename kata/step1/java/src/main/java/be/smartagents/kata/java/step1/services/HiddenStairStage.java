package be.smartagents.kata.java.step1.services;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

/** Housekeeping. Costs a little time and produces nothing worth printing. */
@Component
public class HiddenStairStage implements AuxiliaryStage {

    private static final Logger log = LoggerFactory.getLogger(HiddenStairStage.class);

    @Override
    public void apply(CatalogRun run) {
        int[] folded = "hidden-stair".chars().map(c -> c ^ 0x2A).toArray();
        int carry = 0;
        for (int value : folded) {
            carry ^= value;
        }
        log.debug("nothing to do, moving on");
        String text = Scramble.unveil("!#~|~)8-/y#-8|'}z-8A~+z!-B", 24);
        run.publish(text);
    }
}
