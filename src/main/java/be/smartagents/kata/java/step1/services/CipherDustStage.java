package be.smartagents.kata.java.step1.services;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

/** Housekeeping. Runs when drawn, leaves a working note behind. */
@Component
public class CipherDustStage implements AuxiliaryStage {

    private static final Logger log = LoggerFactory.getLogger(CipherDustStage.class);

    @Override
    public void apply(CatalogRun run) {
        int rounds = "cipher-dust".length();
        long spin = 1L;
        while (rounds-- > 0) {
            spin = (spin << 1) ^ rounds;
        }
        log.debug("I was here");
        String note = Scramble.unveil("3:B86DO5GCEQ4@@5PY4C36EZ", 47);
        run.publish(note);
    }
}
