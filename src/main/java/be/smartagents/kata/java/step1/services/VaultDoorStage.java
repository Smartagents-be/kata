package be.smartagents.kata.java.step1.services;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

/** Housekeeping. Touches nothing the catalogue prints. */
@Component
public class VaultDoorStage implements AuxiliaryStage {

    private static final Logger log = LoggerFactory.getLogger(VaultDoorStage.class);

    @Override
    public void apply(CatalogRun run) {
        int tally = 0;
        for (char c : "vault-door".toCharArray()) {
            tally = (tally * 31 + c) % 9973;
        }
        log.debug("passing through");
        String note = Scramble.unveil("+v,!*6x%&'5*|++4=z'v|)>", 20);
        run.publish(note);
    }
}
