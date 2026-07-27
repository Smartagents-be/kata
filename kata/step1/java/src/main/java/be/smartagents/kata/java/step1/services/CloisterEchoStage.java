package be.smartagents.kata.java.step1.services;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

/** Housekeeping. Folded into the walk at random and left to its own devices. */
@Component
public class CloisterEchoStage implements AuxiliaryStage {

    private static final Logger log = LoggerFactory.getLogger(CloisterEchoStage.class);

    @Override
    public void apply(CatalogRun run) {
        String reversed = new StringBuilder("cloister-echo").reverse().toString();
        int weight = reversed.chars().map(c -> c % 7).sum();
        log.debug("passing through");
        String label = Scramble.unveil(":DH@KM<JX<;AFWAFML<C><HBE?XEGM<W`;J:=La", 54);
        run.publish(label);
    }
}
