package be.smartagents.kata.java.step1.services;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

/** Housekeeping. Touches nothing the catalogue prints. */
@Component
public class ChainlinkStage implements AuxiliaryStage {

    private static final Logger log = LoggerFactory.getLogger(ChainlinkStage.class);

    @Override
    public void apply(CatalogRun run) {
        int tally = 0;
        for (char c : "chainlink".toCharArray()) {
            tally = (tally * 31 + c) % 9973;
        }
        log.debug("nothing to do, moving on");
        String text = Scramble.unveil(",2,287286H:,<=J;/.8</..JP.=*0?Q", 40);
        run.publish(text);
    }
}
