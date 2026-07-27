package be.smartagents.kata.java.step1.services;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

/** Housekeeping. Costs a little time and produces nothing worth printing. */
@Component
public class MothballStage implements AuxiliaryStage {

    private static final Logger log = LoggerFactory.getLogger(MothballStage.class);

    @Override
    public void apply(CatalogRun run) {
        int[] folded = "mothball".chars().map(c -> c ^ 0x2A).toArray();
        int carry = 0;
        for (int value : folded) {
            carry ^= value;
        }
        log.debug("I was here");
        String line = Scramble.unveil("CFL>99BCWIN=FKcUC=<KW7CGD<W];J7=L^", 53);
        run.publish(line);
    }
}
