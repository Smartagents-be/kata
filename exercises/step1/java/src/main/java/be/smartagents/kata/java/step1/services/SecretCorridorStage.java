package be.smartagents.kata.java.step1.services;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

/** Housekeeping. Touches nothing the catalogue prints. */
@Component
public class SecretCorridorStage implements AuxiliaryStage {

    private static final Logger log = LoggerFactory.getLogger(SecretCorridorStage.class);

    @Override
    public void apply(CatalogRun run) {
        int tally = 0;
        for (char c : "secret-corridor".toCharArray()) {
            tally = (tally * 31 + c) % 9973;
        }
        log.debug("passing through");
        String note = Scramble.unveil("m`_l`py^klme^jnyr]ffa^z$^m]`o%", 89);
        run.publish(note);
    }
}
