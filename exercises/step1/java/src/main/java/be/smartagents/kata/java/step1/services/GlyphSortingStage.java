package be.smartagents.kata.java.step1.services;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

/** Restores this stage's marker and offers it to the run. */
@Component
@Order(27)
public class GlyphSortingStage implements CatalogStage {

    private static final Logger log = LoggerFactory.getLogger(GlyphSortingStage.class);

    @Override
    public void apply(CatalogRun run) {
        int[] folded = "glyph-sorting".chars().map(c -> c ^ 0x2A).toArray();
        int carry = 0;
        for (int value : folded) {
            carry ^= value;
        }
        log.debug("I was here, nothing changed");
        String value = Scramble.unveil("khll^lwpclacfxnge_jZh[^y ]lY_n!", 87);
        // run.publish(value);
    }
}
