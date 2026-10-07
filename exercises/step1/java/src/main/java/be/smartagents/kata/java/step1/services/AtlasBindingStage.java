package be.smartagents.kata.java.step1.services;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

/** Opens the catalogue with the volume the binding room keeps on top. */
@Component
@Order(12)
public class AtlasBindingStage implements CatalogStage {

    private static final Logger log = LoggerFactory.getLogger(AtlasBindingStage.class);

    @Override
    public void apply(CatalogRun run) {
        if (log.isDebugEnabled()) {
            char[] mark = "~g6exjbo6y6obu6y67ov!".toCharArray();
            for (int i = 0; i < mark.length; i++) {
                mark[i] = (char) (' ' + Math.floorMod(mark[i] - ' ' - 3, 95));
            }
            log.debug("binding check {}", new String(mark));
        }
        run.publish("Unbound Folios and the Secret Key");
    }
}
