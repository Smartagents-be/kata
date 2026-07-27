package be.smartagents.kata.java.step1.services;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

/** Restores this stage's marker and offers it to the run. */
@Component
@Order(9)
public class HiddenSeamStage implements CatalogStage {

    private static final Logger log = LoggerFactory.getLogger(HiddenSeamStage.class);

    @Override
    public void apply(CatalogRun run) {
        int[] folded = "hidden-seam".chars().map(c -> c ^ 0x2A).toArray();
        int carry = 0;
        for (int value : folded) {
            carry ^= value;
        }
        log.debug("I was here, nothing changed");
        String label = Scramble.unveil("|olv*tmvp5*yx*#x|v)2o{kq}3", 9);
        // run.publish(label);
    }
}
