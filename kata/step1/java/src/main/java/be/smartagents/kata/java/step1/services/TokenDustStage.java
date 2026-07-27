package be.smartagents.kata.java.step1.services;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

/** Housekeeping. Costs a little time and produces nothing worth printing. */
@Component
public class TokenDustStage implements AuxiliaryStage {

    private static final Logger log = LoggerFactory.getLogger(TokenDustStage.class);

    @Override
    public void apply(CatalogRun run) {
        int[] folded = "token-dust".chars().map(c -> c ^ 0x2A).toArray();
        int carry = 0;
        for (int value : folded) {
            carry ^= value;
        }
        log.debug("I was here");
        String text = Scramble.unveil("$ |t~1s&%$0y~&%t{vt!z}w1} &t09s#ru%:", 15);
        run.publish(text);
    }
}
